import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import { MusicPlayerProvider } from '@/contexts/MusicPlayerContext'
import GlobalMusicPlayer from '@/components/GlobalMusicPlayer'
import FloatingHearts from '@/components/FloatingHearts'

export const metadata: Metadata = {
  title: 'Cristóbal y Josefa - Aniversario Número 8 💕',
  description:
    'Celebrando 8 años de amor, recuerdos y momentos especiales juntos',
  icons: {
    icon: '/photos/icon/J&C.png',
    apple: '/photos/icon/J&C.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <MusicPlayerProvider>
            <FloatingHearts />
            {children}
            <GlobalMusicPlayer />
          </MusicPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
