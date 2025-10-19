from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.services.gallery import InstagramService
from app.services.auth import get_current_user
from app.schemas.gallery import InstagramMediaResponse

router = APIRouter()

@router.get("/instagram", response_model=List[InstagramMediaResponse])
async def get_instagram_media(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get Instagram media from user's account"""
    if not current_user.instagram_access_token:
        raise HTTPException(status_code=400, detail="Instagram not connected")
    
    instagram_service = InstagramService()
    try:
        media = await instagram_service.get_user_media(
            current_user.instagram_access_token,
            db
        )
        return media
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/instagram/refresh")
async def refresh_instagram_media(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Refresh Instagram media cache"""
    if not current_user.instagram_access_token:
        raise HTTPException(status_code=400, detail="Instagram not connected")
    
    instagram_service = InstagramService()
    try:
        count = await instagram_service.refresh_media_cache(
            current_user.instagram_access_token,
            db
        )
        return {"message": f"Refreshed {count} media items"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
