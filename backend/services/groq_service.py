import os
import json
from groq import Groq
from prompts.question_prompt import QUESTION_PROMPT
from prompts.extraction_prompt import EXTRACTION_PROMPT, MULTI_FIELD_EXTRACTION_PROMPT

class GroqService:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        self.client = Groq(api_key=api_key)
        # Using a highly capable Llama 3 model available on Groq
        self.model_id = "llama-3.3-70b-versatile"

    async def generate_question(self, field_name: str, field_description: str, profile: dict, language: str = "English"):
        context = "\n".join([f"{k}: {v}" for k, v in profile.items() if v])
        prompt = QUESTION_PROMPT.format(
            field_name=field_name,
            field_description=field_description,
            profile_context=context or "New user, no data yet.",
            language=language
        )
        
        response = self.client.chat.completions.create(
            model=self.model_id,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()

    async def extract_data(self, field_name: str, field_description: str, user_message: str):
        prompt = EXTRACTION_PROMPT.format(
            field_name=field_name,
            field_description=field_description,
            user_message=user_message
        )
        
        response = self.client.chat.completions.create(
            model=self.model_id,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        try:
            return json.loads(response.choices[0].message.content)
        except:
            return {field_name: None}

    async def extract_multiple_fields(self, fields_and_descriptions: dict, user_message: str, current_field: str = None):
        """
        Extract values for ANY of the given fields from the user's message.
        fields_and_descriptions: dict mapping field_name -> field_description
        current_field: the field currently being asked about (for context)
        Returns a dict of field_name -> extracted_value for all found fields
        """
        if not fields_and_descriptions:
            return {}
            
        formatted_fields = "\n".join([
            f"- {field}: {desc}" 
            for field, desc in fields_and_descriptions.items()
        ])
        
        # Build context about the current field being asked
        if current_field and current_field in fields_and_descriptions:
            current_field_context = f"The user was just asked about '{current_field}' ({fields_and_descriptions[current_field]}). This is the most likely field their response refers to."
        elif current_field:
            current_field_context = f"The user was just asked about '{current_field}'."
        else:
            current_field_context = "No specific field is being asked about right now."
        
        prompt = MULTI_FIELD_EXTRACTION_PROMPT.format(
            fields_and_descriptions=formatted_fields,
            current_field_context=current_field_context,
            user_message=user_message
        )
        
        response = self.client.chat.completions.create(
            model=self.model_id,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        try:
            return json.loads(response.choices[0].message.content)
        except:
            return {}
