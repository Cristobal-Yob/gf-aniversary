'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface StoryCard {
  title: string
  description: string
  photos: {
    src: string
    alt: string
  }[]
}

const storyCards: StoryCard[] = [
  {
    title: 'Si te veo triste... 😢',
    description:
      'Estaré ahí enojado, listo para protegerte y defender tu sonrisa de cualquier cosa que te haga daño 💪😤',
    photos: [
      {
        src: '/photos/fotos/tu triste en pixar .jpeg',
        alt: 'Tú triste',
      },
      {
        src: '/photos/fotos/yo enojado en pixar.jpeg',
        alt: 'Yo enojado defendiéndote',
      },
    ],
  },
  {
    title: 'Me encanta cuando estás feliz 😊',
    description:
      'Tu felicidad es mi felicidad. Verte sonreír y brillar ilumina mi mundo entero ✨💕',
    photos: [
      {
        src: '/photos/fotos/siendo feliz comiendo en el 18 .jpeg',
        alt: 'Feliz comiendo',
      },
      {
        src: '/photos/fotos/Corazon de josefa comiendo.jpeg',
        alt: 'Mi corazón feliz',
      },
      {
        src: '/photos/fotos/siendo feliz y brillando .jpeg',
        alt: 'Brillando de felicidad',
      },
    ],
  },
  {
    title: 'Para estar elegantes juntos 👔👗',
    description:
      'Porque a veces nos gusta arreglarnos bonito y vernos espectaculares el uno al lado del otro',
    photos: [
      {
        src: '/photos/fotos/yo la josefa ordenados y formales.jpeg',
        alt: 'Elegantes y formales',
      },
    ],
  },
  {
    title: 'Comamos juntos siempre 🍽️',
    description:
      'Cada comida contigo es especial. Compartir estos momentos es uno de mis placeres favoritos',
    photos: [
      {
        src: '/photos/fotos/yo en la comida.jpeg',
        alt: 'Yo disfrutando',
      },
      {
        src: '/photos/fotos/tu en la comida.jpeg',
        alt: 'Tú hermosa',
      },
    ],
  },
  {
    title: 'Celebremos juntos cada festividad 🎉',
    description:
      'Halloween, Navidad, y cada celebración especial. Quiero estar a tu lado en cada momento festivo',
    photos: [
      {
        src: '/photos/fotos/disfrazados yo de pallazo y ella tamb ien.jpeg',
        alt: 'Disfrazados juntos',
      },
      {
        src: '/photos/fotos/esto es halloween en fantasilandia con jac .jpeg',
        alt: 'Halloween en Fantasilandia',
      },
    ],
  },
]

