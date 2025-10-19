'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 text-6xl">💕</div>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Cristóbal
            </span>
            <span className="mx-4 text-gray-600">&</span>
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Josefa
            </span>
          </h1>

          <p className="mb-8 text-xl text-gray-600 md:text-2xl">
            Un lugar especial para nuestros recuerdos, música y momentos juntos
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth"
              className="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-pink-700 hover:shadow-xl"
            >
              Comenzar 💖
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border-2 border-pink-300 bg-white px-8 py-3 font-semibold text-pink-600 shadow-lg transition-all hover:border-pink-400 hover:bg-pink-50 hover:shadow-xl"
            >
              Ver Galería 📸
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">
              Nuestro Mundo Digital
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Explora todas las secciones especiales que hemos creado para
              nosotros
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="text-center">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="mb-6 text-gray-600">{feature.description}</p>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center font-medium text-pink-600 hover:text-pink-700"
                  >
                    Explorar →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '📸',
    title: 'Galería de Recuerdos',
    description:
      'Nuestras fotos más especiales traídas directamente de Instagram',
    href: '/gallery',
  },
  {
    icon: '🎵',
    title: 'Música Juntos',
    description:
      'Controla nuestra música de Spotify y descubre nuestras canciones favoritas',
    href: '/music',
  },
  {
    icon: '💬',
    title: 'Chat con IA',
    description:
      'Pregúntale a nuestra IA sobre nosotros, nuestros recuerdos y momentos especiales',
    href: '/chat',
  },
  {
    icon: '🎮',
    title: 'Juegos Retro',
    description: 'Diverte con juegos Flash clásicos como en los viejos tiempos',
    href: '/games',
  },
  {
    icon: '❤️',
    title: 'Sobre Nosotros',
    description: 'La historia de nuestro amor y momentos más importantes',
    href: '/about',
  },
]
