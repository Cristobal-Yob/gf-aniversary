'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import TimeTogether from '@/components/about/TimeTogether'
import Timeline from '@/components/about/Timeline'
import DrawOnView from '@/components/ui/DrawOnView'
import {
  IconArrowRight,
  IconInfinity,
  IconLock,
} from '@/components/icons'
import {
  BindingRings,
  MarkHeart,
  MarkUnderline,
  StampNine,
  TornEdge,
} from '@/components/illustrations'
import { timeline } from '@/content/timeline'
import {
  COUPLE,
  EASE_OUT,
  daysTogether,
  formatCount,
  yearsTogether,
} from '@/lib/site'

const YEAR_WORDS = [
  'Cero',
  'Un',
  'Dos',
  'Tres',
  'Cuatro',
  'Cinco',
  'Seis',
  'Siete',
  'Ocho',
  'Nueve',
  'Diez',
  'Once',
  'Doce',
  'Trece',
  'Catorce',
  'Quince',
  'Dieciséis',
  'Diecisiete',
  'Dieciocho',
  'Diecinueve',
  'Veinte',
]

/** Número de años en palabras para la carta; sobre veinte usa la cifra */
function yearsInWords(years: number) {
  return YEAR_WORDS[years] ?? String(years)
}

interface SheetHeaderProps {
  left: string
  right: string
  title: string
  subtitle: string
  children?: React.ReactNode
}

/** Hoja de calendario que abre la página */
function SheetHeader({ left, right, title, subtitle, children }: SheetHeaderProps) {
  return (
    <section className="relative bg-calipso text-ink [--accent:theme(colors.marker)]">
      <BindingRings className="h-8 w-full text-ink md:h-10" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-8 md:pb-24">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
          <span>{left}</span>
          <span className="tabular-nums">{right}</span>
        </div>
        <h1 className="mt-8 font-display text-[clamp(3.25rem,13vw,10rem)] font-black uppercase leading-[0.9] md:mt-12">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-calipso-shade md:text-xl">
          {subtitle}
        </p>
        {children}
      </div>
      <TornEdge className="absolute inset-x-0 top-full z-10 -mt-px h-4 w-full text-calipso md:h-6" />
    </section>
  )
}

export default function AboutPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const reduceMotion = useReducedMotion()
  const [today, setToday] = useState<Date | null>(null)

  // La fecha se calcula en el navegador: la página se prerenderiza al compilar
  useEffect(() => setToday(new Date()), [])

  const years = today ? yearsTogether(today) : 9

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-calipso" />
      </>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="pb-28">
          <SheetHeader
            left="Nosotros"
            right="Privado"
            title="Área Privada"
            subtitle="Necesitas iniciar sesión para conocer nuestra historia"
          >
            <IconLock className="mt-10 h-14 w-14 md:h-20 md:w-20" />
            <Link
              href="/auth"
              className="btn-almanac group mt-10 border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
            >
              Iniciar Sesión
              <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </SheetHeader>
        </main>
      </>
    )
  }

  const stats = [
    {
      value: today ? formatCount(daysTogether(today)) : '0.000',
      label: 'Días Juntos',
    },
    { value: String(years), label: 'Años de Historia' },
    { value: null, label: 'Amor Infinito' },
  ]

  return (
    <>
      <Navbar />

      <main>
        <SheetHeader
          left="Nosotros"
          right="25 · 11 · 2017"
          title="Nuestra Historia"
          subtitle="El viaje de nosotros a través de los años"
        >
          <TimeTogether today={today} />
        </SheetHeader>

        <section className="pb-24 pt-24 md:pb-32 md:pt-32">
          <Timeline entries={timeline} />
        </section>
      </main>

      {/* Última hoja: cifras y carta */}
      <footer className="bg-ink px-4 pb-28 pt-16 text-paper [--accent:theme(colors.marker)] md:px-8 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <dl className="grid border-y-2 border-paper sm:grid-cols-3">
            {stats.map(({ value, label }, index) => (
              <div
                key={label}
                className={`flex items-end justify-between gap-4 py-6 sm:block sm:px-6 ${
                  index > 0 ? 'border-t border-rule sm:border-l sm:border-t-0' : ''
                }`}
              >
                <dt className="order-2 font-display text-lg font-semibold uppercase tracking-wide text-rule sm:mt-3 md:text-xl">
                  {label}
                </dt>
                <dd className="order-1 font-display text-6xl font-black leading-none tabular-nums md:text-8xl">
                  {value ?? (
                    <IconInfinity
                      className="h-14 w-20 md:h-20 md:w-28"
                      aria-label="Infinito"
                      role="img"
                    />
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <article className="mt-20 md:mt-28 md:grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <DrawOnView className="block h-14 w-14 md:h-20 md:w-20">
                <MarkHeart className="h-full w-full" />
              </DrawOnView>
              <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl">
                Para Ti, Mi Amor
              </h2>
            </div>

            <div className="mt-10 max-w-2xl space-y-6 font-hand text-2xl leading-snug text-marker md:col-span-8 md:mt-0 md:text-3xl">
              <p>
                Hoy celebramos <strong className="font-normal underline decoration-2 underline-offset-4">{years} años</strong> de una historia que se
                ha convertido en mi vida entera. {yearsInWords(years)} años que, como siempre
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
              <p>Por estos {years} años y por toda una eternidad juntos.</p>

              <div className="flex flex-wrap items-end justify-between gap-8 pt-6">
                <div>
                  <p className="relative inline-block text-4xl md:text-5xl">
                    Te amo infinitamente
                    <DrawOnView
                      delay={300}
                      className="absolute -bottom-3 left-0 block h-3 w-full"
                    >
                      <MarkUnderline className="h-full w-full" />
                    </DrawOnView>
                  </p>
                  <p className="mt-6 font-display text-xl font-semibold uppercase tracking-wide text-paper">
                    {COUPLE.first}
                  </p>
                </div>

                <motion.div
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: 'rotate(-12deg) scale(1.35)' }
                  }
                  whileInView={{ opacity: 1, transform: 'rotate(-12deg) scale(1)' }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="text-marker"
                >
                  <StampNine className="h-40 w-40 font-display md:h-52 md:w-52" />
                </motion.div>
              </div>
            </div>
          </article>
        </div>
      </footer>
    </>
  )
}