export default function LoveStory() {
  return (
    <div className="mb-16">
      {/* Título de la historia */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4 text-6xl"
        >
          📖
        </motion.div>
        <h2 className="font-cursive mb-3 text-3xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-600 bg-clip-text text-transparent">
            Nuestra Historia
          </span>{' '}
          <span className="text-gray-800">de Amor</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Cada momento contigo cuenta una historia única 💕
        </p>
      </motion.div>

      {/* Cards de la historia */}
      <div className="space-y-12">
        {storyCards.map((card, cardIndex) => (
          <motion.div
            key={cardIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.8,
              delay: cardIndex * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex flex-col gap-6 md:flex-row md:items-center ${
              cardIndex % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Texto */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur-sm md:p-10"
            >
              <motion.h3
                className="font-cursive mb-4 text-2xl font-bold text-gray-800 md:text-3xl"
                initial={{ opacity: 0, x: cardIndex % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {card.title}
              </motion.h3>
              <motion.p
                className="text-lg leading-relaxed text-gray-600 md:text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {card.description}
              </motion.p>
            </motion.div>

            {/* Fotos */}
            <div className="flex-1">
              <div
                className={`grid gap-4 ${
                  card.photos.length === 1
                    ? 'grid-cols-1'
                    : card.photos.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-2 md:grid-cols-3'
                }`}
              >
                {card.photos.map((photo, photoIndex) => (
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + photoIndex * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: photoIndex % 2 === 0 ? 2 : -2,
                    }}
                    className={`group relative overflow-hidden rounded-2xl bg-white p-3 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/30 ${
                      card.photos.length === 1 ? 'col-span-1' : ''
                    }`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 50vw, 300px"
                      />

                      {/* Overlay sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Decoración tipo polaroid */}
                    <motion.div
                      className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-orange-400/20 blur-xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: photoIndex * 0.5,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sección especial: De jóvenes a viejitos - Inspirada en UP */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-150px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20"
      >
        <div className="rounded-3xl bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          {/* Título emotivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-10 text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-4 text-5xl"
            >
              🎈
            </motion.div>
            <h3 className="font-cursive mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Nuestra Aventura
              </span>{' '}
              <span className="text-gray-800">juntos para siempre</span>
            </h3>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
              Como Carl y Ellie en UP, quiero que nuestra historia sea una
              aventura que dure toda la vida. Desde este momento hasta que
              seamos viejitos juntos, compartiendo risas, recuerdos y todo el
              amor del mundo 💕
            </p>
          </motion.div>

          {/* Tarjeta especial con transición hover: Jóvenes → Viejitos */}
          <div className="relative mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all duration-700 hover:shadow-purple-500/60 md:p-8">
                {/* Contenedor de imágenes con transición */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  {/* Imagen de jóvenes (visible por defecto) */}
                  <Image
                    src="/photos/fotos/pixar up los dos con el abuelito.jpeg"
                    alt="Nosotros jóvenes juntos"
                    fill
                    className="object-contain object-center transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                    sizes="(max-width: 768px) 90vw, 600px"
                    priority
                  />

                  {/* Imagen de viejitos (aparece en hover) */}
                  <Image
                    src="/photos/fotos/up pero viejitos.jpg"
                    alt="Nosotros viejitos juntos"
                    fill
                    className="object-contain object-center opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 90vw, 600px"
                  />

                  {/* Overlay gradiente que cambia de color */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-transparent to-transparent opacity-100 transition-all duration-1000 group-hover:from-purple-900/40 group-hover:opacity-100" />

                  {/* Indicador sutil para hacer hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-100/90"
                  >
                    <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-purple-700">
                      Pasa el cursor
                    </span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-lg"
                    >
                      ✨
                    </motion.span>
                  </motion.div>
                </div>

                {/* Etiqueta dinámica que cambia con hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 text-center"
                >
                  <p className="font-cursive text-2xl font-bold transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent md:text-3xl">
                    <span className="group-hover:hidden">Ahora 💖</span>
                    <span className="hidden group-hover:inline">
                      Para siempre 💜
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600 transition-all duration-700 md:text-base">
                    <span className="group-hover:hidden">
                      Jóvenes y enamorados
                    </span>
                    <span className="hidden group-hover:inline">
                      Viejitos y enamorados
                    </span>
                  </p>
                </motion.div>
              </div>

              {/* Glow animado que cambia de color */}
              <motion.div
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-orange-400/40 via-pink-400/40 to-purple-400/40 blur-2xl transition-all duration-1000 group-hover:from-purple-400/60 group-hover:via-pink-400/60 group-hover:to-orange-400/60"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Partículas flotantes decorativas */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    x: `${20 + i * 15}%`,
                    y: '100%',
                    opacity: 0,
                  }}
                  animate={{
                    y: ['-20%', '-100%'],
                    opacity: [0, 0.6, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: 'linear',
                  }}
                >
                  {i % 3 === 0 ? '🎈' : i % 3 === 1 ? '💕' : '✨'}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mensaje final emotivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 text-center"
          >
            <motion.p
              className="font-cursive mx-auto max-w-2xl text-2xl leading-relaxed text-gray-800 md:text-3xl"
              animate={{
                textShadow: [
                  '0 0 10px rgba(236, 72, 153, 0)',
                  '0 0 20px rgba(236, 72, 153, 0.3)',
                  '0 0 10px rgba(236, 72, 153, 0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              "La verdadera aventura no es ir a un lugar, sino vivir cada
              momento contigo. Quiero estar a tu lado desde ahora hasta que
              seamos viejitos, compartiendo cada risa, cada lágrima y cada
              latido de nuestros corazones" 💫
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.3,
                duration: 0.6,
                type: 'spring',
                bounce: 0.5,
              }}
              className="mt-6 text-6xl"
            >
              🏠💑👴👵💕
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Separador decorativo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 flex items-center justify-center"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-3xl"
          >
            💝
          </motion.div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl"
          >
            💖
          </motion.div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-3xl"
          >
            💝
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
