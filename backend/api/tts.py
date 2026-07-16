import os
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/tts", tags=["TTS"])

# Map user-facing language names to SARVAM language codes
LANG_TO_SARVAM = {
    "Hindi": "hi-IN",
    "Marathi": "mr-IN",
    "Bengali": "bn-IN",
    "Tamil": "ta-IN",
    "Telugu": "te-IN",
    "Kannada": "kn-IN",
    "Gujarati": "gu-IN",
    "Malayalam": "ml-IN",
    "Odia": "od-IN",
    "Punjabi": "pa-IN",
}

SARVAM_API_URL = "https://api.sarvam.ai/text-to-speech"
SARVAM_MODEL = "bulbul:v3"
SARVAM_SPEAKER = "shubh"
MAX_CHARS = 2500  # bulbul:v3 limit


class TTSRequest(BaseModel):
    text: str
    language: str


@router.post("")
async def text_to_speech(request: TTSRequest):
    # Validate language (case-insensitive matching)
    lang_code = None
    for key, code in LANG_TO_SARVAM.items():
        if key.lower() == request.language.lower():
            lang_code = code
            break

    if not lang_code:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language: {request.language}. Supported: {list(LANG_TO_SARVAM.keys())}"
        )

    # Truncate text if too long
    text = request.text[:MAX_CHARS]

    api_key = os.getenv("SARVAM_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="SARVAM API key not configured")

    # Call SARVAM API
    try:
        response = requests.post(
            SARVAM_API_URL,
            headers={
                "api-subscription-key": api_key,
                "Content-Type": "application/json",
            },
            json={
                "text": text,
                "target_language_code": lang_code,
                "model": SARVAM_MODEL,
                "speaker": SARVAM_SPEAKER,
            },
            timeout=30,
        )
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"SARVAM API request failed: {str(e)}")

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"SARVAM API error: {response.text}"
        )

    data = response.json()
    audios = data.get("audios", [])

    if not audios:
        raise HTTPException(status_code=500, detail="SARVAM API returned no audio data")

    # Join all audio segments (API may split long text into multiple segments)
    combined_audio = "".join(audios)

    return {
        "audio": combined_audio,
        "format": "wav",
    }
