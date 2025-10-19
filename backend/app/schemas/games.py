from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class GameResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    file_path: str
    game_type: str
    thumbnail_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
