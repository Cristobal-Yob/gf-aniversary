'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100/50 bg-white/80 shadow-lg backdrop-blur-lg backdrop-saturate-150">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-8">
        {/* 🩷 Logo - Izquierda */}
        <div className="flex shrink-0 items-center lg:min-w-[280px]">
          <Link href="/" className="flex items-center">
            <img
              src="/photos/icon/J&C.png"
              alt="C & J"
              className="h-16 w-16 object-contain transition-transform duration-300 hover:rotate-3 hover:scale-110 md:h-20 md:w-20 lg:h-24 lg:w-24"
            />
          </Link>
        </div>

        {/* 💫 Centro - Menú */}
        <ul className="ml-4 hidden flex-1 items-center justify-center gap-4 text-sm font-medium text-gray-700 md:flex md:gap-6 lg:gap-10 lg:text-base">
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

        {/* 🌷 Derecha - Sesión */}
        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm font-medium text-gray-600 lg:block">
                Hola, {user?.full_name || user?.username} 👋
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-pink-100 px-3 py-1.5 text-sm font-semibold text-pink-700 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-pink-200 hover:shadow-md md:px-5 md:py-2"
              >
                <span className="hidden md:inline">Cerrar Sesión</span>
                <span className="md:hidden">Salir</span>
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-pink-600 px-3 py-1.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-pink-700 hover:shadow-md md:px-5 md:py-2"
            >
              <span className="hidden md:inline">Iniciar Sesión 💖</span>
              <span className="md:hidden">Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
