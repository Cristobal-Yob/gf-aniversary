from fastapi import APIRouter
from app.api.v1.endpoints import auth, gallery, music, chat, games

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["Gallery"])
api_router.include_router(music.router, prefix="/music", tags=["Music"])
api_router.include_router(chat.router, prefix="/chat", tags=["AI Chat"])
api_router.include_router(games.router, prefix="/games", tags=["Games"])
