'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

interface PhotoLightboxProps {
  photo: {
    src: string
    alt: string
    title: string
    date?: string
    description?: string
  } | null
  onClose: () => void
}

export default function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (photo) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [photo, onClose])

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Contenedor de la foto */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="relative max-h-[90vh] max-w-5xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute -right-4 -top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-2xl transition-colors hover:bg-pink-500 hover:text-white"
            >
              ✕
            </motion.button>

            {/* Imagen principal */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-2xl md:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Info de la foto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 px-2 pb-2 text-center"
              >
                <h3 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
                  <span>{photo.title}</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    💗
                  </motion.span>
                </h3>
                {photo.date && (
                  <p className="mb-2 text-sm text-pink-600">📅 {photo.date}</p>
                )}
                {photo.description && (
                  <p className="text-gray-600">{photo.description}</p>
                )}
              </motion.div>
            </div>

            {/* Brillo ambiental */}
            <motion.div
              className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-orange-500/30 blur-3xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
