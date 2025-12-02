'use client'

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react'
import { useAuth } from '@/contexts/AuthContext'

export interface Track {
  id: string
  title: string
  artist: string
  memory: string
  emoji: string
  src: string
  duration: string
  color: string // Para gradiente dinámico
  icon?: string // Ícono especial (🗽, ❄️, 💍, etc.)
}

interface MusicPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  volume: number
  playlist: Track[]
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  nextTrack: () => void
  previousTrack: () => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  audioRef: React.RefObject<HTMLAudioElement>
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
)

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider')
  }
  return context
}

interface MusicPlayerProviderProps {
  children: ReactNode
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth()

  // Verificar si es 2 de diciembre (cumpleaños)
  const isBirthday = () => {
    const today = new Date()
    return today.getMonth() === 11 && today.getDate() === 2 // Diciembre es mes 11 (0-indexed)
  }

  // Canción especial de cumpleaños
  const birthdaySong: Track = {
    id: 'birthday',
    title: 'Cumpleaños Feliz',
    artist: 'Stitch',
    memory: '¡Feliz Cumpleaños mi amor! 🎂🎉 Que este día sea tan especial como tú 💕',
    emoji: '🎂',
    src: '/music/CUMPLEAÑOS FELIZ de STITCH  Canción en Español para dedicar.mp3',
    duration: '3:00',
    color: 'from-blue-400 to-purple-500',
    icon: '🎉',
  }

  // Playlist completa (definida primero para poder usarla en useState)
  const playlist: Track[] = [
    {
      id: '1',
      title: 'Come to Me',
      artist: 'Romantic',
      memory:
        'Siento que esta cancion me llego mucho gracias gracias por todo 💝',
      emoji: '💫',
      src: '/music/Come to Me.mp3',
      duration: '4:15',
      color: 'from-purple-500 to-pink-500',
      icon: '🌙',
    },
    {
      id: '2',
      title: 'Aprender A Quererte',
      artist: 'Morat',
      memory: 'Aún estoy aprendiendo, pero quiero hacerte la mujer más feliz del mundo',
      emoji: '💕',
      src: '/music/Morat - Aprender A Quererte.mp3',
      duration: '3:45',
      color: 'from-pink-400 to-purple-500',
      icon: '💗',
    },
    {
      id: '3',
      title: 'Married Life (UP)',
      artist: 'Michael Giacchino',
      memory: 'Cancion para llorar pero muy linda🎈',
      emoji: '🏠',
      src: '/music/cancion up.mp3',
      duration: '4:08',
      color: 'from-blue-400 to-purple-500',
      icon: '🎈',
    },
    {
      id: '4',
      title: 'Perfect',
      artist: 'Ed Sheeran',
      memory: 'Eres perfecta c: 💖',
      emoji: '💕',
      src: '/music/Ed Sheeran - Perfect .mp3',
      duration: '4:23',
      color: 'from-pink-500 to-rose-500',
      icon: '✨',
    },
    {
      id: '5',
      title: "Hearts Don't Break Round Here",
      artist: 'Ed Sheeran',
      memory: 'Te amo en nuestra historia no se romperan corazones c: 🥰',
      emoji: '❤️',
      src: '/music/Ed Sheeran - Hearts Dont Break Round Here .mp3',
      duration: '4:30',
      color: 'from-red-500 to-pink-500',
      icon: '💘',
    },
    {
      id: '6',
      title: 'Amo Soltanto Te',
      artist: 'señor que canta italiano ',
      memory: 'Te amo solo a ti ✈️',
      emoji: '🌟',
      src: '/music/Amo Soltanto Te.mp3',
      duration: '3:58',
      color: 'from-yellow-500 to-orange-500',
      icon: '🎸',
    },
    {
      id: '7',
      title: 'Aquela Pessoa',
      artist: 'Henrique e Juliano',
      memory: 'Eres esa persona 🌹',
      emoji: '🌹',
      src: '/music/Henrique e Juliano - AQUELA PESSOA .mp3',
      duration: '3:42',
      color: 'from-rose-500 to-red-500',
      icon: '💖',
    },
    {
      id: '8',
      title: 'O Nosso Santo Bateu',
      artist: 'Matheus & Kauan',
      memory: 'De las primeras canciones que te dedique 💫',
      emoji: '🎭',
      src: '/music/Matheus & Kauan - O Nosso Santo Bateu .mp3',
      duration: '3:35',
      color: 'from-blue-500 to-cyan-500',
      icon: '🎵',
    },
    {
      id: '9',
      title: 'Sou Favela',
      artist: 'MC Bruninho',
      memory: 'Mi riqueza eres tú 🇧🇷',
      emoji: '🌴',
      src: '/music/sou favela.mp3',
      duration: '3:20',
      color: 'from-green-500 to-yellow-500',
      icon: '🇧🇷',
    },
    {
      id: '10',
      title: 'One Life',
      artist: 'Ed Sheeran',
      memory: 'Una vida contigo es todo lo que necesito',
      emoji: '💫',
      src: '/music/Ed Sheeran - One Life (Official Audio).mp3',
      duration: '3:45',
      color: 'from-orange-400 to-pink-500',
      icon: '🌟',
    },
    {
      id: '11',
      title: 'I Will Follow You into the Dark',
      artist: 'Death Cab for Cutie',
      memory: 'Estaré contigo hasta el final',
      emoji: '🌙',
      src: '/music/I Will Follow You into the Dark.mp3',
      duration: '3:09',
      color: 'from-indigo-500 to-purple-600',
      icon: '🖤',
    },
    {
      id: '12',
      title: 'Fall On Me',
      artist: 'Andrea Bocelli & Matteo Bocelli',
      memory: 'Me haces sentir lleno',
      emoji: '🎶',
      src: '/music/Andrea Bocelli, Matteo Bocelli - Fall On Me.mp3',
      duration: '3:36',
      color: 'from-sky-400 to-blue-600',
      icon: '🕊️',
    },
    {
      id: '13',
      title: 'Mi Nuevo Vicio',
      artist: 'Morat',
      memory: 'Eres mi vicio',
      emoji: '💘',
      src: '/music/Morat - Mi Nuevo Vicio (Lyric).mp3',
      duration: '3:28',
      color: 'from-red-400 to-rose-500',
      icon: '🎸',
    },
  ]

