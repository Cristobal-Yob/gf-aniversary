from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # OAuth tokens
    spotify_access_token = Column(String)
    spotify_refresh_token = Column(String)
    instagram_access_token = Column(String)
    
    # Relationships
    chat_messages = relationship("ChatMessage", back_populates="user")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text, nullable=False)
    response = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="chat_messages")


class InstagramMedia(Base):
    __tablename__ = "instagram_media"
    
    id = Column(Integer, primary_key=True, index=True)
    instagram_id = Column(String, unique=True, nullable=False)
    media_type = Column(String)  # IMAGE, VIDEO, CAROUSEL_ALBUM
    media_url = Column(String, nullable=False)
    thumbnail_url = Column(String)
    caption = Column(Text)
    timestamp = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Game(Base):
    __tablename__ = "games"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    file_path = Column(String, nullable=False)
    game_type = Column(String)  # FLASH, HTML5
    thumbnail_url = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
