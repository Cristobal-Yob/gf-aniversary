'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import Navbar from '@/components/Navbar'
import LoveStory from '@/components/LoveStory'
import PhotoLightbox from '@/components/PhotoLightbox'
import CategorySection from '@/components/gallery/CategorySection'
import DrawOnView from '@/components/ui/DrawOnView'
import { IconArrowRight, IconLock, IconPlay } from '@/components/icons'
import {
  BindingRings,
  MarkHeart,
  MarkUnderline,
  TornEdge,
} from '@/components/illustrations'
import { photoCategories, photos, type Photo } from '@/content/photos'
import { EASE_OUT } from '@/lib/site'

/** Hoja de calendario con la que abre cada página */
function SheetHeader({
  left,
  right,
  title,
  children,
}: {
  left: ReactNode
  right: ReactNode
  title: ReactNode
  children?: ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative bg-calipso text-ink [--accent:theme(colors.marker)]">
      <BindingRings className="h-8 w-full text-ink md:h-10" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-2 md:px-8 md:pb-24">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
          <span>{left}</span>
          <span className="tabular-nums">{right}</span>
        </div>
        <motion.h1
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }
          }
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="pt-8 font-display text-[clamp(3.5rem,13vw,10.5rem)] font-black uppercase leading-[0.85] md:pt-12"
        >
          {title}
        </motion.h1>
        {children}
      </div>
      <TornEdge className="absolute inset-x-0 top-full z-10 -mt-px h-4 w-full text-calipso md:h-6" />
    </section>
  )
}

