#!/bin/bash

# Script de inicio para desarrollo local
# Ejecuta: chmod +x start.sh && ./start.sh

set -e

echo "🚀 Iniciando GF Anniversary Development Environment..."

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor inicia Docker y vuelve a intentar."
    exit 1
fi

# Verificar que existe el archivo .env
if [ ! -f .env ]; then
    echo "📋 Copiando .env.example a .env..."
    cp .env.example .env
    echo "⚠️  Por favor edita el archivo .env con tus API keys antes de continuar."
    echo "📖 Consulta docs/API_SETUP.md para obtener las API keys necesarias."
    read -p "Presiona Enter cuando hayas configurado tu archivo .env..."
fi

echo "🐳 Iniciando servicios con Docker Compose..."
docker-compose up -d db redis qdrant

echo "⏳ Esperando que la base de datos esté lista..."
sleep 10

echo "🔄 Ejecutando migraciones de base de datos..."
cd backend
if [ ! -d "alembic" ]; then
    echo "🆕 Inicializando Alembic..."
    pip install -r requirements.txt
    alembic init alembic
fi

# Aplicar migraciones
alembic upgrade head || echo "⚠️  No hay migraciones que aplicar"
cd ..

echo "🎯 Iniciando servicios de aplicación..."
docker-compose up -d

echo "⏳ Esperando que los servicios estén listos..."
sleep 15

echo "✅ ¡Listo! Los servicios están corriendo:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔧 Backend API: http://localhost:8000"
echo "   📚 API Docs: http://localhost:8000/docs"
echo "   🗄️  PostgreSQL: localhost:5432"
echo "   🔴 Redis: localhost:6379"
echo "   🔍 Qdrant: localhost:6333"

echo ""
echo "🔧 Comandos útiles:"
echo "   docker-compose logs -f          # Ver logs en tiempo real"
echo "   docker-compose down             # Detener todos los servicios"
echo "   docker-compose ps               # Ver estado de servicios"
echo ""
echo "💕 ¡Disfruta desarrollando tu página de aniversario!"
