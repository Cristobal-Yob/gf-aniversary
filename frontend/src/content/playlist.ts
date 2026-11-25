export interface Track {
  id: string
  title: string
  artist: string
  /** Lo que significa la canción para nosotros */
  memory: string
  src: string
  duration: string
}

export const playlist: Track[] = [
  {
    id: "1",
    title: "Come to Me",
    artist: "Romantic",
    memory: "Siento que esta cancion me llego mucho gracias gracias por todo",
    src: "/music/Come to Me.mp3",
    duration: "4:15"
  },
  {
    id: "2",
    title: "Aprender A Quererte",
    artist: "Morat",
    memory: "Aún estoy aprendiendo, pero quiero hacerte la mujer más feliz del mundo",
    src: "/music/Morat - Aprender A Quererte.mp3",
    duration: "3:45"
  },
  {
    id: "3",
    title: "Married Life (UP)",
    artist: "Michael Giacchino",
    memory: "Cancion para llorar pero muy linda",
    src: "/music/cancion up.mp3",
    duration: "4:08"
  },
  {
    id: "4",
    title: "Perfect",
    artist: "Ed Sheeran",
    memory: "Eres perfecta c:",
    src: "/music/Ed Sheeran - Perfect .mp3",
    duration: "4:23"
  },
  {
    id: "5",
    title: "Hearts Don't Break Round Here",
    artist: "Ed Sheeran",
    memory: "Te amo en nuestra historia no se romperan corazones c:",
    src: "/music/Ed Sheeran - Hearts Dont Break Round Here .mp3",
    duration: "4:30"
  },
  {
    id: "6",
    title: "Amo Soltanto Te",
    artist: "señor que canta italiano",
    memory: "Te amo solo a ti",
    src: "/music/Amo Soltanto Te.mp3",
    duration: "3:58"
  },
  {
    id: "7",
    title: "Aquela Pessoa",
    artist: "Henrique e Juliano",
    memory: "Eres esa persona",
    src: "/music/Henrique e Juliano - AQUELA PESSOA .mp3",
    duration: "3:42"
  },
  {
    id: "8",
    title: "O Nosso Santo Bateu",
    artist: "Matheus & Kauan",
    memory: "De las primeras canciones que te dedique",
    src: "/music/Matheus & Kauan - O Nosso Santo Bateu .mp3",
    duration: "3:35"
  },
  {
    id: "9",
    title: "Sou Favela",
    artist: "MC Bruninho",
    memory: "Mi riqueza eres tú 🇧🇷",
    src: "/music/sou favela.mp3",
    duration: "3:20"
  },
  {
    id: "10",
    title: "One Life",
    artist: "Ed Sheeran",
    memory: "Una vida contigo es todo lo que necesito",
    src: "/music/Ed Sheeran - One Life (Official Audio).mp3",
    duration: "3:45"
  },
  {
    id: "11",
    title: "I Will Follow You into the Dark",
    artist: "Death Cab for Cutie",
    memory: "Estaré contigo hasta el final",
    src: "/music/I Will Follow You into the Dark.mp3",
    duration: "3:09"
  },
  {
    id: "12",
    title: "Fall On Me",
    artist: "Andrea Bocelli & Matteo Bocelli",
    memory: "Me haces sentir lleno",
    src: "/music/Andrea Bocelli, Matteo Bocelli - Fall On Me.mp3",
    duration: "3:36"
  },
  {
    id: "13",
    title: "Mi Nuevo Vicio",
    artist: "Morat",
    memory: "Eres mi vicio",
    src: "/music/Morat - Mi Nuevo Vicio (Lyric).mp3",
    duration: "3:28"
  }
]

/** Solo suena el 2 de diciembre, el cumpleaños de Josefa */
export const birthdayTrack: Track = {
  id: 'birthday',
  title: 'Cumpleaños Feliz',
  artist: 'Stitch',
  memory: '¡Feliz Cumpleaños mi amor! Que este día sea tan especial como tú',
  src: '/music/CUMPLEAÑOS FELIZ de STITCH  Canción en Español para dedicar.mp3',
  duration: '3:00',
}
