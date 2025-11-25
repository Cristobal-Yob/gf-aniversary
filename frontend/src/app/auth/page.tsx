'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function AuthPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(username, password)
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
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 text-6xl">💕</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              ¡Ya estás conectado!
            </h1>
            <p className="mb-8 text-gray-600">
              Bienvenido a nuestro espacio especial
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-primary-900 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-800"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-4 text-6xl">💕</div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Bienvenidos a Nuestro Espacio
            </h1>
            <p className="text-gray-600">
              Ingresa para acceder a nuestros recuerdos especiales
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-600"
                  placeholder="Tu nombre"
                  required
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-600"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-primary-900 py-3 font-medium text-white transition-colors hover:bg-primary-800 disabled:bg-primary-300"
              >
                {isLoading ? 'Ingresando...' : 'Ingresar 💖'}
              </button>
            </form>

            <div className="mt-6 rounded-lg bg-primary-50 p-4 text-center">
              <p className="text-sm text-primary-700">
                💕 Solo para nosotros 💕
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
