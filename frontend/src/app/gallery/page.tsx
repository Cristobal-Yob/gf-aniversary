'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function GalleryPage() {
  const { isAuthenticated } = useAuth()

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
              Necesitas iniciar sesión para ver nuestra galería de recuerdos
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mb-4 text-6xl">📸</div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Nuestra Galería
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Todos nuestros momentos especiales juntos
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPhotos.map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-pink-200 to-orange-200">
                <span className="text-4xl">{photo.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-gray-800">
                  {photo.title}
                </h3>
                <p className="mb-2 text-sm text-gray-600">{photo.date}</p>
                <p className="text-sm text-gray-700">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-4xl">🔗</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Próximamente: Integración con Instagram
          </h2>
          <p className="mb-6 text-gray-600">
            Pronto conectaremos directamente con Instagram para mostrar nuestras
            fotos más recientes
          </p>
          <div className="rounded-lg bg-pink-50 p-4">
            <p className="text-sm text-pink-700">
              📱 Instagram API integration coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mockPhotos = [
  {
    emoji: '💑',
    title: 'Primera Cita',
    date: 'Hace mucho tiempo',
    description: 'El día que empezó todo',
  },
  {
    emoji: '🌅',
    title: 'Amanecer Juntos',
    date: 'Un día especial',
    description: 'Viendo el amanecer en la playa',
  },
  {
    emoji: '🎂',
    title: 'Cumpleaños',
    date: 'Celebración especial',
    description: 'Celebrando juntos',
  },
  {
    emoji: '🌹',
    title: 'San Valentín',
    date: '14 de Febrero',
    description: 'Día del amor y la amistad',
  },
  {
    emoji: '✈️',
    title: 'Viaje',
    date: 'Aventura juntos',
    description: 'Explorando nuevos lugares',
  },
  {
    emoji: '🏠',
    title: 'En Casa',
    date: 'Momentos cotidianos',
    description: 'Los pequeños momentos que más amamos',
  },
]