  // Playlist completa incluyendo canción de cumpleaños si es el día
  const fullPlaylist = isBirthday() ? [birthdaySong, ...playlist] : playlist

  // Estados del reproductor - Si es cumpleaños, empezar con la canción de cumpleaños
  const defaultTrack = isBirthday() ? birthdaySong : playlist.find(t => t.id === '1')
  const [currentTrack, setCurrentTrack] = useState<Track | null>(
    defaultTrack || null
  )
  const [isPlaying, setIsPlaying] = useState(true) // Inicia reproduciendo automáticamente
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Reproducir canción
  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    // Forzar reproducción inmediata
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Play error:', err))
      }
    }, 100)
  }

  // Play/Pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Siguiente canción
  const nextTrack = () => {
    if (!currentTrack) return
    const currentIndex = fullPlaylist.findIndex(t => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % fullPlaylist.length
    playTrack(fullPlaylist[nextIndex])
  }

  // Canción anterior
  const previousTrack = () => {
    if (!currentTrack) return
    const currentIndex = fullPlaylist.findIndex(t => t.id === currentTrack.id)
    const previousIndex =
      currentIndex === 0 ? fullPlaylist.length - 1 : currentIndex - 1
    playTrack(fullPlaylist[previousIndex])
  }

  // Buscar posición
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  // Volumen
  const setVolume = (vol: number) => {
    setVolumeState(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  // Actualizar progreso
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack])

  // Auto-reproducir "Come to Me" cuando el usuario inicia sesión
  useEffect(() => {
    if (isAuthenticated && currentTrack && !isPlaying) {
      // Delay de 1 segundo para que tenga mejor experiencia
      const timer = setTimeout(() => {
        setIsPlaying(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated]) // Se ejecuta cuando cambia el estado de autenticación

  // Controlar reproducción
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Play error:', err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  // Atajo de teclado: espacio para play/pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && currentTrack && e.target === document.body) {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentTrack, isPlaying])

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        playlist: fullPlaylist,
        playTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        seekTo,
        setVolume,
        audioRef,
      }}
    >
      {children}
      {/* Audio element global */}
      <audio ref={audioRef} src={currentTrack?.src} />
    </MusicPlayerContext.Provider>
  )
}
