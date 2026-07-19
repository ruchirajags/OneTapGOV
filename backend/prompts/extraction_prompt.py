EXTRACTION_PROMPT = """
You are an expert data extraction assistant.
The user has been asked about: {field_name} ({field_description}).

User's Response: "{user_message}"

TASK:
Extract the value for '{field_name}' from the user's response.
Return ONLY a JSON object in this format:
{{
  "{field_name}": "extracted_value"
}}

If the value is not found or is unclear, return:
{{
  "{field_name}": null
}}

Guidelines:
- If the field is 'age', return an integer.
- If the field is 'income', return a number.
- For other fields, return a string (e.g., "Hindi", "Male", "Maharashtra").
- Translate values to English where appropriate (e.g., if user says "Hindi mein", return "Hindi").
- Be concise.
"""


MULTI_FIELD_EXTRACTION_PROMPT = """
You are an expert data extraction assistant.
The user is filling out their profile for government scheme recommendations.

The user's message may contain information about one or more profile fields.

Available Fields and Their Descriptions:
{fields_and_descriptions}

Current Field Being Asked:
{current_field_context}

User's Response: "{user_message}"

TASK:
Extract values for ANY of the above fields that are mentioned or implied in the user's response. This includes:
- Fields where the user is providing a new answer
- Fields where the user is correcting or updating a previously given value
- The user may say things like "Actually my age is 20" or "I meant 25 instead" — treat these as corrections

Return ONLY a JSON object with the extracted fields. Example:
{{
  "age": 20,
  "state": "Maharashtra",
  "income": 250000
}}

If no fields can be confidently extracted, return an empty JSON object: {{}}

Guidelines:
- If the field is 'age', return an integer.
- If the field is 'income', return a number.
- For most other fields, return a string.
- Translate values to English where appropriate.
- Only include fields you are highly confident about.
- Pay attention to correction phrases like "actually", "instead", "not", "change", "correct", "update", "I meant".

IMPORTANT — Handling Negative / Denial Responses:
- If the user says "no", "not", "none", "don't have", "doesn't apply", "nah", "nope", or any other denial, EXTRACT the value as "No" for the field being asked about.
- If the user says "yes", "yeah", "have", "do", "I do", "I have", or any affirmative response, EXTRACT the value as "Yes" for the field being asked about.
- A negative answer IS valuable information — do NOT skip it or treat it as "no data extracted".
- Example: User says "No, I don't have any disability" → extract {{"disability": "No"}}
- Example: User says "Yes" when asked about minority status → extract {{"minority_status": "Yes"}}
- Example: User says "No disability" → extract {{"disability": "No"}}
- Example: User says "I don't own any land" → extract {{"agricultural_land": "No"}}
- Example: User says "I have a bank account" → extract {{"bank_account": "Yes"}}
"""
