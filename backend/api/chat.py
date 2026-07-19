from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.supabase_service import supabase
from services.profile_service import ProfileService
from services.groq_service import GroqService
from config.basic_questions import BASIC_FIELDS, FIELD_DESCRIPTIONS
from config.farmer_questions import FARMER_FIELDS, FARMER_FIELD_DESCRIPTIONS
from config.student_questions import STUDENT_FIELDS, STUDENT_FIELD_DESCRIPTIONS
from config.women_questions import WOMEN_FIELDS, WOMEN_FIELD_DESCRIPTIONS
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


router = APIRouter(prefix="/chat", tags=["Chat"])
groq_service = GroqService()
profile_service = ProfileService()
security = HTTPBearer()


class ChatRequest(BaseModel):
    message: Optional[str] = None

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials
        
    # Call supabase to get user
    res = supabase.auth.get_user(token)
        
    if not res or not res.user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
            
    return res.user

def get_field_info(field_name: str):
    """Combines all field descriptions into one lookup."""
    all_descriptions = {
        **FIELD_DESCRIPTIONS,
        **FARMER_FIELD_DESCRIPTIONS,
        **STUDENT_FIELD_DESCRIPTIONS,
        **WOMEN_FIELD_DESCRIPTIONS
    }
    return all_descriptions.get(field_name, field_name)

def get_all_known_fields(sector: Optional[str] = None):
    """Returns a dict of all known field names -> descriptions.
    Includes basic fields and, if sector is known, sector-specific fields."""
    fields = dict(FIELD_DESCRIPTIONS)
    
    if sector:
        sector_lower = sector.lower()
        if "farmer" in sector_lower:
            fields.update(FARMER_FIELD_DESCRIPTIONS)
        elif "student" in sector_lower:
            fields.update(STUDENT_FIELD_DESCRIPTIONS)
        elif "women" in sector_lower:
            fields.update(WOMEN_FIELD_DESCRIPTIONS)
    
    return fields


def apply_field_update_to_db(user_id: str, field_name: str, field_value, profile: dict):
    """Update a single field in the appropriate database table.
    Returns the updated profile dict."""
    target_table = profile_service.get_table_name(field_name, sector=profile.get("sector"))
    
    update_data = {field_name: field_value}
    
    if target_table != "user_basic_info":
        # For sector tables, ensure a record exists before updating
        check_res = supabase.table(target_table).select("user_id").eq("user_id", user_id).execute()
        if not check_res.data:
            supabase.table(target_table).insert({"user_id": user_id, field_name: field_value}).execute()
        else:
            supabase.table(target_table).update(update_data).eq("user_id", user_id).execute()
    else:
        supabase.table(target_table).update(update_data).eq("user_id", user_id).execute()
    
    # Update local profile
    profile[field_name] = field_value
    return profile

@router.post("")
async def chat_endpoint(request: ChatRequest, user = Depends(get_current_user)):
    # 1. Fetch current profile
    profile_res = supabase.table("user_basic_info").select("*").eq("user_id", user.id).execute()
    
    if not profile_res.data:
        # Create initial record if missing
        supabase.table("user_basic_info").insert({"user_id": user.id}).execute()
        profile = {}
    else:
        profile = profile_res.data[0]

    # If basic is complete or sector is known, try to fetch sector-specific info
    sector = profile.get("sector")
    sector_table = profile_service.get_sector_table(sector)
    if sector_table:
        sector_res = supabase.table(sector_table).select("*").eq("user_id", user.id).execute()
        if sector_res.data:
            profile.update(sector_res.data[0])
    
    # 2. Identify the current missing field (what was being asked before this message)
    current_missing = profile_service.find_first_missing(profile, BASIC_FIELDS)
    if not current_missing:
        sector = profile.get("sector")
        sector_fields = profile_service.get_sector_fields(sector)
        current_missing = profile_service.find_first_missing(profile, sector_fields)
    
    # 3. If user sent a message, extract data for ALL known fields
    if request.message:
        # Build all known field descriptions (basic + sector-specific)
        all_fields = get_all_known_fields(sector)
        
        # Extract values for any fields mentioned in the message
        # Pass the current field being asked as context so the LLM can correctly map responses like "No"
        # Only pass current_field if profile has data (avoids false extraction on the very first message)
        has_prior_data = any(v for v in profile.values() if v)
        extraction_field = current_missing if has_prior_data else None
        extracted_data = await groq_service.extract_multiple_fields(
            all_fields, 
            request.message,
            current_field=extraction_field
        )
        
        if extracted_data:
            # Process 'sector' FIRST so subsequent field lookups use the correct sector table
            sector_value = extracted_data.pop("sector", None)
            if sector_value is not None and (not isinstance(sector_value, str) or sector_value.strip()):
                profile = apply_field_update_to_db(user.id, "sector", sector_value, profile)
                sector = sector_value
                # Refetch sector-specific profile if sector changed
                new_sector_table = profile_service.get_sector_table(sector)
                if new_sector_table:
                    sector_res = supabase.table(new_sector_table).select("*").eq("user_id", user.id).execute()
                    if sector_res.data:
                        profile.update(sector_res.data[0])
            
            # Process remaining extracted fields
            for field_name, field_value in extracted_data.items():
                if field_value is None or (isinstance(field_value, str) and field_value.strip() == ""):
                    continue
                # Skip if value hasn't changed to avoid unnecessary DB writes
                existing = profile.get(field_name)
                if existing is not None and str(existing) == str(field_value):
                    continue
                
                # Update this field in the database and local profile
                profile = apply_field_update_to_db(user.id, field_name, field_value, profile)
    
    # 5. Re-identify current phase and missing field (after processing message)
    missing_field = profile_service.find_first_missing(profile, BASIC_FIELDS)
    phase = "basic"
    
    if not missing_field:
        # Basic is complete, check sector-specific fields
        sector = profile.get("sector")
        sector_fields = profile_service.get_sector_fields(sector)
        missing_field = profile_service.find_first_missing(profile, sector_fields)
        phase = "sector_specific" if sector_fields else "completed"

    # 6. Check if profile is now fully complete
    if not missing_field:
        return {
            "status": "fully_completed",
            "question": "Thank you! Your profile is now complete. We have all the information needed to recommend the best schemes for you.",
            "profile": profile
        }
    
    # 7. Generate next question
    language = profile.get("preferred_language", "English")
    field_desc = get_field_info(missing_field)
    
    question = await groq_service.generate_question(
        field_name=missing_field,
        field_description=field_desc,
        profile=profile,
        language=language
    )
    
    return {
        "status": "asking",
        "phase": phase,
        "question": question,
        "missing_field": missing_field,
        "preferred_language": language
    }
