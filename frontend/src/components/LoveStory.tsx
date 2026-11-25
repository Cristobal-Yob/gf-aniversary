'use client'

import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, useState } from 'react'
import PhotoPrint from '@/components/ui/PhotoPrint'
import DrawOnView from '@/components/ui/DrawOnView'
import { MarkUnderline } from '@/components/illustrations'
import { useMediaQuery } from '@/components/gallery/shared'
import { storyCards, type StoryCard } from '@/content/story'
import { EASE_OUT } from '@/lib/site'

// Dónde cae cada copia según cuántas fotos tiene el capítulo
const LAYOUTS: Record<number, { position: string; rotate: number; depth: number }[]> = {
  1: [{ position: 'left-[14%] top-[6%] w-[72%]', rotate: -3, depth: 60 }],
  2: [
    { position: 'left-0 top-[4%] w-[58%]', rotate: -4, depth: 40 },
    { position: 'bottom-[2%] right-0 w-[58%]', rotate: 3.5, depth: 140 },
  ],
  3: [
    { position: 'left-0 top-[10%] w-[52%]', rotate: -5, depth: 30 },
    { position: 'right-0 top-[5%] w-[49%]', rotate: 4, depth: 60 },
    { position: 'bottom-[2%] left-[24%] w-[50%]', rotate: -1.5, depth: 190 },
  ],
}

const layoutFor = (count: number) => LAYOUTS[Math.min(Math.max(count, 1), 3)]

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/** Una copia que cae sobre la hoja según el avance del scroll */
function FallingPrint({
  progress,
  start,
  end,
  rotate,
  depth,
  position,
  photo,
}: {
  progress: MotionValue<number>
  start: number
  end: number
  rotate: number
  depth: number
  position: string
  photo: { src: string; alt: string }
}) {
  const transform = useTransform(progress, value => {
    const t = easeOut(Math.min(Math.max((value - start) / (end - start), 0), 1))
    // Después de caer, cada copia se desplaza a su propia velocidad (paralaje)
    const parallax = Math.max(value - end, 0) * -depth
    const drop = (1 - t) * -115
    return `translateY(calc(${drop}vh + ${parallax}px)) rotate(${rotate + (1 - t) * 14}deg)`
  })
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1])

  return (
    <motion.div style={{ transform, opacity }} className={`absolute ${position}`}>
      <PhotoPrint
        src={photo.src}
        alt={photo.alt}
        caption={photo.alt}
        sizes="(min-width: 1024px) 300px, 40vw"
      />
    </motion.div>
  )
}

