from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.supabase_service import supabase
from services.profile_service import ProfileService
from services.gemini_service import GeminiService
from config.basic_questions import BASIC_FIELDS, FIELD_DESCRIPTIONS
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


router = APIRouter(prefix="/chat", tags=["Chat"])
gemini_service = GeminiService()
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
    
    # 2. Identify first missing field
    missing_field = None
    for field in BASIC_FIELDS:
        if not profile.get(field):
            missing_field = field
            break
            
    # 3. Handle user response if provided
    if request.message and missing_field:
        field_desc = FIELD_DESCRIPTIONS.get(missing_field, missing_field)
        extracted_data = await gemini_service.extract_data(missing_field, field_desc, request.message)
        
        if extracted_data.get(missing_field):
            # Update profile in Supabase
            supabase.table("user_basic_info").update(extracted_data).eq("user_id", user.id).execute()
            
            # Refresh profile and find NEXT missing field
            profile.update(extracted_data)
            missing_field = None
            for field in BASIC_FIELDS:
                if not profile.get(field):
                    missing_field = field
                    break

    # 4. Check if basic profile is now complete
    if not missing_field:
        return {"status": "basic_completed"}
    
    # 5. Generate next question
    language = profile.get("preferred_language", "English")
    field_desc = FIELD_DESCRIPTIONS.get(missing_field, missing_field)
    
    question = await gemini_service.generate_question(
        field_name=missing_field,
        field_description=field_desc,
        profile=profile,
        language=language
    )
    
    return {
        "working": True
    }
