'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { IconArrowRight, IconGamepad } from '@/components/icons'
import PrivateSheet from '@/components/secondary/PrivateSheet'
import SheetHeader from '@/components/secondary/SheetHeader'
import GameGlyph, { type GameGlyphName } from '@/components/secondary/GameGlyph'
import { useReveal } from '@/components/secondary/motion'

interface Game {
  glyph: GameGlyphName
  title: string
  description: string
  swfPath?: string
  url?: string
  width?: number
  height?: number
}

export default function GamesPage() {
  const { isAuthenticated } = useAuth()
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const [ruffleLoaded, setRuffleLoaded] = useState(false)
  const reveal = useReveal()

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
      <PrivateSheet
        title="Área Privada"
        message="Necesitas iniciar sesión para jugar nuestros juegos"
      />
    )
  }

  // Si hay un juego seleccionado, mostrar el juego Flash con Ruffle
  if (selectedGame !== null) {
    const game = games[selectedGame]
    const width = game.width || 960
    const height = game.height || 600

    return (
      <div className="flex h-[calc(100svh-var(--player-h))] w-full flex-col bg-ink text-paper">
        <div className="flex items-center gap-4 border-b-2 border-paper px-4 py-3 md:px-8">
          <button
            onClick={() => setSelectedGame(null)}
            className="btn-almanac shrink-0 border-paper px-4 py-2 text-paper hover:bg-paper hover:text-ink"
          >
            <IconArrowRight className="h-5 w-5 rotate-180" />
            Volver
          </button>
          <h2 className="flex min-w-0 items-center gap-3 font-display text-2xl font-extrabold uppercase leading-none md:text-3xl">
            <GameGlyph name={game.glyph} className="h-7 w-7 shrink-0 text-marker" />
            <span className="truncate">{game.title}</span>
          </h2>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center p-4">
          {!ruffleLoaded ? (
            <div role="status" className="text-center">
              <IconGamepad className="mx-auto mb-4 h-14 w-14 text-marker motion-safe:animate-pulse" />
              <p className="font-display text-2xl font-semibold uppercase tracking-wide">
                Cargando emulador Flash...
              </p>
            </div>
          ) : game.swfPath ? (
            <div
              className="w-full border-2 border-paper"
              style={{
                aspectRatio: `${width} / ${height}`,
                // Cabe por ancho o por alto, lo que se acabe primero
                maxWidth: `min(${width}px, calc((100svh - var(--player-h) - 6rem) * ${width / height}))`,
              }}
            >
              <object
                type="application/x-shockwave-flash"
                data={game.swfPath}
                width="100%"
                height="100%"
              >
                <param name="movie" value={game.swfPath} />
                <param name="quality" value="high" />
                <param name="allowScriptAccess" value="always" />
              </object>
            </div>
          ) : (
            <iframe
              src={game.url}
              className="h-full w-full border-2 border-paper bg-paper"
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
    <>
      <Navbar />

      <main>
        <SheetHeader label="Juegos" title="Sala de Juegos">
          <p>Juegos clásicos para disfrutar juntos</p>
        </SheetHeader>

        <section className="px-4 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28 lg:pt-10">
          <ul className="mx-auto max-w-7xl border-t-2 border-ink">
            {games.map((game, index) => (
              <motion.li
                key={game.title}
                {...reveal(Math.min(index, 4) * 0.06)}
                className="border-b-2 border-ink"
              >
                <button
                  type="button"
                  onClick={() => setSelectedGame(index)}
                  className="group grid w-full grid-cols-[auto_1fr] items-center gap-4 py-5 text-left transition-colors duration-200 hover:bg-ink hover:text-paper sm:grid-cols-[auto_1fr_auto] md:gap-8 md:px-4 md:py-7"
                >
                  <span className="flex h-16 w-16 items-center justify-center bg-calipso text-ink transition-colors duration-200 group-hover:bg-marker group-hover:text-ink md:h-24 md:w-24">
                    <GameGlyph name={game.glyph} className="h-9 w-9 md:h-12 md:w-12" />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-display text-3xl font-extrabold uppercase leading-none md:text-5xl">
                      {game.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-base text-dim transition-colors duration-200 group-hover:text-rule md:text-lg">
                      {game.description}
                    </span>
                    {game.swfPath && (
                      <span className="mt-2 flex gap-4 font-display text-sm font-semibold uppercase tracking-wide text-dim transition-colors duration-200 group-hover:text-rule">
                        <span>Flash/Ruffle</span>
                        <span className="tabular-nums">
                          {game.width}x{game.height}
                        </span>
                      </span>
                    )}
                  </span>

                  <span className="col-span-2 flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide sm:col-span-1">
                    Jugar Ahora
                    <IconArrowRight className="h-6 w-6 transition-transform duration-200 ease-out group-hover:translate-x-2 md:h-8 md:w-8" />
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-ink px-4 pb-28 pt-16 text-paper md:px-8 md:pb-32 md:pt-24">
        <motion.div {...reveal()} className="mx-auto max-w-7xl">
          <IconGamepad className="h-12 w-12 text-marker md:h-16 md:w-16" />
          <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl">
            Más juegos retro llegando pronto
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-rule md:text-xl">
            Estamos agregando más juegos clásicos para disfrutar juntos
          </p>
          <p className="mt-8 border-t border-rule pt-4 font-display text-xl font-semibold uppercase tracking-wide text-marker">
            Pac-Man, Tetris, Mario y más juegos nostálgicos...
          </p>
        </motion.div>
      </footer>
    </>
  )
}

const games: Game[] = [
  {
    glyph: 'hero',
    title: 'KND Operation Startup',
    description:
      'Ayuda a los KND en su misión. Juego clásico Flash de acción y aventura.',
    swfPath: '/games/operation-startup-1593783454.swf',
    width: 960,
    height: 600,
  },
  {
    glyph: 'web',
    title: 'KND Operation Startup (Web)',
    description:
      'Versión web del clásico juego de Codename Kids Next Door. ¡Acción y aventura!',
    url: 'https://www.mariogames.be/Codename_Kids_Next_Door_Operation_Startup_Game',
  },
  {
    glyph: 'flower',
    title: 'Plants vs Zombies',
    description:
      '¡Defiende tu jardín de los zombies con plantas! Estrategia y diversión clásica.',
    url: 'http://www.playgamesarcade.com/playgame/1488/plants-vs-zombies.html',
  },
  {
    glyph: 'runner',
    title: 'Temple Run',
    description: 'Corre sin parar en este adictivo juego de aventuras.',
    url: 'https://www.crazygames.com/embed/temple-run-2',
  },
  {
    glyph: 'snake',
    title: 'Snake',
    description:
      'El clásico juego de la serpiente. ¡A ver quién logra el puntaje más alto!',
    url: 'https://www.google.com/fbx?fbx=snake_arcade',
  },
  {
    glyph: 'invader',
    title: 'Space Invaders',
    description:
      'Defiende la Tierra de la invasión alienígena en este clásico arcade.',
    url: 'https://www.crazygames.com/embed/space-invaders',
  },
  {
    glyph: 'blocks',
    title: 'Tetris',
    description:
      'El legendario juego de bloques. ¡Desafíate a completar líneas!',
    url: 'https://www.crazygames.com/embed/tetris',
  },
  {
    glyph: 'ball',
    title: '2 Player Soccer',
    description:
      'Juego de fútbol para dos jugadores. ¡Compite contra tu pareja!',
    url: 'https://www.crazygames.com/embed/2-player-soccer',
  },
]
