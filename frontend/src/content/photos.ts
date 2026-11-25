export interface PhotoCategory {
  id: string
  label: string
}

export interface Photo {
  src: string
  alt: string
  title: string
  caption: string
  description: string
  category: string
  /** Clase de Tailwind con la proporción original de la foto */
  aspectRatio: string
}

export const photoCategories: PhotoCategory[] = [
  {
    id: "all",
    label: "Todas"
  },
  {
    id: "nieve",
    label: "En la Nieve"
  },
  {
    id: "templo",
    label: "Templo"
  },
  {
    id: "ny",
    label: "Nueva York"
  },
  {
    id: "comida",
    label: "Comidas"
  },
  {
    id: "celebraciones",
    label: "Celebraciones"
  },
  {
    id: "animales",
    label: "Con Animalitos"
  },
  {
    id: "diversión",
    label: "Diversión"
  },
  {
    id: "vangogh",
    label: "Van Gogh"
  }
]

export const photos: Photo[] = [
  {
    src: "/photos/fotos/felizes en ny.jpeg",
    alt: "Felices en Nueva York",
    title: "Felices en NY",
    caption: "en ny tu carita muy linda",
    description: "Esta foto captura tu belleza en todo su esplendor con tu hermosa sonrisa",
    category: "ny",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/sorprendidos ny.jpeg",
    alt: "Sorprendidos en NY",
    title: "Sorpresa en NY",
    caption: "Ese momento cuando...",
    description: "je je esta foto me da risa te amu",
    category: "ny",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/snow kiss.jpeg",
    alt: "Beso en la nieve",
    title: "Beso bajo la nieve",
    caption: "Un momento mágico",
    description: "me encanta salir contigo a todos lados",
    category: "nieve",
    aspectRatio: "aspect-[4/5]"
  },
  {
    src: "/photos/fotos/snow hearth.jpeg",
    alt: "Corazón de nieve",
    title: "Corazón Nevado",
    caption: "Amor en el frío",
    description: "Creando recuerdos en la nieve",
    category: "nieve",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/snow faces.jpeg",
    alt: "Caras felices en la nieve",
    title: "Sonrisas Nevadas",
    caption: "Felicidad pura",
    description: "je je de verdad veo todas las fotos y estas mu hermosa c:",
    category: "nieve",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/hearth templo.jpeg",
    alt: "Corazón en el templo",
    title: "Corazón en el Templo",
    caption: "Amor en bahai",
    description: "ya es costumbre el viaje en el templo es mu wen panorama",
    category: "templo",
    aspectRatio: "aspect-[4/5]"
  },
  {
    src: "/photos/fotos/mirandonos templo.jpeg",
    alt: "Mirándonos en el templo",
    title: "Miradas Eternas",
    caption: "miradas que dicen mucho",
    description: "Perdidos en nuestros ojos",
    category: "templo",
    aspectRatio: "aspect-[4/5]"
  },
  {
    src: "/photos/fotos/Corazon de josefa comiendo.jpeg",
    alt: "Josefa comiendo",
    title: "Mi Amor Comiendo",
    caption: "Felicidad en cada bocado",
    description: "me encanta conocer diferentes lugares de comida contigo",
    category: "comida",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/yo en la comida.jpeg",
    alt: "Yo en la comida",
    title: "Disfrutando Juntos",
    caption: "Momentos deliciosos",
    description: "Compartiendo una comida especial",
    category: "comida",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/tu en la comida.jpeg",
    alt: "Tú en la comida",
    title: "Mi Princesa",
    caption: "Radiante como siempre",
    description: "Hermosa en cada momento",
    category: "comida",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/siendo feliz comiendo en el 18 .jpeg",
    alt: "Feliz comiendo en el 18",
    title: "Fiestas Patrias",
    caption: "Celebrando con sabor",
    description: "Disfrutando las Fiestas Patrias juntos",
    category: "comida",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/yo y la josefa tomando en el 18.jpeg",
    alt: "Tomando en el 18",
    title: "Brindando por Nosotros",
    caption: "Salud!",
    description: "Celebrando las Fiestas Patrias",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/yo la josefa ordenados y formales.jpeg",
    alt: "Ordenados y formales",
    title: "Elegantes",
    caption: "Cuando me acompañas a los momentos importantes",
    description: "Luciendo espectaculares",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/disfrazados yo de pallazo y ella tamb ien.jpeg",
    alt: "Disfrazados de payasos",
    title: "Payasos Enamorados",
    caption: "Locura total",
    description: "disfrazardos",
    category: "celebraciones",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/esto es halloween en fantasilandia con jac .jpeg",
    alt: "Fantasilandia",
    title: "fantasilandia",
    caption: "Esto es Halloween!",
    description: "mu weno subirnos a el barco pirata contigo",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/halloween.jpeg",
    alt: "Halloween - Catrina y Calavera Mexicana",
    title: "Noche de Brujas",
    caption: "Catrina y Calavera Mexicana",
    description: "Celebrando Halloween con estilo mexicano",
    category: "celebraciones",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/josefa con la blue berrie perrita amor .jpeg",
    alt: "Josefa con Blue Berry",
    title: "Con Blue Berry",
    caption: "Amor de perrito",
    description: "Nuestra hija peluda",
    category: "animales",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/siendo feliz haciendole carinio a un caballo 18 .jpeg",
    alt: "Acariciando un caballo",
    title: "Amor por los Caballos",
    caption: "Momento tierno con el caballo",
    description: "Tu conexión especial con los animalitos",
    category: "animales",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/con el senior de buin zoo.jpeg",
    alt: "Con el señor en Buin Zoo",
    title: "Visita al Zoo",
    caption: "con señor buin zoo",
    description: "jue weno ese dia",
    category: "animales",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/pixar up los dos con el abuelito.jpeg",
    alt: "En Pixar Up con el abuelito",
    title: "Aventura UP",
    caption: "Volando alto juntos",
    description: "a llegar a abuelitos",
    category: "diversión",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/fotos/jose feliz con russel up pixar.jpeg",
    alt: "Josefa feliz con Russell",
    title: "Con Russell",
    caption: "Felicidad pura",
    description: "Tu sonrisa lo dice todo",
    category: "diversión",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/tu triste en pixar .jpeg",
    alt: "Triste en Pixar",
    title: "Momento Dramático",
    caption: "nooo sose triste",
    description: "Incluso triste te ves hermosa",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/yo enojado en pixar.jpeg",
    alt: "Yo enojado en Pixar",
    title: "Cara de Enojado",
    caption: "Mi mejor actuación",
    description: "Que yo soy enojon",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/beso en cenco corazon.jpeg",
    alt: "Beso en Cenco",
    title: "Beso de Corazón",
    caption: "Amor en cada rincón",
    description: "Robándote besos donde sea",
    category: "diversión",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/haciendo cara chistosas en esperando por el boba.jpeg",
    alt: "Caras chistosas esperando el boba",
    title: "Espera Divertida",
    caption: "Mientras esperamos el boba",
    description: "Haciendo el tonto je je",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/siendo feliz y brillando .jpeg",
    alt: "Siendo feliz y brillando",
    title: "Radiante",
    caption: "Tu brillo natural",
    description: "Iluminando mi vida",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/anillos de carino en w.png",
    alt: "Anillito de cariño",
    title: "Nuestro Anillito",
    caption: "nuestro primer anillito que representa nuestro amor",
    description: "Recuerdo especial",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/fotos/cuando me da hambe.png",
    alt: "Cuando me da hambre (broma)",
    title: "Cuando me da Hambe",
    caption: "hace hambre\"",
    description: "yo te como",
    category: "diversión",
    aspectRatio: "aspect-square"
  },
  {
    src: "/photos/fotos/en la pandemia.png",
    alt: "Recuerdo de la pandemia",
    title: "Recuerdo de la Pandemia",
    caption: "fue re loco pero lo pasamos juntos",
    description: "Un recuerdo de la pandemita",
    category: "diversión",
    aspectRatio: "aspect-[4/5]"
  },
  {
    src: "/photos/nuevas/foto-04.jpg",
    alt: "Selfie con el retrato de Van Gogh",
    title: "Con Van Gogh",
    caption: "Selfie con Vincent",
    description: "",
    category: "vangogh",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/nuevas/foto-05.jpg",
    alt: "Los dos dentro de La Noche Estrellada",
    title: "La Noche Estrellada",
    caption: "Dentro del cuadro",
    description: "",
    category: "vangogh",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-06.jpg",
    alt: "Con sombreros en el dormitorio de Van Gogh",
    title: "El dormitorio de Van Gogh",
    caption: "Con sombrero y todo",
    description: "",
    category: "vangogh",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/nuevas/foto-07.jpg",
    alt: "Selfie en la sala de girasoles",
    title: "Entre girasoles",
    caption: "Rodeados de girasoles",
    description: "",
    category: "vangogh",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/nuevas/foto-08.jpg",
    alt: "Selfie riendo en la sala de girasoles",
    title: "Girasoles y risas",
    caption: "La foto seria no duró mucho",
    description: "",
    category: "vangogh",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/nuevas/foto-09.jpg",
    alt: "Josefa sentada entre girasoles",
    title: "Tú entre girasoles",
    caption: "La flor más linda del salón",
    description: "",
    category: "vangogh",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-01.jpg",
    alt: "Selfie de los dos haciendo caras",
    title: "Caras chistosas",
    caption: "Siempre haciendo caras",
    description: "",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-03.jpg",
    alt: "Beso frente a un espejo redondo",
    title: "Beso en el espejo",
    caption: "Beso en el espejo",
    description: "",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-10.jpg",
    alt: "Josefa posando sobre una roca",
    title: "En la roca",
    caption: "Pose de campeona",
    description: "",
    category: "diversión",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-11.jpg",
    alt: "Josefa sorprendida frente a una cebolla frita gigante",
    title: "La cebolla gigante",
    caption: "Tu cara al verla llegar",
    description: "",
    category: "comida",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-12.jpg",
    alt: "Josefa esperando la comida con las manos juntas",
    title: "Esperando la comida",
    caption: "Paciencia y hambre",
    description: "",
    category: "comida",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-13.jpg",
    alt: "Josefa con dos vasos en una fonda",
    title: "Salud",
    caption: "Dos vasos, una Josefa",
    description: "",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-02.jpg",
    alt: "Almuerzo en familia en un restaurante",
    title: "Almuerzo en familia",
    caption: "Almuerzo en familia",
    description: "",
    category: "comida",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/nuevas/foto-14.jpg",
    alt: "Almuerzo con la familia",
    title: "Mesa llena",
    caption: "Mesa llena",
    description: "",
    category: "comida",
    aspectRatio: "aspect-[4/3]"
  },
  {
    src: "/photos/nuevas/foto-15.jpg",
    alt: "Selfie de los dos vestidos de traje el día de la titulación",
    title: "Team ingeniero abogadita",
    caption: "Team ingeniero abogadita",
    description: "",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-16.jpg",
    alt: "Josefa celebrando con champaña frente a tribunales",
    title: "Brindis de abogada",
    caption: "Perdón mami por mojarte el pelito",
    description: "",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  },
  {
    src: "/photos/nuevas/foto-17.jpg",
    alt: "Los dos frente a un mural de colores",
    title: "Celebrando tus logros",
    caption: "Otro logro para celebrar",
    description: "",
    category: "celebraciones",
    aspectRatio: "aspect-[3/4]"
  }
]
