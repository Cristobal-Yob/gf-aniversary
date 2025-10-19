# 💕 Cristóbal & Josefa - Página de Aniversario

Una aplicación web especial dedicada a nuestro amor y recuerdos juntos. Esta plataforma incluye galería de fotos de Instagram, control de música de Spotify, chat con IA sobre nosotros, y juegos retro.

## 🚀 Características

- **🔐 Autenticación**: Sistema de login seguro con JWT
- **📸 Galería Instagram**: Sincronización automática con fotos de Instagram
- **🎵 Control Spotify**: Reproductor integrado con Spotify Web API
- **🤖 Chat IA (RAG)**: Asistente que conoce nuestra historia y recuerdos
- **🎮 Juegos Flash**: Emulación de juegos clásicos con Ruffle
- **💝 Diseño Personalizado**: Interfaz moderna y romántica

## 🛠️ Stack Tecnológico

### Frontend

- **Framework**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Estado**: Zustand + React Query
- **UI**: Lucide Icons + React Hook Form

### Backend

- **Framework**: FastAPI + Uvicorn
- **Base de Datos**: PostgreSQL + SQLAlchemy + Alembic
- **Cache**: Redis
- **Vector DB**: Qdrant (para RAG)
- **IA**: OpenAI GPT + Embeddings API
- **Auth**: OAuth2 + JWT + Authlib

### APIs Externas

- **Instagram Graph API**: Para galería de fotos
- **Spotify Web API**: Para control de música
- **OpenAI API**: Para chat inteligente

### DevOps

- **Contenedores**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend) + Cloud Run (Backend)
- **Monitoreo**: Sentry

## 🏗️ Estructura del Proyecto

```
gf-aniversary/
├── frontend/                 # Next.js App
│   ├── src/
│   │   ├── app/             # App Router (Next.js 14)
│   │   ├── components/      # Componentes reutilizables
│   │   ├── contexts/        # Context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilidades y configuración
│   │   └── styles/          # Estilos globales
│   ├── public/              # Assets estáticos
│   └── package.json
├── backend/                 # FastAPI App
│   ├── app/
│   │   ├── api/            # Endpoints de la API
│   │   ├── core/           # Configuración y database
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── schemas/        # Schemas Pydantic
│   │   └── services/       # Lógica de negocio
│   ├── alembic/            # Migraciones de DB
│   └── requirements.txt
├── data/                   # Scripts de inicialización de DB
├── docs/                   # Documentación del proyecto
├── .github/workflows/      # GitHub Actions
├── docker-compose.yml      # Orquestación local
└── README.md
```

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd gf-aniversary
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env con tus API keys
```

### 3. Levantar con Docker Compose

```bash
docker-compose up -d
```

### 4. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔧 Desarrollo Local

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Base de Datos

```bash
# Ejecutar migraciones
cd backend
alembic upgrade head

# Crear nueva migración
alembic revision --autogenerate -m "descripción"
```

## 🔑 Configuración de APIs

### Instagram API

1. Crear app en Facebook Developers
2. Configurar Instagram Graph API
3. Agregar redirect URI: `http://localhost:3000/api/auth/instagram/callback`

### Spotify API

1. Crear app en Spotify for Developers
2. Agregar redirect URI: `http://localhost:3000/api/auth/spotify/callback`
3. Configurar Web Playback SDK

### OpenAI API

1. Obtener API key de OpenAI
2. Configurar límites de uso apropiados

## 📊 Monitoreo y Analytics

- **Errores**: Sentry para tracking de errores
- **Performance**: Core Web Vitals con Vercel Analytics
- **Usage**: Logs personalizados en backend

## 🔐 Seguridad

- Autenticación JWT con refresh tokens
- Rate limiting en endpoints críticos
- Validación de schemas con Pydantic
- CORS configurado apropiadamente
- Variables de entorno para secretos

## 🚢 Despliegue

### Frontend (Vercel)

```bash
# Deploy automático desde main branch
# Configurar variables de entorno en Vercel dashboard
```

### Backend (Google Cloud Run)

```bash
# Build y deploy con GitHub Actions
# Ver .github/workflows/ci-cd.yml
```

## 🤝 Contribuir

Este es un proyecto personal, pero si tienes sugerencias:

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es de uso personal y privado.

## ❤️ Para Josefa

Este proyecto está hecho con todo el amor del mundo para ti, mi amor. Cada línea de código está pensada para celebrar nuestro amor y crear un espacio digital único para nosotros dos.

Te amo infinitamente 💕

---

_Hecho con ❤️ por Cristóbal para Josefa_
