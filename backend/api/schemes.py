from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from services.supabase_service import supabase
from services.profile_service import ProfileService
from services.eligibility_service import EligibilityService
from data.document_info import DOCUMENT_DETAILS
from api.chat import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/schemes", tags=["Schemes"])
profile_service = ProfileService()
eligibility_service = EligibilityService()

class DocumentUpdate(BaseModel):
    documents: List[str]

@router.get("/eligible")
async def get_eligible_schemes(user = Depends(get_current_user)):
    # 1. Fetch full profile
    profile_res = supabase.table("user_basic_info").select("*").eq("user_id", user.id).execute()
    if not profile_res.data:
        raise HTTPException(status_code=400, detail="Profile not found. Please complete your profile first.")
    
    profile = profile_res.data[0]
    sector = profile.get("sector")
    
    # Check if basic profile is complete
    from config.basic_questions import BASIC_FIELDS
    if profile_service.find_first_missing(profile, BASIC_FIELDS):
        return {"status": "incomplete", "message": "Please complete your basic profile first."}

    # Fetch sector specific info
    sector_table = profile_service.get_sector_table(sector)
    if sector_table:
        sector_res = supabase.table(sector_table).select("*").eq("user_id", user.id).execute()
        if sector_res.data:
            profile.update(sector_res.data[0])
        
        # Check if sector profile is complete
        sector_fields = profile_service.get_sector_fields(sector)
        if profile_service.find_first_missing(profile, sector_fields):
            return {"status": "incomplete", "message": f"Please complete your {sector} profile to see matching schemes."}

    # 2. Get eligible schemes
    eligible_schemes = eligibility_service.get_eligible_schemes(profile)

    # 3. Fetch user held documents
    try:
        doc_res = supabase.table("user_documents").select("document_name").eq("user_id", user.id).execute()
        user_docs = [d["document_name"] for d in doc_res.data] if doc_res.data else []
    except Exception as e:
        print(f"Error fetching documents: {e}")
        user_docs = []

    # 4. Enhance schemes with document details and readiness
    enhanced_schemes = []
    for scheme in eligible_schemes:
        scheme_docs = scheme.get("documents", [])
        readiness = eligibility_service.calculate_readiness(scheme_docs, user_docs)
        
        # Add document details (how to apply, etc.)
        doc_info_list = []
        for doc in scheme_docs:
            info = DOCUMENT_DETAILS.get(doc, {"description": "No information available", "how_to_apply": "Contact local authorities."})
            doc_info_list.append({
                "name": doc,
                "has_it": doc in user_docs,
                **info
            })
            
        scheme["document_readiness"] = readiness
        scheme["detailed_documents"] = doc_info_list
        enhanced_schemes.append(scheme)

    return {
        "status": "success",
        "schemes": enhanced_schemes,
        "user_documents": user_docs
    }

@router.post("/update-documents")
async def update_documents(data: DocumentUpdate, user = Depends(get_current_user)):
    # Clear existing documents for user and insert new ones
    # (Simplified approach for hackathon: delete and re-insert)
    try:
        supabase.table("user_documents").delete().eq("user_id", user.id).execute()
        
        if data.documents:
            insert_data = [{"user_id": user.id, "document_name": doc} for doc in data.documents]
            supabase.table("user_documents").insert(insert_data).execute()
            
        return {"status": "success", "message": "Documents updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
