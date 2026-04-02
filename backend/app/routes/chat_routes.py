from fastapi import APIRouter, HTTPException
from app.models import ChatRequest, ChatResponse, HistoryResponse, ChatMessage
from app.services.ai_service import ai_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Endpoint to receive a user message and return an AI response.
    """
    if not request.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    response = await ai_service.get_response(request.message)
    return ChatResponse(response=response)

@router.get("/history", response_model=HistoryResponse)
async def get_history():
    """
    Endpoint to retrieve the conversation history.
    """
    history = ai_service.get_history()
    # Map raw history to ChatMessage models
    history_models = [ChatMessage(role=msg["role"], content=msg["content"]) for msg in history]
    return HistoryResponse(history=history_models)

@router.post("/clear")
async def clear_history():
    """
    Endpoint to clear the conversation history.
    """
    ai_service.clear_history()
    return {"message": "Chat history cleared successfully"}
