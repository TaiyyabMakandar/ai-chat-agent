import os
import httpx
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.api_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")
        # Verified working model on HF Router chat/completions
        self.model_id = "Qwen/Qwen2.5-72B-Instruct"
        self.api_url = "https://router.huggingface.co/v1/chat/completions"
        
        if not self.api_token:
            print("Warning: HUGGINGFACEHUB_API_TOKEN not found. Please set it in .env")
        
        self.chat_history = []

    async def get_response(self, user_input: str) -> str:
        """
        Generates a response using the Qwen-2.5 model via the HF Router.
        """
        # Save user message immediately so it's not lost
        self.chat_history.append({"role": "user", "content": user_input})

        try:
            # Construct messages for the API
            messages = [{"role": "system", "content": "You are a helpful AI assistant."}]
            
            # Add history (excluding the current user_input we just added, as it's added again below)
            # Actually, the router expects the full history including the latest user message
            # So I'll build it from the existing self.chat_history
            for msg in self.chat_history[-11:]: # Last 10 + the current one
                role = "assistant" if msg["role"] == "assistant" else "user"
                messages.append({"role": role, "content": msg["content"]})
            
            headers = {
                "Authorization": f"Bearer {self.api_token}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model_id,
                "messages": messages,
                "max_tokens": 512,
                "temperature": 0.7
            }

            print(f"Calling HF Router with model: {self.model_id}...")
            async with httpx.AsyncClient() as client:
                response = await client.post(self.api_url, headers=headers, json=payload, timeout=60.0)
                
                if response.status_code != 200:
                    error_detail = response.text
                    error_msg = f"Error from AI Service ({response.status_code}): {error_detail}"
                    print(f"HuggingFace API Error: {error_msg}")
                    # Also append error to history so user sees what went wrong in history
                    self.chat_history.append({"role": "assistant", "content": error_msg})
                    return error_msg
                
                result = response.json()
                answer = result["choices"][0]["message"]["content"].strip()

            # Update history with the successful AI answer
            self.chat_history.append({"role": "assistant", "content": answer})
            
            return answer
        except Exception as e:
            error_msg = f"Error connecting to AI Provider: {type(e).__name__}: {str(e)}"
            print(f"Exception in AIService: {error_msg}")
            self.chat_history.append({"role": "assistant", "content": error_msg})
            return error_msg

    def get_history(self):
        """
        Returns the chat history.
        """
        return self.chat_history

    def clear_history(self):
        """
        Clears the chat history.
        """
        print("AIService: Clearing chat history...")
        self.chat_history = []

# Singleton instance
ai_service = AIService()
