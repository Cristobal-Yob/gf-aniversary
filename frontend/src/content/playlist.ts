export interface Track {
  id: string
  title: string
  artist: string
  /** Lo que significa la canción para nosotros */
  memory: string
  src: string
  duration: string
  /** Disco al que pertenece */
  disc: 1 | 2
}

export interface Disc {
  id: 1 | 2
  title: string
  subtitle: string
  note: string
  image?: { src: string; alt: string; width: number; height: number }
}

export const discs: Disc[] = [
  {
    id: 1,
    title: 'Disco 1',
    subtitle: 'Nuestra Playlist del Corazón',
    note: 'Las canciones que cuentan nuestra historia',
  },
  {
    id: 2,
    title: 'Disco 2',
    subtitle: 'Temazos para el auto',
    note: 'No tan románticas, pero son las que cantamos en el auto',
    image: {
      src: '/music/disco2/homero-marge.png',
      alt: 'Homero y Marge escuchando temazos y comiendo en el auto',
      width: 236,
      height: 148,
    },
  },
]

export const playlist: Track[] = [
  {
    id: "1",
    title: "Come to Me",
    artist: "Goo Goo Dolls",
    memory: "Siento que esta cancion me llego mucho gracias gracias por todo",
    src: "/music/Come to Me.mp3",
    duration: "4:15",
    disc: 1
  },
  {
    id: "2",
    title: "Aprender A Quererte",
    artist: "Morat",
    memory: "Aún estoy aprendiendo, pero quiero hacerte la mujer más feliz del mundo",
    src: "/music/Morat - Aprender A Quererte.mp3",
    duration: "3:45",
    disc: 1
  },
  {
    id: "3",
    title: "Married Life (UP)",
    artist: "Michael Giacchino",
    memory: "Cancion para llorar pero muy linda",
    src: "/music/cancion up.mp3",
    duration: "4:08",
    disc: 1
  },
  {
    id: "4",
    title: "Perfect",
    artist: "Ed Sheeran",
    memory: "Eres perfecta c:",
    src: "/music/Ed Sheeran - Perfect .mp3",
    duration: "4:23",
    disc: 1
  },
  {
    id: "5",
    title: "Hearts Don't Break Round Here",
    artist: "Ed Sheeran",
    memory: "Te amo en nuestra historia no se romperan corazones c:",
    src: "/music/Ed Sheeran - Hearts Dont Break Round Here .mp3",
    duration: "4:30",
    disc: 1
  },
  {
    id: "6",
    title: "Amo Soltanto Te",
    artist: "señor que canta italiano",
    memory: "Te amo solo a ti",
    src: "/music/Amo Soltanto Te.mp3",
    duration: "3:58",
    disc: 1
  },
  {
    id: "7",
    title: "Aquela Pessoa",
    artist: "Henrique e Juliano",
    memory: "Eres esa persona",
    src: "/music/Henrique e Juliano - AQUELA PESSOA .mp3",
    duration: "3:42",
    disc: 1
  },
  {
    id: "8",
    title: "O Nosso Santo Bateu",
    artist: "Matheus & Kauan",
    memory: "De las primeras canciones que te dedique",
    src: "/music/Matheus & Kauan - O Nosso Santo Bateu .mp3",
    duration: "3:35",
    disc: 1
  },
  {
    id: "9",
    title: "Sou Favela",
    artist: "MC Bruninho",
    memory: "Mi riqueza eres tú",
    src: "/music/sou favela.mp3",
    duration: "3:20",
    disc: 1
  },
  {
    id: "10",
    title: "One Life",
    artist: "Ed Sheeran",
    memory: "Una vida contigo es todo lo que necesito",
    src: "/music/Ed Sheeran - One Life (Official Audio).mp3",
    duration: "3:45",
    disc: 1
  },
  {
    id: "11",
    title: "I Will Follow You into the Dark",
    artist: "Death Cab for Cutie",
    memory: "Estaré contigo hasta el final",
    src: "/music/I Will Follow You into the Dark.mp3",
    duration: "3:09",
    disc: 1
  },
  {
    id: "12",
    title: "Fall On Me",
    artist: "Andrea Bocelli & Matteo Bocelli",
    memory: "Me haces sentir lleno",
    src: "/music/Andrea Bocelli, Matteo Bocelli - Fall On Me.mp3",
    duration: "3:36",
    disc: 1
  },
  {
    id: "13",
    title: "Mi Nuevo Vicio",
    artist: "Morat",
    memory: "Eres mi vicio",
    src: "/music/Morat - Mi Nuevo Vicio (Lyric).mp3",
    duration: "3:28",
    disc: 1
  },
  {
    id: "14",
    title: "Bad Habits",
    artist: "Ed Sheeran feat. Bring Me The Horizon",
    memory: "",
    src: "/music/disco2/bad-habits.mp3",
    duration: "4:10",
    disc: 2
  },
  {
    id: "15",
    title: "Eyes Closed",
    artist: "Ed Sheeran",
    memory: "",
    src: "/music/disco2/eyes-closed.mp3",
    duration: "3:14",
    disc: 2
  },
  {
    id: "16",
    title: "Jet Lag",
    artist: "Simple Plan feat. Natasha Bedingfield",
    memory: "",
    src: "/music/disco2/jet-lag.mp3",
    duration: "3:24",
    disc: 2
  },
  {
    id: "17",
    title: "Dark Thoughts",
    artist: "The Funeral Portrait",
    memory: "",
    src: "/music/disco2/dark-thoughts.mp3",
    duration: "4:49",
    disc: 2
  },
  {
    id: "18",
    title: "Mon Amour (Remix)",
    artist: "Zzoilo y Aitana",
    memory: "",
    src: "/music/disco2/mon-amour-remix.mp3",
    duration: "2:59",
    disc: 2
  },
  {
    id: "19",
    title: "All My Love",
    artist: "Noah Kahan",
    memory: "",
    src: "/music/disco2/all-my-love.mp3",
    duration: "4:11",
    disc: 2
  },
  {
    id: "20",
    title: "La Posada",
    artist: "Sebastián Cortés y Alba Reche",
    memory: "",
    src: "/music/disco2/la-posada.mp3",
    duration: "2:49",
    disc: 2
  },
  {
    id: "21",
    title: "Rey Sin Reina",
    artist: "Julión Álvarez y su Norteño Banda",
    memory: "",
    src: "/music/disco2/rey-sin-reina.mp3",
    duration: "2:30",
    disc: 2
  },
  {
    id: "22",
    title: "Voilà",
    artist: "Emma Kok y André Rieu",
    memory: "",
    src: "/music/disco2/voila.mp3",
    duration: "5:10",
    disc: 2
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
  disc: 1,
}
