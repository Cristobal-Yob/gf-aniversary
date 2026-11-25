'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { Photo } from '@/content/photos'
import { EASE_OUT } from '@/lib/site'
import { photoLayoutId, plainText } from './shared'

interface GalleryPrintProps {
  photo: Photo
  /** Posición dentro de su sección, para el escalonado y la inclinación */
  index: number
  priority?: boolean
  /** La copia se ve vacía mientras su foto está levantada en el visor */
  hidden?: boolean
  onOpen: () => void
}

// Inclinaciones sueltas, entre -4 y 4 grados
const TILTS = [-3, 2.5, -1.5, 3.5, -4, 1.5, -2.5, 4, -1, 2]

/** Copia de una foto de la galería: cae sobre la hoja y se endereza al pasar el cursor */
export default function GalleryPrint({
  photo,
  index,
  priority = false,
  hidden = false,
  onOpen,
}: GalleryPrintProps) {
  const reduceMotion = useReducedMotion()
  const tilt = TILTS[index % TILTS.length]
  const caption = plainText(photo.caption || photo.title)

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              transform: `translateY(-48px) rotate(${tilt > 0 ? 9 : -9}deg) scale(1.05)`,
            }
      }
      whileInView={{
        opacity: 1,
        transform: 'translateY(0px) rotate(0deg) scale(1)',
      }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.09,
        ease: EASE_OUT,
      }}
      className="mb-8 break-inside-avoid md:mb-12 lg:mb-8"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver en grande: ${photo.title}`}
        style={{ '--tilt': `${reduceMotion ? 0 : tilt}deg` } as CSSProperties}
        className="group block w-full rotate-[var(--tilt)] text-left transition-transform duration-200 ease-out focus-visible:rotate-0 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:rotate-0"
      >
        <figure className="bg-paper p-2 shadow-[0_18px_36px_-16px_rgba(15,17,21,0.55)] transition-shadow duration-200 [@media(hover:hover)]:group-hover:shadow-[0_26px_44px_-18px_rgba(15,17,21,0.6)]">
          <motion.div
            layoutId={reduceMotion ? undefined : photoLayoutId(photo.src)}
            className={`relative overflow-hidden bg-rule ${photo.aspectRatio} ${hidden ? 'invisible' : ''}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 240px, (min-width: 1024px) 20vw, (min-width: 768px) 30vw, 46vw"
              priority={priority}
              className="object-cover"
            />
          </motion.div>
          <figcaption className="px-1 pb-1 pt-3">
            <span className="block font-display text-sm font-semibold uppercase leading-tight tracking-wide text-ink md:text-base">
              {photo.title}
            </span>
            <span className="mt-1 block font-hand text-2xl leading-tight text-calipso-deep">
              {caption}
            </span>
          </figcaption>
        </figure>
      </button>
    </motion.div>
  )
}
