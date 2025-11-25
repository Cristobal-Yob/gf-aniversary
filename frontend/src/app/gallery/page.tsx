'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useMusicPlayer } from '@/contexts/MusicPlayerContext'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PhotoLightbox from '@/components/PhotoLightbox'
import LoveStory from '@/components/LoveStory'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function GalleryPage() {
  const { isAuthenticated } = useAuth()
  const { playlist, playTrack, currentTrack } = useMusicPlayer()
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Reproducir automáticamente la canción de UP cuando se carga la galería
  useEffect(() => {
    if (isAuthenticated && playlist.length > 0) {
      // Buscar la canción de UP por título
      const upSong = playlist.find(track => track.title === 'Married Life (UP)')
      // Solo cambiar si no es la canción actual
      if (upSong && currentTrack?.id !== upSong.id) {
        playTrack(upSong)
      }
    }
  }, [isAuthenticated]) // Solo se ejecuta cuando cambia la autenticación

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 text-6xl">🔒</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Área Privada
            </h1>
            <p className="mb-8 text-gray-600">
              Necesitas iniciar sesión para ver nuestra galería de recuerdos
            </p>
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
            >
              Iniciar Sesión 💖
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Filtrar fotos por categoría
  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter(photo => photo.category === activeCategory)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream via-secondary-50 to-primary-50">
      {/* Partículas flotantes */}

      <Navbar />

      <div className="container relative z-20 mx-auto px-4 py-16 md:px-6 md:py-20">
        {/* Header romántico */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-4 text-7xl"
          >
            💖
          </motion.div>

          <h1 className="mb-4 font-script text-5xl font-bold md:text-7xl">
            <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-accent-600 bg-clip-text text-transparent">
              Nuestros Recuerdos
            </span>{' '}
            <span className="text-secondary-700">más Lindos</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-lg text-secondary-600 md:text-xl">
            Cada foto cuenta una historia de amor 📸✨
          </p>

          {/* Contador de recuerdos */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="inline-block rounded-full border border-white/50 bg-white/60 px-6 py-3 shadow-lg backdrop-blur-md"
          >
            <span className="font-semibold text-primary-800">
              {photos.length} recuerdos capturados 💕
            </span>
          </motion.div>
        </motion.div>

        {/* Historia de amor */}
        <LoveStory />

        {/* Filtros/Categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2.5 font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-900 text-white shadow-lg shadow-primary-900/20'
                  : 'border border-white/50 bg-white/60 text-secondary-700 backdrop-blur-sm hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de fotos tipo Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3 xl:columns-4"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="break-inside-avoid"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/20"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Efecto Polaroid */}
                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className={`relative ${
                        photo.aspectRatio || 'aspect-square'
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Overlay al hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Texto al hover */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      >
                        <p className="mb-1 font-semibold">{photo.title}</p>
                        {/* date removed per user request */}
                      </motion.div>

                      {/* Ícono de corazón flotante */}
                      <motion.div
                        className="absolute right-3 top-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        <div className="rounded-full bg-white/90 p-2 text-2xl text-primary-600 backdrop-blur-sm">
                          💗
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Caption estilo polaroid */}
                  <div className="mt-3 text-center">
                    <p className="font-handwriting text-sm text-secondary-600">
                      {photo.caption || photo.title}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mensaje final romántico */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-4 text-6xl"
          >
            💝
          </motion.div>
          <h2 className="mb-3 font-script text-4xl font-bold text-primary-900 md:text-5xl">
            Gracias por compartir{' '}
            <span className="bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent">
              este camino
            </span>{' '}
            conmigo
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            Cada foto es un tesoro, cada momento contigo es mágico ✨
          </p>
        </motion.div>
      </div>

      {/* Lightbox para vista ampliada */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  )
}

// Categorías para filtrar
const categories = [
  { id: 'all', label: 'Todas', icon: '💖' },
  { id: 'nieve', label: 'En la Nieve', icon: '☃️' },
  { id: 'templo', label: 'Templo', icon: '⛩️' },
  { id: 'ny', label: 'Nueva York', icon: '🗽' },
  { id: 'comida', label: 'Comidas', icon: '🍽️' },
  { id: 'celebraciones', label: 'Celebraciones', icon: '🎉' },
  { id: 'animales', label: 'Con Animalitos', icon: '🐾' },
  { id: 'diversión', label: 'Diversión', icon: '😄' },
]

// Fotos con categorías y metadata - TODAS LAS FOTOS
const photos = [
  // Nueva York
  {
    src: '/photos/fotos/felizes en ny.jpeg',
    alt: 'Felices en Nueva York',
    title: 'Felices en NY',
    caption: ' en ny 🗽 tu carita muy linda',
    description: 'Esta foto captura tu belleza en todo su esplendor con tu hermosa sonrisa',
    category: 'ny',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/sorprendidos ny.jpeg',
    alt: 'Sorprendidos en NY',
    title: 'Sorpresa en NY',
    caption: 'Ese momento cuando... 😮💕',
    description: 'je je esta foto me da risa te amu',
    category: 'ny',
    aspectRatio: 'aspect-square',
  },

  // Nieve
  {
    src: '/photos/fotos/snow kiss.jpeg',
    alt: 'Beso en la nieve',
    title: 'Beso bajo la nieve',
    caption: 'Un momento mágico ❄️💋',
    description: 'me encanta salir contigo a todos lados',
    category: 'nieve',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    src: '/photos/fotos/snow hearth.jpeg',
    alt: 'Corazón de nieve',
    title: 'Corazón Nevado',
    caption: 'Amor en el frío ⛄💗',
    description: 'Creando recuerdos en la nieve',
    category: 'nieve',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/snow faces.jpeg',
    alt: 'Caras felices en la nieve',
    title: 'Sonrisas Nevadas',
    caption: 'Felicidad pura ☃️😊',
    description: 'je je de verdad veo todas las fotos y estas mu hermosa c:',
    category: 'nieve',
    aspectRatio: 'aspect-[3/4]',
  },

  // Templo
  {
    src: '/photos/fotos/hearth templo.jpeg',
    alt: 'Corazón en el templo',
    title: 'Corazón en el Templo',
    caption: 'Amor en bahai ⛩️💖',
    description: 'ya es costumbre el viaje en el templo es mu wen panorama',
    category: 'templo',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    src: '/photos/fotos/mirandonos templo.jpeg',
    alt: 'Mirándonos en el templo',
    title: 'Miradas Eternas',
    caption: 'miradas que dicen mucho 👀💕',
    description: 'Perdidos en nuestros ojos',
    category: 'templo',
    aspectRatio: 'aspect-[4/5]',
  },

  // Comidas
  {
    src: '/photos/fotos/Corazon de josefa comiendo.jpeg',
    alt: 'Josefa comiendo',
    title: 'Mi Amor Comiendo',
    caption: 'Felicidad en cada bocado 😋💕',
    description: 'me encanta conocer diferentes lugares de comida contigo',
    category: 'comida',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/yo en la comida.jpeg',
    alt: 'Yo en la comida',
    title: 'Disfrutando Juntos',
    caption: 'Momentos deliciosos 🍴',
    description: 'Compartiendo una comida especial',
    category: 'comida',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/tu en la comida.jpeg',
    alt: 'Tú en la comida',
    title: 'Mi Princesa',
    caption: 'Radiante como siempre ✨',
    description: 'Hermosa en cada momento',
    category: 'comida',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/siendo feliz comiendo en el 18 .jpeg',
    alt: 'Feliz comiendo en el 18',
    title: 'Fiestas Patrias',
    caption: 'Celebrando con sabor 🇨🇱🌭',
    description: 'Disfrutando las Fiestas Patrias juntos',
    category: 'comida',
    aspectRatio: 'aspect-square',
  },

  // Celebraciones y Fiestas Patrias
  {
    src: '/photos/fotos/yo y la josefa tomando en el 18.jpeg',
    alt: 'Tomando en el 18',
    title: 'Brindando por Nosotros',
    caption: 'Salud! 🍻🇨🇱',
    description: 'Celebrando las Fiestas Patrias',
    category: 'celebraciones',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/yo la josefa ordenados y formales.jpeg',
    alt: 'Ordenados y formales',
    title: 'Elegantes',
    caption: 'Cuando me acompañas a los momentos importantes 👔👗',
    description: 'Luciendo espectaculares',
    category: 'celebraciones',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/disfrazados yo de pallazo y ella tamb ien.jpeg',
    alt: 'Disfrazados de payasos',
    title: 'Payasos Enamorados',
    caption: 'Locura total 🤡',
    description: 'disfrazardos',
    category: 'celebraciones',
    aspectRatio: 'aspect-square',
  },
  {
    src: '/photos/fotos/esto es halloween en fantasilandia con jac .jpeg',
    alt: 'Fantasilandia',
    title: 'fantasilandia',
    caption: 'Esto es Halloween! 🎃👻',
    description: 'mu weno subirnos a el barco pirata contigo',
    category: 'celebraciones',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/halloween.jpeg',
    alt: 'Halloween - Catrina y Calavera Mexicana',
    title: 'Noche de Brujas',
    caption: ' Catrina y Calavera Mexicana 💀👑',
    description: 'Celebrando Halloween con estilo mexicano',
    category: 'celebraciones',
    aspectRatio: 'aspect-square',
  },

  // Con Animalitos
  {
    src: '/photos/fotos/josefa con la blue berrie perrita amor .jpeg',
    alt: 'Josefa con Blue Berry',
    title: 'Con Blue Berry',
    caption: 'Amor de perrito 🐕💙',
    description: 'Nuestra hija peluda',
    category: 'animales',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/siendo feliz haciendole carinio a un caballo 18 .jpeg',
    alt: 'Acariciando un caballo',
    title: 'Amor por los Caballos',
    caption: 'Momento tierno con el caballo 🐴💕',
    description: 'Tu conexión especial con los animalitos',
    category: 'animales',
    aspectRatio: 'aspect-square',
  },
  {
    src: '/photos/fotos/con el senior de buin zoo.jpeg',
    alt: 'Con el señor en Buin Zoo',
    title: 'Visita al Zoo',
    caption: 'con señor buin zoo 🦁',
    description: 'jue weno ese dia',
    category: 'animales',
    aspectRatio: 'aspect-[3/4]',
  },

  // Pixar/Disney
  {
    src: '/photos/fotos/pixar up los dos con el abuelito.jpeg',
    alt: 'En Pixar Up con el abuelito',
    title: 'Aventura UP',
    caption: 'Volando alto juntos 🎈🏠',
    description: 'a llegar a abuelitos',
    category: 'diversión',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    src: '/photos/fotos/jose feliz con russel up pixar.jpeg',
    alt: 'Josefa feliz con Russell',
    title: 'Con Russell',
    caption: 'Felicidad pura 😊🎈',
    description: 'Tu sonrisa lo dice todo',
    category: 'diversión',
    aspectRatio: 'aspect-square',
  },
  {
    src: '/photos/fotos/tu triste en pixar .jpeg',
    alt: 'Triste en Pixar',
    title: 'Momento Dramático',
    caption: 'nooo sose triste 🎭',
    description: 'Incluso triste te ves hermosa',
    category: 'diversión',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/yo enojado en pixar.jpeg',
    alt: 'Yo enojado en Pixar',
    title: 'Cara de Enojado',
    caption: 'Mi mejor actuación 😤',
    description: 'Que yo soy enojon',
    category: 'diversión',
    aspectRatio: 'aspect-[3/4]',
  },

  // Momentos especiales
  {
    src: '/photos/fotos/beso en cenco corazon.jpeg',
    alt: 'Beso en Cenco',
    title: 'Beso de Corazón',
    caption: 'Amor en cada rincón 💋💕',
    description: 'Robándote besos donde sea',
    category: 'diversión',
    aspectRatio: 'aspect-square',
  },
  {
    src: '/photos/fotos/haciendo cara chistosas en esperando por el boba.jpeg',
    alt: 'Caras chistosas esperando el boba',
    title: 'Espera Divertida',
    caption: 'Mientras esperamos el boba 🧋😝',
    description: 'Haciendo el tonto je je',
    category: 'diversión',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/siendo feliz y brillando .jpeg',
    alt: 'Siendo feliz y brillando',
    title: 'Radiante',
    caption: 'Tu brillo natural ✨😊',
    description: 'Iluminando mi vida',
    category: 'diversión',
    aspectRatio: 'aspect-[3/4]',
  },

  // Photos requested by user
  {
    src: '/photos/fotos/anillos de carino en w.png',
    alt: 'Anillito de cariño',
    title: 'Nuestro Anillito',
    caption:
      'nuestro primer anillito que representa nuestro amor 💍',
    description: 'Recuerdo especial',
    category: 'celebraciones',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    src: '/photos/fotos/cuando me da hambe.png',
    alt: 'Cuando me da hambre (broma)',
    title: 'Cuando me da Hambe',
    caption:
      'hace hambre" 😋😂',
    description: 'yo te como',
    category: 'diversión',
    aspectRatio: 'aspect-square',
  },
  {
    src: '/photos/fotos/en la pandemia.png',
    alt: 'Recuerdo de la pandemia',
    title: 'Recuerdo de la Pandemia',
    caption: 'fue re loco pero lo pasamos juntos',
    description: 'Un recuerdo de la pandemita',
    category: 'diversión',
    aspectRatio: 'aspect-[4/5]',
  },
]
