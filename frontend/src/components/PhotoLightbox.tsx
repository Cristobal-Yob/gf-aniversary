'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, type TouchEvent } from 'react'
import { IconArrowRight, IconClose } from '@/components/icons'
import { photoLayoutId, plainText } from '@/components/gallery/shared'
import type { Photo } from '@/content/photos'
import { EASE_OUT } from '@/lib/site'

interface PhotoLightboxProps {
  photos: Photo[]
  /** Índice de la foto abierta dentro de `photos`; null cuando está cerrado */
  index: number | null
  /** Foto que se abrió desde su copia: solo esa vuela entre la hoja y el visor */
  liftedSrc: string | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const pad = (value: number) => String(value).padStart(2, '0')

/** Visor a pantalla completa de una foto de la galería */
export default function PhotoLightbox({
  photos,
  index,
  liftedSrc,
  onIndexChange,
  onClose,
}: PhotoLightboxProps) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const isOpen = index !== null && photos[index] !== undefined
  const photo = isOpen ? photos[index] : null
  const total = photos.length

  // Ref para que dos teclas seguidas no lean un índice desactualizado
  const indexRef = useRef(index)
  indexRef.current = index

  const step = useCallback(
    (delta: number) => {
      const current = indexRef.current
      if (current === null || total === 0) return
      const next = (current + delta + total) % total
      indexRef.current = next
      onIndexChange(next)
    },
    [onIndexChange, total]
  )
  const showPrevious = useCallback(() => step(-1), [step])
  const showNext = useCallback(() => step(1), [step])

  // Bloquea el scroll de la página y devuelve el foco al cerrar
  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [isOpen])

  // Teclado: flechas, Escape y foco atrapado dentro del visor
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          )
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement
        if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, showNext, showPrevious])

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return
    if (dx < 0) showNext()
    else showPrevious()
  }

  const lifted = photo !== null && !reduceMotion && photo.src === liftedSrc
  const description = photo ? plainText(photo.description) : ''

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper [--accent:theme(colors.marker)]"
        >
          {/* Barra superior: contador y cerrar */}
          <div className="sticky top-0 z-10 flex items-stretch justify-between border-b-2 border-paper bg-ink">
            <p
              aria-live="polite"
              className="flex items-center px-4 font-display text-2xl font-extrabold tabular-nums md:px-8 md:text-3xl"
            >
              {pad(index + 1)} / {pad(total)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar foto"
              className="flex h-14 w-14 items-center justify-center border-l-2 border-paper transition-colors duration-150 hover:bg-marker hover:text-ink md:h-16 md:w-16"
            >
              <IconClose className="h-7 w-7" />
            </button>
          </div>

          <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-8">
              <motion.div
                key={photo.src}
                layoutId={lifted ? photoLayoutId(photo.src) : undefined}
                initial={lifted ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="relative h-[56svh] w-full md:h-[68svh] lg:h-[76svh]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 800px, (min-width: 1024px) 64vw, 100vw"
                  priority
                  className="object-contain"
                />
              </motion.div>
            </div>

            <motion.div
              key={`text-${photo.src}`}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: 'translateY(12px)' }
              }
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
              className="pb-28 lg:col-span-4 lg:pb-0"
            >
              <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-black uppercase leading-[0.9]">
                {photo.title}
              </h2>
              <p className="mt-4 font-hand text-3xl leading-tight text-marker md:text-4xl">
                {plainText(photo.caption)}
              </p>
              {description && (
                <p className="mt-4 max-w-2xl text-lg text-rule">{description}</p>
              )}

              <div className="mt-8 flex border-2 border-paper">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Foto anterior"
                  className="flex flex-1 items-center justify-center gap-3 py-3 font-display text-lg font-bold uppercase tracking-wide transition-colors duration-150 hover:bg-paper hover:text-ink"
                >
                  <IconArrowRight className="h-6 w-6 rotate-180" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Foto siguiente"
                  className="flex flex-1 items-center justify-center gap-3 border-l-2 border-paper py-3 font-display text-lg font-bold uppercase tracking-wide transition-colors duration-150 hover:bg-paper hover:text-ink"
                >
                  Siguiente
                  <IconArrowRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
