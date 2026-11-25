'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ComponentType, type SVGProps } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  IconBook,
  IconCalendar,
  IconCamera,
  IconClose,
  IconLogout,
  IconMenu,
  IconMusicNote,
} from '@/components/icons'
import { LogoMark } from '@/components/illustrations/logo'
import { EASE_OUT } from '@/lib/site'

interface NavLink {
  href: string
  label: string
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
  always: boolean
}

// El cumpleaños de Josefa: 2 de diciembre
function isBirthday() {
  const today = new Date()
  return today.getMonth() === 11 && today.getDate() === 2
}

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks: NavLink[] = [
    { href: '/', label: 'Inicio', always: true },
    { href: '/gallery', label: 'Galería', Icon: IconCamera, always: false },
    { href: '/music', label: 'Música', Icon: IconMusicNote, always: false },
    { href: '/about', label: 'Nosotros', Icon: IconBook, always: false },
    ...(isBirthday()
      ? [
          {
            href: '/birthday',
            label: '¡Cumpleaños!',
            Icon: IconCalendar,
            always: false,
          },
        ]
      : []),
  ]

  const links = navLinks.filter(link => link.always || isAuthenticated)
  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b-2 border-ink bg-paper text-ink">
        <div className="flex h-14 items-stretch justify-between pl-4 md:h-16 md:pl-8">
          <Link
            href="/"
            aria-label="Inicio"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <LogoMark className="h-10 w-10 md:h-12 md:w-12" />
            <span className="hidden font-display text-xl font-extrabold uppercase tracking-wide sm:block">
              Cristóbal &amp; Josefa
            </span>
          </Link>

          <ul className="hidden items-stretch font-display text-lg font-semibold uppercase tracking-wide md:flex">
            {links.map(({ href, label, Icon }) => {
              const active = pathname === href
              return (
                <li key={href} className="flex">
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2 px-4 transition-colors duration-150 lg:px-5 ${
                      active ? 'bg-marker' : 'hover:bg-ink hover:text-paper'
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-stretch">
            {isAuthenticated ? (
              <>
                <span className="hidden items-center px-4 text-sm text-dim lg:flex">
                  Hola, {user?.full_name || user?.username}
                </span>
                <button
                  onClick={logout}
                  className="hidden items-center gap-2 border-l-2 border-ink px-5 font-display text-lg font-semibold uppercase tracking-wide transition-colors duration-150 hover:bg-ink hover:text-paper md:flex"
                >
                  <IconLogout className="h-5 w-5" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="hidden items-center bg-ink px-6 font-display text-lg font-semibold uppercase tracking-wide text-paper transition-colors duration-150 hover:bg-calipso hover:text-ink md:flex"
              >
                Iniciar Sesión
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(open => !open)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              className="flex w-14 items-center justify-center border-l-2 border-ink md:hidden"
            >
              {isMobileMenuOpen ? (
                <IconClose className="h-6 w-6" />
              ) : (
                <IconMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-30 bg-ink/40 md:hidden"
            />
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(-12px)' }
              }
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(-12px)' }
              }
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="fixed inset-x-0 top-14 z-40 border-b-2 border-ink bg-paper text-ink md:hidden"
            >
              <ul className="font-display text-3xl font-extrabold uppercase">
                {links.map(({ href, label, Icon }) => {
                  const active = pathname === href
                  return (
                    <li key={href} className="border-b border-rule">
                      <Link
                        href={href}
                        onClick={closeMenu}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between px-4 py-4 ${
                          active ? 'bg-marker' : ''
                        }`}
                      >
                        {label}
                        {Icon && <Icon className="h-6 w-6" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="p-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <p className="text-sm text-dim">
                      Hola,{' '}
                      <span className="font-semibold text-ink">
                        {user?.full_name || user?.username}
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        logout()
                        closeMenu()
                      }}
                      className="btn-almanac w-full border-ink"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    onClick={closeMenu}
                    className="btn-almanac w-full border-ink bg-ink text-paper"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
