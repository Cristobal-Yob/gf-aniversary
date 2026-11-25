'use client'

import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import type { Photo, PhotoCategory } from '@/content/photos'
import { EASE_OUT } from '@/lib/site'
import GalleryPrint from './GalleryPrint'
import { illustrationFor } from './shared'

interface CategorySectionProps {
  category: PhotoCategory
  photos: Photo[]
  /** Las primeras fotos de la página se cargan con prioridad */
  priorityCount: number
  liftedSrc: string | null
  onOpen: (photo: Photo) => void
}

/** Una categoría: su nombre en grande, su ilustración y sus copias sueltas */
export default function CategorySection({
  category,
  photos,
  priorityCount,
  liftedSrc,
  onOpen,
}: CategorySectionProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [illustrationMissing, setIllustrationMissing] = useState(false)
  const illustration = illustrationFor(category.id)

  // Paralaje lento de la ilustración mientras la sección cruza la pantalla
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const drift = useTransform(scrollYProgress, value =>
    reduceMotion
      ? 'translateY(0px) rotate(0deg)'
      : `translateY(${(0.5 - value) * 160}px) rotate(${(value - 0.5) * 8}deg)`
  )

  return (
    <section
      ref={ref}
      aria-labelledby={`categoria-${category.id}`}
      className="relative border-b-2 border-ink px-4 pb-8 pt-12 md:px-8 md:pb-16 md:pt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-end justify-between gap-4 border-b border-rule pb-4 md:pb-6">
          <motion.h2
            id={`categoria-${category.id}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'inset(100% -10% -5% 0%)' }
            }
            whileInView={{ opacity: 1, clipPath: 'inset(-10% -10% -5% 0%)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="relative z-10 min-w-0 flex-1 font-display text-[clamp(2.5rem,11vw,9.5rem)] font-black uppercase leading-[0.85]"
          >
            {category.label}
          </motion.h2>
          <span className="relative z-10 shrink-0 font-display text-3xl font-extrabold tabular-nums leading-none text-dim md:text-5xl">
            {String(photos.length).padStart(2, '0')}
          </span>

          {illustration && !illustrationMissing && (
            <motion.div
              aria-hidden
              style={{ transform: drift }}
              className="pointer-events-none absolute -top-10 right-10 z-0 w-28 sm:w-44 md:-top-12 md:right-24 md:w-64 lg:w-80"
            >
              <Image
                src={illustration}
                alt=""
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 176px"
                onError={() => setIllustrationMissing(true)}
                className="h-auto w-full"
              />
            </motion.div>
          )}
        </div>

        <div className="columns-2 gap-x-4 pt-10 sm:gap-x-6 md:columns-3 md:gap-x-10 md:pt-14 xl:columns-4">
          {photos.map((photo, index) => (
            <GalleryPrint
              key={photo.src}
              photo={photo}
              index={index}
              priority={index < priorityCount}
              hidden={liftedSrc === photo.src}
              onOpen={() => onOpen(photo)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
