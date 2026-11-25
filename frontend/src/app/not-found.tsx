'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { IconArrowRight } from '@/components/icons'
import {
  BindingRings,
  MarkCross,
  Perforation,
} from '@/components/illustrations'
import DrawOnView from '@/components/ui/DrawOnView'
import { EASE_OUT } from '@/lib/site'

export default function NotFound() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <Navbar />

      <main className="flex flex-col overflow-x-clip bg-paper pb-28 [--accent:theme(colors.marker)] lg:h-view lg:pb-0">
        {/* Lo que queda en el taco: las anillas y un borde de papel arrancado */}
        <div className="bg-calipso text-ink">
          <BindingRings className="h-8 w-full text-ink md:h-10" />
          <Perforation className="h-2 w-full text-calipso-shade" />
        </div>

        <section className="mx-auto w-full max-w-7xl px-4 pt-10 md:px-8 md:pt-16 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center lg:py-6">
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(-40px) rotate(-5deg)' }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transform: 'translateY(0px) rotate(-1deg)' }
            }
            transition={{ duration: 0.9, ease: EASE_OUT }}
            style={{ transformOrigin: 'top left' }}
            className="relative mx-2 border-2 border-ink bg-paper px-5 py-8 md:mx-0 md:px-10 md:py-12 lg:py-8"
          >
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-2 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
              <span>Hoja perdida</span>
              <span className="tabular-nums">404</span>
            </div>

            <div className="relative mt-6 inline-block lg:mt-4">
              <p
                aria-hidden
                className="font-display text-[clamp(7rem,36vw,22rem)] font-black lg:text-[clamp(7rem,min(22vw,24vh),22rem)] leading-[0.82] tabular-nums text-calipso-deep"
              >
                404
              </p>
              <DrawOnView
                delay={600}
                className="pointer-events-none absolute -inset-x-[4%] inset-y-[8%] block"
              >
                <MarkCross className="h-full w-full" />
              </DrawOnView>
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold lg:text-[clamp(2.25rem,min(5vw,7vh),4.5rem)] uppercase leading-[0.9]">
              Esta hoja no está en el calendario
            </h1>

            <Link
              href="/"
              className="btn-almanac group mt-10 lg:mt-6 border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
            >
              Volver al inicio
              <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  )
}
