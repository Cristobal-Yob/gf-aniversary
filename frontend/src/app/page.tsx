'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type SVGProps,
} from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import MonthGrid from '@/components/home/MonthGrid'
import DrawOnView from '@/components/ui/DrawOnView'
import PhotoPrint from '@/components/ui/PhotoPrint'
import {
  IconArrowRight,
  IconBook,
  IconCamera,
  IconHeart,
  IconMusicNote,
} from '@/components/icons'
import {
  BindingRings,
  MarkCircle,
  MarkHeart,
  MarkUnderline,
  StampNine,
  TornEdge,
} from '@/components/illustrations'
import { milestones } from '@/content/milestones'
import {
  COUPLE,
  EASE_OUT,
  daysTogether,
  formatCount,
  yearsTogether,
} from '@/lib/site'

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
const WEEKDAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

const prints = [
  {
    src: '/photos/fotos/felizes en ny.jpeg',
    alt: 'Felices en NY',
    caption: 'Felices en NY',
    date: 'Abril 2022',
    position: 'left-0 top-[9%] w-[52%]',
    rotate: -5,
  },
  {
    src: '/photos/fotos/snow kiss.jpeg',
    alt: 'Snow Kiss',
    caption: 'Snow Kiss',
    position: 'right-0 top-0 w-[49%]',
    rotate: 4,
  },
  {
    src: '/photos/fotos/hearth templo.jpeg',
    alt: 'Corazón Templo',
    caption: 'Corazón Templo',
    position: 'bottom-0 left-[24%] w-[50%]',
    rotate: -1.5,
  },
]

