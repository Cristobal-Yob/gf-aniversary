'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-3">
        {/* Logo - Izquierda */}
        <Link href="/" className="flex cursor-pointer items-center">
          <img
            src="/photos/icon/J&C.png"
            alt="C & J"
            className="h-20 w-20 object-contain transition-transform duration-300 hover:rotate-3 hover:scale-110"
          />
        </Link>

        {/* Navigation - Centro */}
        <ul className="flex items-center gap-10 text-base font-medium text-gray-700">
          <li>
            <Link
              href="/"
              className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                isActive('/')
                  ? 'border-b-2 border-pink-400 pb-1 text-pink-600'
                  : 'hover:text-pink-600'
              }`}
            >
              <span className="text-lg">🏠</span>
              <span>Inicio</span>
            </Link>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <Link
                  href="/gallery"
                  className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                    isActive('/gallery')
                      ? 'border-b-2 border-pink-400 pb-1 text-pink-600'
                      : 'hover:text-pink-600'
                  }`}
                >
                  <span className="text-lg">📸</span>
                  <span>Galería</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/music"
                  className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                    isActive('/music')
                      ? 'border-b-2 border-pink-400 pb-1 text-pink-600'
                      : 'hover:text-pink-600'
                  }`}
                >
                  <span className="text-lg">🎵</span>
                  <span>Música</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                    isActive('/chat')
                      ? 'border-b-2 border-pink-400 pb-1 text-pink-600'
                      : 'hover:text-pink-600'
                  }`}
                >
                  <span className="text-lg">💬</span>
                  <span>Chat IA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                    isActive('/games')
                      ? 'border-b-2 border-pink-400 pb-1 text-pink-600'
                      : 'hover:text-pink-600'
                  }`}
                >
                  <span className="text-lg">🎮</span>
                  <span>Juegos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                    isActive('/about')
                      ? 'border-b-2 border-pink-400 pb-1 text-pink-600'
                      : 'hover:text-pink-600'
                  }`}
                >
                  <span className="text-lg">❤️</span>
                  <span>Nosotros</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* User Info / Login Button - Derecha */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-gray-600">
                Hola, {user?.full_name || user?.username} 👋
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-pink-100 px-5 py-2 font-semibold text-pink-700 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-pink-200 hover:shadow-md"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-pink-600 px-5 py-2 font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-pink-700 hover:shadow-md"
            >
              Iniciar Sesión 💖
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
