'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const { playlist, playTrack, audioRef } = useMusicPlayer()

  // Verificar si es 2 de diciembre (cumpleaños)
  const isBirthday = () => {
    const today = new Date()
    return today.getMonth() === 11 && today.getDate() === 2
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(username, password)
      // Si es cumpleaños, reproducir canción de cumpleaños, sino Come to Me
      const songToPlay = isBirthday() 
        ? playlist.find(track => track.title === 'Cumpleaños Feliz')
        : playlist.find(track => track.title === 'Come to Me')
      
      if (songToPlay) {
        playTrack(songToPlay)
        // Forzar reproducción con el clic del usuario
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().catch(err => console.log('Play error:', err))
          }
        }, 100)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-secondary-50 to-primary-50">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="mb-4 text-5xl md:mb-6 md:text-6xl">🎂</div>
            <h1 className="mb-3 text-2xl font-bold text-gray-800 md:mb-4 md:text-3xl">
              ¡Feliz Cumpleaños!
            </h1>
            <p className="mb-6 text-gray-600 md:mb-8">
              Bienvenida a tu espacio especial, mi amor 💕
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-primary-900 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-800"
            >
              Ir al Inicio
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 text-center md:mb-8">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-3 text-5xl md:mb-4 md:text-6xl"
            >
              🎂
            </motion.div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
              ¡Feliz Cumpleaños!
            </h1>
            <p className="text-sm text-gray-600 md:text-base">
              Ingresa para ver tu sorpresa especial 💕
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-base focus:border-transparent focus:ring-2 focus:ring-primary-600"
                  placeholder="Tu nombre"
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-base focus:border-transparent focus:ring-2 focus:ring-primary-600"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? 'Ingresando...' : 'Ver mi sorpresa 🎁'}
              </motion.button>
            </form>

            <div className="mt-5 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4 text-center md:mt-6">
              <p className="text-sm text-primary-700">
                🎂 Hecho con amor para ti 💕
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
