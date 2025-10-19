'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function GamesPage() {
  const { isAuthenticated } = useAuth()
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const [ruffleLoaded, setRuffleLoaded] = useState(false)

  // Cargar Ruffle (emulador Flash)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@ruffle-rs/ruffle'
    script.defer = true
    script.onload = () => setRuffleLoaded(true)
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 text-6xl">🔒</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Área Privada
            </h1>
            <p className="mb-8 text-gray-600">
              Necesitas iniciar sesión para jugar nuestros juegos
            </p>
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
            >
              Iniciar Sesión 💖
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Si hay un juego seleccionado, mostrar el juego Flash con Ruffle
  if (selectedGame !== null) {
    const game = games[selectedGame]
    return (
      <div className="flex h-screen w-full flex-col bg-black">
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-orange-600 p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedGame(null)}
              className="rounded-lg bg-white/20 px-4 py-2 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30"
            >
              ← Volver
            </button>
            <h2 className="text-xl font-bold text-white">
              {game.emoji} {game.title}
            </h2>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          {!ruffleLoaded ? (
            <div className="text-center">
              <div className="mb-4 animate-pulse text-6xl">⏳</div>
              <p className="text-xl text-white">Cargando emulador Flash...</p>
            </div>
          ) : game.swfPath ? (
            <object
              type="application/x-shockwave-flash"
              data={game.swfPath}
              width={game.width || 960}
              height={game.height || 600}
              className="rounded-lg shadow-2xl"
            >
              <param name="movie" value={game.swfPath} />
              <param name="quality" value="high" />
              <param name="allowScriptAccess" value="always" />
            </object>
          ) : (
            <iframe
              src={game.url}
              className="h-full w-full rounded-lg"
              allowFullScreen
              title={game.title}
            />
          )}
        </div>
      </div>
    )
  }

  // Vista de galería de juegos
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mb-4 text-6xl">🎮</div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Sala de Juegos
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Juegos clásicos para disfrutar juntos 💕
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => setSelectedGame(index)}
              className="transform cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-pink-200 to-orange-200">
                <span className="text-6xl">{game.emoji}</span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {game.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">{game.description}</p>
                {'swfPath' in game && (
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                    <span>⚡ Flash/Ruffle</span>
                    <span>
                      📏 {game.width}x{game.height}
                    </span>
                  </div>
                )}
                <button className="w-full rounded-lg bg-pink-600 py-2 font-medium text-white transition-colors hover:bg-pink-700">
                  Jugar Ahora 🎮
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-4xl">✨</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Más juegos retro llegando pronto
          </h2>
          <p className="mb-6 text-gray-600">
            Estamos agregando más juegos clásicos para disfrutar juntos
          </p>
          <div className="rounded-lg bg-purple-50 p-4">
            <p className="text-sm text-purple-700">
              🎮 Pac-Man, Tetris, Mario y más juegos nostálgicos...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const games = [
  {
    emoji: '🦸',
    title: 'KND Operation Startup',
    description:
      'Ayuda a los KND en su misión. Juego clásico Flash de acción y aventura.',
    swfPath: '/operation-startup-1593783454.swf',
    width: 960,
    height: 600,
  },
  {
    emoji: '🏃',
    title: 'Temple Run',
    description: 'Corre sin parar en este adictivo juego de aventuras.',
    url: 'https://www.crazygames.com/embed/temple-run-2',
  },
  {
    emoji: '🐍',
    title: 'Snake',
    description:
      'El clásico juego de la serpiente. ¡A ver quién logra el puntaje más alto!',
    url: 'https://www.google.com/fbx?fbx=snake_arcade',
  },
  {
    emoji: '👾',
    title: 'Space Invaders',
    description:
      'Defiende la Tierra de la invasión alienígena en este clásico arcade.',
    url: 'https://www.crazygames.com/embed/space-invaders',
  },
  {
    emoji: '🧱',
    title: 'Tetris',
    description:
      'El legendario juego de bloques. ¡Desafíate a completar líneas!',
    url: 'https://www.crazygames.com/embed/tetris',
  },
  {
    emoji: '⚽',
    title: '2 Player Soccer',
    description:
      'Juego de fútbol para dos jugadores. ¡Compite contra tu pareja!',
    url: 'https://www.crazygames.com/embed/2-player-soccer',
  },
]
