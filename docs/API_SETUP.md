# Guía de Configuración de APIs

## 🎵 Configuración de Spotify API

### 1. Crear aplicación en Spotify for Developers

1. Ve a [Spotify for Developers](https://developer.spotify.com/)
2. Inicia sesión con tu cuenta de Spotify
3. Ve a Dashboard > Create an App
4. Completa la información de la app:
   - **App name**: GF Anniversary
   - **App description**: Personal anniversary app for couple
   - **Website**: http://localhost:3000 (para desarrollo)
   - **Redirect URI**: http://localhost:3000/api/auth/spotify/callback

### 2. Configurar variables de entorno

```bash
SPOTIFY_CLIENT_ID=tu_client_id_aqui
SPOTIFY_CLIENT_SECRET=tu_client_secret_aqui
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback
```

### 3. Scopes necesarios

- `user-read-playback-state`
- `user-modify-playback-state`
- `user-read-currently-playing`
- `streaming`
- `playlist-read-private`
- `playlist-read-collaborative`

## 📸 Configuración de Instagram API

### 1. Crear aplicación en Facebook for Developers

1. Ve a [Facebook for Developers](https://developers.facebook.com/)
2. Crea una nueva app > Consumer
3. Agrega el producto "Instagram Graph API"

### 2. Configurar Instagram Graph API

1. En el dashboard de tu app, ve a Instagram Graph API
2. Configura los permisos:
   - `instagram_graph_user_profile`
   - `instagram_graph_user_media`
3. Agrega redirect URI: `http://localhost:3000/api/auth/instagram/callback`

### 3. Variables de entorno

```bash
INSTAGRAM_CLIENT_ID=tu_client_id_aqui
INSTAGRAM_CLIENT_SECRET=tu_client_secret_aqui
INSTAGRAM_REDIRECT_URI=http://localhost:3000/api/auth/instagram/callback
```

## 🤖 Configuración de OpenAI API

### 1. Obtener API Key

1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Crea una cuenta o inicia sesión
3. Ve a API Keys y crea una nueva key

### 2. Variables de entorno

```bash
OPENAI_API_KEY=sk-tu_api_key_aqui
```

### 3. Configurar límites

- Establece límites de uso mensual en el dashboard
- Configura alertas de uso

## 🔧 Configuración de Qdrant (Vector Database)

### Para desarrollo local:

Qdrant se ejecuta automáticamente con Docker Compose, no necesita configuración adicional.

### Para producción:

1. Crea una instancia de Qdrant Cloud o despliega tu propio servidor
2. Configura la URL:

```bash
QDRANT_URL=https://tu-instancia-qdrant.com
```

## 🛠️ Variables de Entorno Completas

Copia el archivo `.env.example` a `.env` y completa todos los valores:

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/gf_anniversary
REDIS_URL=redis://localhost:6379

# AI & Vector DB
OPENAI_API_KEY=sk-tu_api_key_aqui
QDRANT_URL=http://localhost:6333

# Authentication
JWT_SECRET_KEY=tu_super_secreto_jwt_key_aqui
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Spotify API
SPOTIFY_CLIENT_ID=tu_spotify_client_id
SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback

# Instagram API
INSTAGRAM_CLIENT_ID=tu_instagram_client_id
INSTAGRAM_CLIENT_SECRET=tu_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/api/auth/instagram/callback

# External Services
SENTRY_DSN=tu_sentry_dsn_aqui

# Frontend URLs
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔐 Consejos de Seguridad

1. **Nunca commits** las API keys al repositorio
2. **Usa variables de entorno** para todos los secretos
3. **Regenera las keys** periódicamente
4. **Configura rate limiting** en todas las APIs
5. **Monitorea el uso** de las APIs regularmente

## 🚀 Testing de APIs

### Spotify

```bash
# Test de autenticación
curl -X GET "https://accounts.spotify.com/authorize?client_id=TU_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/auth/spotify/callback&scope=user-read-playback-state"
```

### Instagram

```bash
# Test de autenticación
curl -X GET "https://api.instagram.com/oauth/authorize?client_id=TU_CLIENT_ID&redirect_uri=http://localhost:3000/api/auth/instagram/callback&scope=user_profile,user_media&response_type=code"
```

### OpenAI

```bash
# Test de API
curl -X POST "https://api.openai.com/v1/chat/completions" \
  -H "Authorization: Bearer TU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello!"}]}'
```
