from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.services.chat import RAGChatService
from app.services.auth import get_current_user
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter()

class ChatMessage(BaseModel):
    message: str

@router.post("/", response_model=ChatResponse)
async def chat_with_ai(
    request: ChatRequest,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Chat with AI assistant about the couple"""
    rag_service = RAGChatService()
    try:
        response = await rag_service.generate_response(
            request.message,
            current_user.id,
            db
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_chat_history(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's chat history"""
    try:
        # Implementation to get chat history from database
        # This would query the ChatMessage model
        return {"messages": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
