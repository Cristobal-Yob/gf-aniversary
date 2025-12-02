'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  // Verificar si es 2 de diciembre (cumpleaños)
  const isBirthday = () => {
    const today = new Date()
    return today.getMonth() === 11 && today.getDate() === 2
  }

  const navLinks = [
    { href: '/', label: 'Inicio', icon: '🏠', always: true },
    { href: '/gallery', label: 'Galería', icon: '📸', always: false },
    { href: '/music', label: 'Música', icon: '🎵', always: false },
    { href: '/about', label: 'Nosotros', icon: '❤️', always: false },
    // Link de cumpleaños solo aparece el 2 de diciembre
    ...(isBirthday() ? [{ href: '/birthday', label: '¡Cumpleaños!', icon: '🎂', always: false }] : []),
  ]

  const filteredLinks = navLinks.filter(link => link.always || isAuthenticated)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-primary-100/50 bg-white/80 shadow-lg backdrop-blur-lg backdrop-saturate-150">
        <div className="flex w-full items-center justify-between px-4 py-2 md:px-8 md:py-3">
          {/* 🩷 Logo - Izquierda */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/photos/icon/J&C.png"
                alt="C & J"
                className="h-12 w-12 object-contain transition-transform duration-300 hover:rotate-3 hover:scale-110 md:h-16 md:w-16 lg:h-20 lg:w-20"
              />
            </Link>
          </div>

          {/* 💫 Centro - Menú Desktop */}
          <ul className="hidden flex-1 items-center justify-center gap-4 text-sm font-medium text-secondary-700 md:flex md:gap-6 lg:gap-10 lg:text-base">
            {filteredLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center space-x-2 transition-all duration-200 ease-in-out hover:scale-105 ${
                    isActive(link.href)
                      ? 'border-b-2 border-accent-400 pb-1 text-primary-900'
                      : 'hover:text-primary-800'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* 🌷 Derecha - Sesión + Hamburguesa */}
          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            {/* Botón hamburguesa móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-800 transition-colors hover:bg-primary-100 md:hidden"
              aria-label="Menú"
            >
              <motion.div
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                className="flex flex-col gap-1"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  className="block h-0.5 w-5 bg-current"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="block h-0.5 w-5 bg-current"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  className="block h-0.5 w-5 bg-current"
                />
              </motion.div>
            </button>

            {/* Botones de sesión desktop */}
            {isAuthenticated ? (
              <>
                <span className="hidden text-sm font-medium text-secondary-600 lg:block">
                  Hola, {user?.full_name || user?.username} �
                </span>
                <button
                  onClick={logout}
                  className="hidden rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-primary-100 hover:shadow-md md:block"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="hidden rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-primary-800 hover:shadow-md md:block"
              >
                Iniciar Sesión 💖
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 right-0 top-[64px] z-40 overflow-hidden border-b border-primary-100 bg-white/95 shadow-lg backdrop-blur-lg md:hidden"
          >
            <div className="px-4 py-4">
              {/* Links de navegación */}
              <ul className="space-y-2">
                {filteredLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all ${
                        isActive(link.href)
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-secondary-700 hover:bg-primary-50'
                      }`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Separador */}
              <div className="my-4 h-px bg-primary-100" />

              {/* Sesión móvil */}
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="px-4 text-sm text-secondary-600">
                    Hola, <span className="font-semibold">{user?.full_name || user?.username}</span> 👋
                  </p>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full rounded-xl bg-primary-50 px-4 py-3 text-center font-semibold text-primary-800 transition-colors hover:bg-primary-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full rounded-xl bg-primary-900 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-800"
                >
                  Iniciar Sesión 💖
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para cerrar menú */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
