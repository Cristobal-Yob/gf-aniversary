import openai
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from app.core.config import settings
from app.models import ChatMessage
from app.schemas.chat import ChatResponse


class RAGChatService:
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.qdrant_client = QdrantClient(url=settings.QDRANT_URL)
        self.collection_name = "couple_memories"
        
    async def initialize_collection(self):
        """Initialize the Qdrant collection if it doesn't exist"""
        try:
            self.qdrant_client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
            )
        except Exception:
            # Collection already exists
            pass
    
    async def add_memories(self, texts: List[str]):
        """Add memory texts to the vector database"""
        await self.initialize_collection()
        
        # Generate embeddings
        embeddings = []
        for text in texts:
            response = self.openai_client.embeddings.create(
                model="text-embedding-ada-002",
                input=text
            )
            embeddings.append(response.data[0].embedding)
        
        # Store in Qdrant
        points = [
            PointStruct(
                id=i,
                vector=embedding,
                payload={"text": text}
            )
            for i, (text, embedding) in enumerate(zip(texts, embeddings))
        ]
        
        self.qdrant_client.upsert(
            collection_name=self.collection_name,
            points=points
        )
    
    async def search_relevant_memories(self, query: str, limit: int = 3) -> List[str]:
        """Search for relevant memories based on query"""
        # Generate query embedding
        response = self.openai_client.embeddings.create(
            model="text-embedding-ada-002",
            input=query
        )
        query_embedding = response.data[0].embedding
        
        # Search in Qdrant
        search_results = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=limit
        )
        
        return [result.payload["text"] for result in search_results]
    
    async def generate_response(self, message: str, user_id: int, db: Session) -> ChatResponse:
        """Generate AI response using RAG"""
        # Search for relevant context
        relevant_memories = await self.search_relevant_memories(message)
        
        # Create context
        context = "\n".join(relevant_memories) if relevant_memories else "No specific memories found."
        
        # Create prompt
        system_prompt = f"""
        Eres un asistente cariñoso que conoce muy bien la relación entre Cristóbal y Josefa.
        Responde de manera amigable y personal, usando la información disponible sobre ellos.
        
        Contexto relevante:
        {context}
        
        Responde en un tono cálido y personal, como si fueras un amigo cercano de la pareja.
        """
        
        # Generate response
        chat_response = self.openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            max_tokens=300,
            temperature=0.7
        )
        
        ai_response = chat_response.choices[0].message.content
        
        # Save to database
        chat_record = ChatMessage(
            user_id=user_id,
            message=message,
            response=ai_response
        )
        db.add(chat_record)
        db.commit()
        
        return ChatResponse(
            response=ai_response,
            timestamp=datetime.now()
        )