interface Destination {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
  href: string
}

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const reduceMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(true)
  const [today, setToday] = useState<Date | null>(null)

  // La fecha se calcula en el navegador: la página se prerenderiza al compilar
  useEffect(() => setToday(new Date()), [])
  const finishLoading = useCallback(() => setIsLoading(false), [])

  const ready = !isLoading
  const years = today ? yearsTogether(today) : 9
  const storyHref = isAuthenticated ? '/about' : '/auth'
  const isSecondOfDecember =
    today !== null && today.getMonth() === 11 && today.getDate() === 2

  const destinations: Destination[] = [
    {
      Icon: IconCamera,
      title: 'Nuestra Galería',
      description:
        'Nueve años de recuerdos capturados en momentos inolvidables.',
      href: '/gallery',
    },
    {
      Icon: IconMusicNote,
      title: 'Soundtrack',
      description: 'La música bonita c:.',
      href: '/music',
    },
    {
      Icon: IconBook,
      title: 'Nuestra Historia',
      description: 'El camino desde el primer día hasta hoy.',
      href: '/about',
    },
  ]

  // Entrada del hero: espera a que la portada se arranque
  const enter = (delay: number, fromRotate = 0, toRotate = 0) => ({
    initial: reduceMotion
      ? { opacity: 0, transform: `translateY(0px) rotate(${toRotate}deg)` }
      : { opacity: 0, transform: `translateY(14px) rotate(${fromRotate}deg)` },
    animate: ready
      ? { opacity: 1, transform: `translateY(0px) rotate(${toRotate}deg)` }
      : undefined,
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  })

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={finishLoading} />}
      </AnimatePresence>

      <Navbar />

      <main>
        {/* Hoja del día */}
        <section className="relative bg-calipso text-ink [--accent:theme(colors.marker)]">
          <BindingRings className="h-8 w-full text-ink md:h-10" />

          <div className="mx-auto max-w-7xl px-4 pb-20 pt-2 md:px-8 md:pb-28">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-2 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
              <span>
                {today
                  ? `${WEEKDAYS[today.getDay()]} ${today.getDate()} · ${MONTHS[today.getMonth()]}`
                  : ' '}
              </span>
              <span>{today ? today.getFullYear() : ' '}</span>
            </div>

            <div className="grid items-center gap-10 pt-8 lg:grid-cols-12 lg:gap-8 lg:pt-12">
              <div className="lg:col-span-7">
                <div className="relative inline-block">
                  <motion.p
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
                    }
                    animate={
                      ready
                        ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
                        : undefined
                    }
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                    className="font-display text-[clamp(6.5rem,31vw,19rem)] font-black leading-[0.82] tabular-nums"
                  >
                    {today ? formatCount(daysTogether(today)) : '0.000'}
                  </motion.p>
                  <DrawOnView
                    play={ready}
                    delay={700}
                    className="pointer-events-none absolute -inset-x-[5%] -inset-y-[9%] block"
                  >
                    <MarkCircle className="h-full w-full" />
                  </DrawOnView>
                </div>

                <motion.p
                  {...enter(0.2)}
                  className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide md:text-4xl"
                >
                  días juntos
                  <span className="block text-base font-semibold normal-case tracking-normal text-calipso-shade md:text-lg">
                    desde el 25 de noviembre de 2017
                  </span>
                </motion.p>

                <motion.h1
                  {...enter(0.3)}
                  className="mt-8 font-display text-5xl font-extrabold uppercase leading-[0.95] md:text-7xl"
                >
                  {COUPLE.first} <span className="text-calipso-shade">&amp;</span>{' '}
                  {COUPLE.second}
                </motion.h1>

                <motion.div {...enter(0.4)} className="mt-4 max-w-xl">
                  <p className="text-xl font-semibold md:text-2xl">
                    {years} Años de Historia
                  </p>
                  <p className="mt-1 text-base text-calipso-shade md:text-lg">
                    Celebrando cada momento de nuestro amor infinito
                  </p>
                </motion.div>

                <motion.div
                  {...enter(0.9, -8, -3)}
                  className="mt-8 inline-block"
                >
                  <p className="relative font-hand text-4xl leading-none text-ink md:text-5xl">
                    ¡Feliz Aniversario Mi Amor!
                    <DrawOnView
                      play={ready}
                      delay={1500}
                      className="absolute -bottom-3 left-0 block h-3 w-full"
                    >
                      <MarkUnderline className="h-full w-full" />
                    </DrawOnView>
                  </p>
                </motion.div>

                <motion.div
                  {...enter(0.55)}
                  className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                >
                  <Link
                    href={storyHref}
                    className="btn-almanac group border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
                  >
                    Nuestra Historia
                    <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/gallery"
                    className="btn-almanac border-ink text-ink hover:bg-ink hover:text-paper"
                  >
                    Ver Recuerdos
                    <IconCamera className="h-5 w-5" />
                  </Link>
                  {isAuthenticated && isSecondOfDecember && (
                    <Link
                      href="/birthday"
                      className="btn-almanac border-marker bg-marker text-ink"
                    >
                      Tu Sorpresa de Cumpleaños
                    </Link>
                  )}
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative mx-auto aspect-[10/11] w-full max-w-[520px]">
                  {prints.map((print, index) => (
                    <motion.div
                      key={print.src}
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              transform: `translateY(-28px) rotate(${print.rotate + 7}deg) scale(1.05)`,
                            }
                      }
                      animate={
                        ready
                          ? {
                              opacity: 1,
                              transform: `translateY(0px) rotate(${print.rotate}deg) scale(1)`,
                            }
                          : undefined
                      }
                      transition={{
                        duration: 0.8,
                        delay: 0.45 + index * 0.14,
                        ease: EASE_OUT,
                      }}
                      className={`absolute ${print.position}`}
                    >
                      <PhotoPrint
                        src={print.src}
                        alt={print.alt}
                        caption={print.caption}
                        date={print.date}
                        sizes="(min-width: 1024px) 260px, 50vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <TornEdge className="absolute inset-x-0 top-full z-10 -mt-px h-4 w-full text-calipso md:h-6" />
        </section>

        {/* Índice del almanaque */}
        <section className="px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-[clamp(3rem,11vw,7.5rem)] font-black uppercase leading-[0.9]">
              Nuestro Universo
            </h2>
            <p className="mt-3 max-w-xl text-lg text-dim md:text-xl">
              Explora los rincones de nuestra vida juntos
            </p>

            <ul className="mt-10 border-t-2 border-ink md:mt-14">
              {destinations.map(({ Icon, title, description, href }) => (
                <li key={title} className="border-b-2 border-ink">
                  <Link
                    href={href}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors duration-200 hover:bg-ink hover:text-paper md:gap-8 md:px-4 md:py-8"
                  >
                    <Icon className="h-9 w-9 md:h-12 md:w-12" />
                    <span>
                      <span className="block font-display text-4xl font-extrabold uppercase leading-none md:text-6xl">
                        {title}
                      </span>
                      <span className="mt-2 block text-base text-dim transition-colors duration-200 group-hover:text-rule md:text-lg">
                        {description}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 font-display text-lg font-semibold uppercase tracking-wide">
                      <span className="hidden sm:inline">Descubrir</span>
                      <IconArrowRight className="h-7 w-7 transition-transform duration-200 ease-out group-hover:translate-x-2 md:h-9 md:w-9" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Los meses, uno por uno */}
        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <MonthGrid />
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl">
                Cada cuadro es un mes
              </h2>
              <ul className="mt-8 border-t border-rule">
                {milestones.map(milestone => (
                  <li
                    key={milestone.title}
                    className="flex items-center gap-4 border-b border-rule py-3"
                  >
                    <span className="h-4 w-4 shrink-0 bg-marker ring-2 ring-inset ring-ink" />
                    <span className="flex-1 font-display text-xl font-semibold uppercase leading-tight md:text-2xl">
                      {milestone.title}
                    </span>
                    <span className="text-right text-sm text-dim">
                      {milestone.dateLabel}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-4 py-3">
                  <span className="h-4 w-4 shrink-0 bg-calipso" />
                  <span className="flex-1 font-display text-xl font-semibold uppercase leading-tight md:text-2xl">
                    Hoy
                  </span>
                </li>
              </ul>
              <Link
                href={storyHref}
                className="btn-almanac group mt-8 border-ink hover:bg-ink hover:text-paper"
              >
                Nuestra Historia
                <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Última hoja */}
      <footer className="relative overflow-hidden bg-ink px-4 pb-28 pt-16 text-paper [--accent:theme(colors.marker)] md:px-8 md:pb-32 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <DrawOnView className="block h-16 w-16 md:h-20 md:w-20">
              <MarkHeart className="h-full w-full" />
            </DrawOnView>
            <h3 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] md:text-8xl">
              Feliz Aniversario {COUPLE.second}
            </h3>
            <p className="mt-6 max-w-2xl font-hand text-3xl leading-snug text-marker md:text-4xl">
              &ldquo;Nueve años a tu lado y te sigo eligiendo cada día. Te amo
              infinitamente.&rdquo;
            </p>
            <div className="mt-10 space-y-1 text-sm text-rule">
              <p className="flex items-center gap-1.5 font-medium">
                Hecho con todo mi
                <IconHeart className="h-4 w-4 text-marker" aria-label="amor" />
                por {COUPLE.first}
              </p>
              <p>
                © {today ? today.getFullYear() : 2026} • Nuestro Aniversario
              </p>
            </div>
          </div>

          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'rotate(14deg) scale(1.35)' }
            }
            whileInView={{ opacity: 1, transform: 'rotate(14deg) scale(1)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="justify-self-start text-marker md:col-span-4 md:justify-self-end"
          >
            <StampNine className="h-44 w-44 font-display md:h-60 md:w-60" />
          </motion.div>
        </div>
      </footer>
    </>
  )
}
