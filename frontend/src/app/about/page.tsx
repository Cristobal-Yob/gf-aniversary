'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
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
              Necesitas iniciar sesión para conocer nuestra historia
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
          <div className="mb-4 text-6xl">❤️</div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Nuestra Historia
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            El viaje de Cristóbal y Josefa
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto mb-12 max-w-3xl space-y-8">
          {timeline.map((event, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-orange-200 text-3xl">
                  {event.emoji}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <span className="text-sm font-medium text-pink-600">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg"
            >
              <div className="mb-2 text-4xl">{stat.emoji}</div>
              <div className="mb-1 text-3xl font-bold text-pink-600">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Love Letter */}
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mb-4 text-5xl">💌</div>
            <h2 className="text-2xl font-bold text-gray-800">Para Ti</h2>
          </div>
          <div className="space-y-4 leading-relaxed text-gray-700">
            <p>
              Cada día contigo es una nueva aventura. Has llenado mi vida de
              colores, risas y momentos inolvidables.
            </p>
            <p>
              Desde nuestra primera cita hasta hoy, cada momento ha sido
              especial. Tu sonrisa ilumina mis días y tu amor me da fuerza para
              enfrentar cualquier desafío.
            </p>
            <p>
              Gracias por ser mi compañera, mi mejor amiga, mi todo. Este
              espacio es un pequeño tributo a nuestro amor y a todos los
              momentos que hemos compartido y los que vendrán.
            </p>
            <p className="mt-6 text-right font-semibold text-pink-600">
              Con todo mi amor 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const timeline = [
  {
    emoji: '✨',
    title: 'Nos Conocimos',
    date: 'Hace mucho tiempo',
    description:
      'En el preuniversitario antes de clases, donde llegar temprano fue la mejor decisión que tomé.',
  },
  {
    emoji: '💑',
    title: 'Primer beso',
    date: '25 de septiembre de 2017',
    description:
      'Nervios, risas y la certeza de que queríamos volver a vernos.',
  },
  {
    emoji: '💕',
    title: 'Empezamos a Salir',
    date: '25 de noviembre de 2017',
    description:
      'Oficialmente decidimos caminar juntos en esta aventura llamada amor.',
  },
  {
    emoji: '🎉',
    title: 'Primer Aniversario',
    date: '25 de noviembre de 2018',
    description: 'Un año de risas, lágrimas de felicidad y crecimiento juntos.',
  },
  {
    emoji: '🏠',
    title: 'Planes Futuros',
    date: 'Por venir',
    description: 'Muchos más años de amor, aventuras y recuerdos por crear.',
  },
]

const msPerDay = 24 * 60 * 60 * 1000
const startDate = new Date(2017, 8, 25) // months are 0-indexed: 8 = September
const daysSince = Math.floor((Date.now() - startDate.getTime()) / msPerDay)

const stats = [
  {
    emoji: '📅',
    value: String(daysSince),
    label: 'Días Juntos',
  },
  {
    emoji: '📸',
    value: '1000+',
    label: 'Fotos Compartidas',
  },
  {
    emoji: '💌',
    value: '∞',
    label: 'Mensajes de Amor',
  },
]
