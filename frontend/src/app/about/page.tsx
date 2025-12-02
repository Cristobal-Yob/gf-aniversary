'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const { isAuthenticated } = useAuth()
  const [timeTogetherData, setTimeTogetherData] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Fecha de inicio de la relación (25 de Noviembre de 2017)
  const startDate = new Date(2017, 10, 25)

  // Calcular tiempo juntos
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)

      let years = now.getFullYear() - startDate.getFullYear()
      let months = now.getMonth() - startDate.getMonth()
      let remainingDays = now.getDate() - startDate.getDate()

      if (remainingDays < 0) {
        months--
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        remainingDays += prevMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      setTimeTogetherData({
        years,
        months,
        days: remainingDays,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-[#fff0f3] to-[#fdf2f4]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 text-6xl">🔒</div>
            <h1 className="mb-4 text-3xl font-bold text-primary-900">
              Área Privada
            </h1>
            <p className="mb-8 text-secondary-600">
              Necesitas iniciar sesión para conocer nuestra historia
            </p>
            <Link href="/auth" className="btn-primary inline-block">
              Iniciar Sesión 💖
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-[#fff0f3] to-[#fdf2f4] font-serif">
      <Navbar />
      <div className="container relative z-20 mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <div className="mb-4 text-6xl">❤️</div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-accent-600 bg-clip-text text-transparent">
              Nuestra Historia
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-secondary-600">
            El viaje de nosotros a través de los años
          </p>
        </div>

        {/* Contador en Tiempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl"
        >
          <div className="card relative overflow-hidden p-8 text-center">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-pink-100 opacity-50 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-red-100 opacity-50 blur-3xl" />
            
            <div className="relative">
              <h2 className="mb-2 text-2xl font-bold text-primary-800 md:text-3xl">
                ⏱️ Tiempo Juntos ⏱️
              </h2>
              <p className="mb-6 text-secondary-500">Desde el 25 de Noviembre de 2017</p>
              
              <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 p-3 shadow-sm md:p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-pink-600 md:text-4xl">
                    {timeTogetherData.years}
                  </div>
                  <div className="text-xs text-pink-400 md:text-sm">Años</div>
                </motion.div>
                
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-3 shadow-sm md:p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-red-500 md:text-4xl">
                    {timeTogetherData.months}
                  </div>
                  <div className="text-xs text-red-400 md:text-sm">Meses</div>
                </motion.div>
                
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 shadow-sm md:p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-orange-500 md:text-4xl">
                    {timeTogetherData.days}
                  </div>
                  <div className="text-xs text-orange-400 md:text-sm">Días</div>
                </motion.div>
                
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 shadow-sm md:p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-yellow-600 md:text-4xl">
                    {timeTogetherData.hours}
                  </div>
                  <div className="text-xs text-yellow-500 md:text-sm">Horas</div>
                </motion.div>
                
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-3 shadow-sm md:p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-green-500 md:text-4xl">
                    {timeTogetherData.minutes}
                  </div>
                  <div className="text-xs text-green-400 md:text-sm">Minutos</div>
                </motion.div>
                
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-sm md:p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-blue-500 md:text-4xl">
                    {timeTogetherData.seconds}
                  </div>
                  <div className="text-xs text-blue-400 md:text-sm">Segundos</div>
                </motion.div>
              </div>
              
              <p className="mt-6 text-lg text-secondary-600">
                💕 Cada segundo contigo es un regalo 💕
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mx-auto mb-16 max-w-3xl space-y-8">
          {timeline.map((event, index) => (
            <div key={index} className="card relative overflow-hidden">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-50 opacity-50 blur-2xl" />
              <div className="flex items-start space-x-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 text-3xl shadow-inner">
                  {event.emoji}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-primary-900">
                      {event.title}
                    </h3>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                      {event.date}
                    </span>
                  </div>
                  <p className="leading-relaxed text-secondary-700">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card text-center transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 text-5xl">{stat.emoji}</div>
              <div className="mb-2 text-4xl font-bold text-primary-800">
                {stat.value}
              </div>
              <div className="font-medium text-secondary-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Love Letter */}
        <div className="mx-auto max-w-3xl">
          <div className="card relative overflow-hidden p-10 md:p-12">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary-50 opacity-50 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent-50 opacity-50 blur-3xl" />

            <div className="relative text-center">
              <div className="mb-6 text-6xl">💌</div>
              <h2 className="mb-8 font-script text-4xl font-bold text-primary-900">
                Para Ti, Mi Amor
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-secondary-800">
                <p>
                  Hoy celebramos <strong>8 años</strong> de una historia que se
                  ha convertido en mi vida entera. Ocho años que, como siempre
                  digo, nunca me lo podría haber imaginado. Que alguien como tú
                  existiera... eres lo mejor que me ha pasado.
                </p>
                <p>
                  Desde aquel primer día en el preu, ha sido un camino largo.
                  Lo siento por todo lo que te he hecho pasar. Han sido años
                  extraños, nuestros caminos se han movido por varios puntos y
                  hemos cambiado mucho. Por esto te doy las gracias de todo
                  corazón, por todo el apoyo que me das, siempre entendiéndome
                  o tratando de entender mi cabeza extraña.
                </p>
                <p>
                  Nunca imaginé que construiríamos un universo tan hermoso
                  juntos. Has estado en mis mejores momentos y has sido mi roca
                  en los difíciles.
                </p>
                <p>
                  Gracias por elegirme cada día, por tu paciencia infinita y por
                  esa sonrisa que sigue siendo la cosa más bonita que hay en el
                  mundo. Eres mi compañera, mi mejor amiga y el amor de mi vida.
                </p>
                <p>Por estos 8 años y por toda una eternidad juntos.</p>
                <p className="mt-8 font-script text-3xl font-bold text-primary-800">
                  Te amo infinitamente 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const timeline = [
  {
    emoji: '👀',
    title: 'El Primer Encuentro',
    date: '2017',
    description:
      'En el preu, nos cruzamos por primera vez. Fue muy a la rápida y luego no nos vimos en mucho tiempo... pero el destino tenía otros planes.',
  },
  {
    emoji: '🌟',
    title: 'El Reencuentro',
    date: '2017',
    description:
      'En el preu, nos cruzamos por segunda vez. Llegar temprano nunca tuvo una mejor recompensa. Gracias a todo lo que pasó pudimos hablar, quedé flechado... y después de eso fue historia.',
  },
  {
    emoji: '💋',
    title: 'Nuestro Primer Beso',
    date: '25 de Septiembre, 2017',
    description:
      'Un día bien movido y muy loco, pero al final lo que más recuerdo fue ese momento mágico. Nervios, mariposas y la certeza de que esto iba para más.',
  },
  {
    emoji: '💑',
    title: 'Oficialmente Pololeando',
    date: '25 de Noviembre, 2017',
    description:
      'El día fue muy loco, nunca en mi vida sentí que hice algo tan preparado. Pero fue un momento mágico y el inicio oficial de nuestra historia.',
  },
  {
    emoji: '🎂',
    title: 'Primer Año Juntos',
    date: '25 de Noviembre, 2018',
    description:
      '365 días de descubrimientos, primeras veces y un amor que empezaba a echar raíces profundas.',
  },
  {
    emoji: '🏠',
    title: 'Pandemia Juntos',
    date: '2020 - 2022',
    description:
      'Muy complejo todo, pero lo pudimos pasar juntos. Esos años nos hicieron más fuertes como pareja.',
  },
  {
    emoji: '🗽',
    title: 'Viaje a Nueva York',
    date: 'Abril, 2022',
    description:
      'Nuestro primer viaje fuera de Chile juntos. Muy hermoso, la pasé increíble contigo explorando la ciudad que nunca duerme.',
  },
  {
    emoji: '💍',
    title: 'Nuestros Anillos',
    date: '25 de Noviembre, 2023',
    description:
      'Sellamos nuestro amor con anillos que representan nuestro compromiso infinito. Un símbolo de todo lo que somos juntos.',
  },
  {
    emoji: '♾️',
    title: '8 Años de Amor',
    date: '25 de Noviembre, 2025',
    description:
      'Ocho años construyendo una vida, superando obstáculos, pero amándonos cada vez más. Y esto es solo el comienzo.',
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
    value: '8',
    label: 'Años de Historia',
  },
  {
    emoji: '💝',
    value: '∞',
    label: 'Amor Infinito',
  },
]
