from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.music import SpotifyService
from app.services.auth import get_current_user

router = APIRouter()

@router.get("/player/state")
async def get_player_state(current_user = Depends(get_current_user)):
    """Get current Spotify player state"""
    if not current_user.spotify_access_token:
        raise HTTPException(status_code=400, detail="Spotify not connected")
    
    spotify_service = SpotifyService()
    try:
        state = await spotify_service.get_player_state(current_user.spotify_access_token)
        return state
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/player/play")
async def play_music(
    track_uri: str = None,
    current_user = Depends(get_current_user)
):
    """Play/resume music"""
    if not current_user.spotify_access_token:
        raise HTTPException(status_code=400, detail="Spotify not connected")
    
    spotify_service = SpotifyService()
    try:
        result = await spotify_service.play(current_user.spotify_access_token, track_uri)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/player/pause")
async def pause_music(current_user = Depends(get_current_user)):
    """Pause music"""
    if not current_user.spotify_access_token:
        raise HTTPException(status_code=400, detail="Spotify not connected")
    
    spotify_service = SpotifyService()
    try:
        result = await spotify_service.pause(current_user.spotify_access_token)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/playlists")
async def get_playlists(current_user = Depends(get_current_user)):
    """Get user's Spotify playlists"""
    if not current_user.spotify_access_token:
        raise HTTPException(status_code=400, detail="Spotify not connected")
    
    spotify_service = SpotifyService()
    try:
        playlists = await spotify_service.get_user_playlists(current_user.spotify_access_token)
        return playlists
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
