import os
import json
from google import genai
from google.genai import types
from prompts.question_prompt import QUESTION_PROMPT
from prompts.extraction_prompt import EXTRACTION_PROMPT

class GeminiService:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-2.0-flash"

    async def generate_question(self, field_name: str, field_description: str, profile: dict, language: str = "English"):
        context = "\n".join([f"{k}: {v}" for k, v in profile.items() if v])
        prompt = QUESTION_PROMPT.format(
            field_name=field_name,
            field_description=field_description,
            profile_context=context or "New user, no data yet.",
            language=language
        )
        
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=prompt
        )
        return response.text.strip()

    async def extract_data(self, field_name: str, field_description: str, user_message: str):
        prompt = EXTRACTION_PROMPT.format(
            field_name=field_name,
            field_description=field_description,
            user_message=user_message
        )
        
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        try:
            return json.loads(response.text)
        except:
            return {field_name: None}