/** Capítulo como hoja fija: el título se compone y las fotos caen una tras otra */
function StickyChapter({ card }: { card: StoryCard }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const layout = layoutFor(card.photos.length)
  const span = 0.62 / card.photos.length

  return (
    <div
      ref={ref}
      style={{ height: `${150 + card.photos.length * 60}vh` }}
      className="relative"
    >
      <div className="sticky top-nav flex h-view items-center overflow-hidden border-t-2 border-ink bg-paper">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-8 py-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.h3
              initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="font-display text-[clamp(3rem,min(6vw,10vh),7rem)] font-black uppercase leading-[0.88]"
            >
              {card.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, transform: 'translateY(12px) rotate(-2deg)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px) rotate(-1deg)' }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
              className="mt-[3vh] max-w-xl font-hand text-[clamp(1.5rem,min(2.4vw,4.4vh),2.25rem)] leading-snug text-calipso-deep"
            >
              {card.description}
            </motion.p>
          </div>

          <div className="lg:col-span-6">
            {/* Alto según la zona visible, con margen para la inclinación y la sombra */}
            <div className="relative mx-auto aspect-[10/11] h-[min(calc((100svh_-_var(--nav-h)_-_var(--player-h))_*_0.82),600px)] max-w-full">
              {card.photos.map((photo, index) => (
                <FallingPrint
                  key={photo.src}
                  progress={scrollYProgress}
                  start={0.12 + index * span}
                  end={0.12 + index * span + span * 0.8}
                  photo={photo}
                  {...layout[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Capítulo apilado: teléfonos y movimiento reducido */
function StackedChapter({ card }: { card: StoryCard }) {
  const reduceMotion = useReducedMotion()
  const layout = layoutFor(card.photos.length)
  const reveal = {
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, transform: 'translateY(14px)' },
    whileInView: { opacity: 1, transform: 'translateY(0px)' },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
  }

  return (
    <div className="border-t-2 border-ink px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.h3
          {...reveal}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="font-display text-[clamp(2.75rem,12vw,6rem)] font-black uppercase leading-[0.9]"
        >
          {card.title}
        </motion.h3>
        <motion.p
          {...reveal}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          className="mt-5 max-w-2xl font-hand text-3xl leading-snug text-calipso-deep"
        >
          {card.description}
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {card.photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      transform: `translateY(-32px) rotate(${layout[index].rotate + 8}deg)`,
                    }
              }
              whileInView={{
                opacity: 1,
                transform: `translateY(0px) rotate(${reduceMotion ? 0 : layout[index].rotate}deg)`,
              }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_OUT }}
              className={card.photos.length === 1 ? 'col-span-2 max-w-md md:col-span-1' : ''}
            >
              <PhotoPrint
                src={photo.src}
                alt={photo.alt}
                caption={photo.alt}
                sizes="(min-width: 768px) 30vw, 46vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** "Ahora" y "Para siempre": la misma foto, jóvenes y viejitos */
function Adventure() {
  const reduceMotion = useReducedMotion()
  const [forever, setForever] = useState(false)
  const canHover = useMediaQuery('(hover: hover)')

  return (
    <section className="relative bg-calipso px-4 py-16 text-ink [--accent:theme(colors.marker)] md:px-8 md:py-24 lg:flex lg:min-h-view lg:items-center lg:py-[4vh]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h3 className="font-display text-[clamp(3rem,min(10vw,9vh),6.5rem)] font-black uppercase leading-[0.88]">
            Nuestra Aventura <span className="underline decoration-marker decoration-[0.13em] underline-offset-[0.07em] [text-decoration-skip-ink:none]">juntos para siempre</span>
          </h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-calipso-shade md:text-xl lg:mt-[2.5vh]">
            Quiero que nuestra historia sea una aventura que dure toda la vida.
            Desde este momento hasta que seamos viejitos juntos, compartiendo
            risas, recuerdos y todo el amor del mundo
          </p>
          <p className="relative mt-10 inline-block font-hand text-3xl leading-snug text-ink md:text-4xl lg:mt-[4vh]">
            &ldquo;Contigo, cualquier lugar se vuelve mi próxima aventura
            favorita.&rdquo;
            <DrawOnView delay={400} className="absolute -bottom-2 left-0 block h-3 w-2/3">
              <MarkUnderline className="h-full w-full" />
            </DrawOnView>
          </p>
        </div>

        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={() => setForever(value => !value)}
            onMouseEnter={canHover ? () => setForever(true) : undefined}
            onMouseLeave={canHover ? () => setForever(false) : undefined}
            aria-pressed={forever}
            aria-label="Ver la foto de viejitos"
            className="mx-auto block w-full -rotate-1 bg-paper p-2 lg:max-w-[calc((100svh_-_var(--nav-h)_-_var(--player-h)_-_9rem)_*_1.6)] text-left text-ink shadow-[0_22px_44px_-14px_rgba(15,17,21,0.5)] sm:p-3"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-rule">
              <Image
                src="/photos/fotos/pixar up los dos con el abuelito.jpeg"
                alt="Nosotros jóvenes juntos"
                fill
                sizes="(min-width: 1024px) 700px, 92vw"
                className="object-cover"
              />
              <motion.div
                initial={false}
                animate={{
                  clipPath: forever ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
                  opacity: reduceMotion ? (forever ? 1 : 0) : 1,
                }}
                transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.77, 0, 0.175, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src="/photos/fotos/up pero viejitos.jpg"
                  alt="Nosotros viejitos juntos"
                  fill
                  sizes="(min-width: 1024px) 700px, 92vw"
                  className="object-cover"
                />
              </motion.div>
              <span className="absolute bottom-0 right-0 bg-ink px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-wide text-paper">
                Pasa el cursor
              </span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 px-1 pb-1 pt-3">
              <span className="font-display text-3xl font-black uppercase leading-none md:text-4xl">
                {forever ? 'Para siempre' : 'Ahora'}
              </span>
              <span className="font-hand text-2xl text-calipso-deep">
                {forever ? 'Viejitos y enamorados' : 'Jóvenes y enamorados'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

/** "Nuestra historia de amor": la secuencia que abre la galería */
export default function LoveStory() {
  const reduceMotion = useReducedMotion()
  // La hoja fija necesita pantalla: en teléfonos y con movimiento reducido se apila
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const sticky = roomy && !reduceMotion

  return (
    <section aria-labelledby="historia-de-amor">
      <div className="px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            id="historia-de-amor"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
            }
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="font-display text-[clamp(3rem,11vw,7.5rem)] font-black uppercase leading-[0.9]"
          >
            Nuestra Historia de Amor
          </motion.h2>
          <p className="mt-3 max-w-xl text-lg text-dim md:text-xl">
            Cada momento contigo cuenta una historia única
          </p>
        </div>
      </div>

      {storyCards.map(card =>
        sticky ? (
          <StickyChapter key={card.title} card={card} />
        ) : (
          <StackedChapter key={card.title} card={card} />
        )
      )}

      <Adventure />
    </section>
  )
}
