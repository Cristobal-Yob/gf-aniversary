export interface StoryCard {
  title: string
  description: string
  photos: { src: string; alt: string }[]
}

/** "Nuestra historia de amor": la secuencia que abre la galería */
export const storyCards: StoryCard[] = [
  {
    title: "Si te veo triste...",
    description: "Estaré ahí enojado, listo para protegerte y defender tu sonrisa de cualquier cosa que te haga daño",
    photos: [
      {
        src: "/photos/fotos/tu triste en pixar .jpeg",
        alt: "Tú triste"
      },
      {
        src: "/photos/fotos/yo enojado en pixar.jpeg",
        alt: "Yo enojado defendiéndote"
      }
    ]
  },
  {
    title: "Me encanta cuando estás feliz",
    description: "Tu felicidad es mi felicidad. Verte sonreír y brillar ilumina mi mundo entero",
    photos: [
      {
        src: "/photos/fotos/siendo feliz comiendo en el 18 .jpeg",
        alt: "Feliz comiendo"
      },
      {
        src: "/photos/fotos/Corazon de josefa comiendo.jpeg",
        alt: "Mi corazón feliz"
      },
      {
        src: "/photos/fotos/siendo feliz y brillando .jpeg",
        alt: "Brillando de felicidad"
      }
    ]
  },
  {
    title: "Gracias por acompañarme en todo momento",
    description: "Te amo gracias por acompanarme en cada evento en esta vida y por ser mi compañera perfecta para cada ocasión",
    photos: [
      {
        src: "/photos/fotos/yo la josefa ordenados y formales.jpeg",
        alt: "Elegantes y formales"
      }
    ]
  },
  {
    title: "Comamos juntos siempre",
    description: "Cada comida contigo es especial. Compartir estos momentos es uno de mis momentos favoritos cuando te veo con tu bailecito si esta rico",
    photos: [
      {
        src: "/photos/fotos/yo en la comida.jpeg",
        alt: "Yo disfrutando"
      },
      {
        src: "/photos/fotos/tu en la comida.jpeg",
        alt: "Tú hermosa"
      }
    ]
  },
  {
    title: "Celebremos juntos cada festividad",
    description: "Halloween, Navidad, y cada celebración especial. Quiero estar a tu lado en cada momento",
    photos: [
      {
        src: "/photos/fotos/disfrazados yo de pallazo y ella tamb ien.jpeg",
        alt: "Disfrazados juntos"
      },
      {
        src: "/photos/fotos/esto es halloween en fantasilandia con jac .jpeg",
        alt: "Halloween en Fantasilandia"
      }
    ]
  }
]
