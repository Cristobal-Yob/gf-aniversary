from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str
    timestamp: datetime = datetime.now()


class ChatHistoryItem(BaseModel):
    id: int
    message: str
    response: str
    created_at: datetime
    
    class Config:
        from_attributes = True
