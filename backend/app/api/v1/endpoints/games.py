from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.services.games import GameService
from app.schemas.games import GameResponse

router = APIRouter()

@router.get("/", response_model=List[GameResponse])
async def get_games(db: Session = Depends(get_db)):
    """Get all available games"""
    game_service = GameService()
    try:
        games = game_service.get_all_games(db)
        return games
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{game_id}")
async def get_game(game_id: int, db: Session = Depends(get_db)):
    """Get specific game details"""
    game_service = GameService()
    try:
        game = game_service.get_game_by_id(db, game_id)
        if not game:
            raise HTTPException(status_code=404, detail="Game not found")
        return game
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
