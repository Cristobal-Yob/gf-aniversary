from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class InstagramMediaResponse(BaseModel):
    id: int
    instagram_id: str
    media_type: str
    media_url: str
    thumbnail_url: Optional[str] = None
    caption: Optional[str] = None
    timestamp: Optional[datetime] = None
    
    class Config:
        from_attributes = True