export default function GalleryPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { playlist, playTrack } = useMusicPlayer()
  const reduceMotion = useReducedMotion()
  const [hasStarted, setHasStarted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [liftedSrc, setLiftedSrc] = useState<string | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // La fecha se calcula en el navegador: la página se prerenderiza al compilar
  useEffect(() => setYear(new Date().getFullYear()), [])

  // Función para iniciar la experiencia con música
  const startExperience = () => {
    const upSong = playlist.find(track => track.title === 'Married Life (UP)')
    if (upSong) {
      playTrack(upSong)
    }
    setHasStarted(true)
  }

  // Secciones visibles: todas las categorías, o solo la elegida
  const sections = useMemo(
    () =>
      photoCategories
        .filter(category => category.id !== 'all')
        .filter(category => activeCategory === 'all' || category.id === activeCategory)
        .map(category => ({
          category,
          photos: photos.filter(photo => photo.category === category.id),
        }))
        .filter(section => section.photos.length > 0),
    [activeCategory]
  )
  // El visor recorre las fotos en el mismo orden en que aparecen en la página
  const visiblePhotos = useMemo(
    () => sections.flatMap(section => section.photos),
    [sections]
  )

  const openPhoto = (photo: Photo) => {
    setLiftedSrc(photo.src)
    setOpenIndex(visiblePhotos.findIndex(item => item.src === photo.src))
  }
  const closePhoto = useCallback(() => setOpenIndex(null), [])

  const selectCategory = (id: string) => {
    setActiveCategory(id)
    const top = galleryRef.current?.getBoundingClientRect().top
    if (top !== undefined && top < 0) {
      galleryRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  const showing = openIndex !== null ? visiblePhotos[openIndex] : null
  // Solo la foto que se levantó de su copia deja el hueco en la hoja
  const lifted = showing && showing.src === liftedSrc ? liftedSrc : null

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
            left={`${photos.length} recuerdos capturados`}
            right={<IconLock className="h-6 w-6 md:h-7 md:w-7" />}
            title="Área Privada"
          >
            <p className="mt-6 max-w-2xl text-lg text-calipso-shade md:text-xl">
              Necesitas iniciar sesión para ver nuestra galería de recuerdos
            </p>
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

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        {!hasStarted ? (
          // Portada: se arranca como una hoja de calendario al comenzar
          <motion.main
            key="intro"
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(-70%) rotate(-7deg)' }
            }
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            style={{ transformOrigin: 'top left' }}
            className="min-h-[calc(100svh-58px)] bg-calipso md:min-h-[calc(100svh-66px)]"
          >
            <SheetHeader
              left={`${photos.length} recuerdos capturados`}
              right={year ?? ' '}
              title="Nuestros Recuerdos"
            >
              <p className="mt-6 max-w-2xl text-lg text-calipso-shade md:text-xl">
                Prepárate para revivir nuestros momentos más especiales con
                música
              </p>
              <button
                type="button"
                onClick={startExperience}
                className="btn-almanac mt-10 border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
              >
                <IconPlay className="h-5 w-5" />
                Comenzar experiencia
              </button>
            </SheetHeader>
          </motion.main>
        ) : (
          <motion.main
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="overflow-x-clip"
          >
            <SheetHeader
              left={`${photos.length} recuerdos capturados`}
              right={year ?? ' '}
              title={
                <>
                  Nuestros Recuerdos{' '}
                  <span className="box-decoration-clone bg-marker px-[0.12em] text-ink">más Lindos</span>
                </>
              }
            >
              <p className="relative mt-6 inline-block max-w-2xl text-lg text-calipso-shade md:text-xl">
                Cada foto cuenta una historia de amor
                <DrawOnView delay={900} className="absolute -bottom-2 left-0 block h-2.5 w-full">
                  <MarkUnderline className="h-full w-full" />
                </DrawOnView>
              </p>
            </SheetHeader>

            <LoveStory />

            <div ref={galleryRef} className="scroll-mt-[58px] md:scroll-mt-[66px]">
              {/* Pestañas de categorías */}
              <nav
                aria-label="Categorías de fotos"
                className="sticky top-[58px] z-30 border-y-2 border-ink bg-paper md:top-[66px]"
              >
                <ul className="mx-auto flex max-w-7xl no-scrollbar overflow-x-auto md:px-8">
                  {photoCategories.map(category => {
                    const active = activeCategory === category.id
                    return (
                      <li key={category.id} className="shrink-0 border-r border-rule last:border-r-0">
                        <button
                          type="button"
                          onClick={() => selectCategory(category.id)}
                          aria-pressed={active}
                          className={`block whitespace-nowrap px-4 py-3 font-display text-lg font-bold uppercase tracking-wide transition-colors duration-150 md:px-5 md:text-xl ${
                            active ? 'bg-marker text-ink' : 'text-ink hover:bg-ink hover:text-paper'
                          }`}
                        >
                          {category.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {sections.map((section, sectionIndex) => (
                <CategorySection
                  key={section.category.id}
                  category={section.category}
                  photos={section.photos}
                  priorityCount={sectionIndex === 0 ? 2 : 0}
                  liftedSrc={lifted}
                  onOpen={openPhoto}
                />
              ))}
            </div>

            {/* Última hoja */}
            <footer className="bg-ink px-4 pb-28 pt-16 text-paper [--accent:theme(colors.marker)] md:px-8 md:pb-32 md:pt-24">
              <div className="mx-auto max-w-7xl">
                <DrawOnView className="block h-16 w-16 md:h-20 md:w-20">
                  <MarkHeart className="h-full w-full" />
                </DrawOnView>
                <h2 className="mt-6 font-display text-[clamp(3rem,9vw,6.5rem)] font-black uppercase leading-[0.9]">
                  Gracias por compartir{' '}
                  <span className="text-marker">este camino</span> conmigo
                </h2>
                <p className="mt-6 max-w-2xl text-lg text-rule md:text-xl">
                  Cada foto es un tesoro, cada momento contigo es mágico
                </p>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      <PhotoLightbox
        photos={visiblePhotos}
        index={openIndex}
        liftedSrc={liftedSrc}
        onIndexChange={setOpenIndex}
        onClose={closePhoto}
      />
    </>
  )
}
