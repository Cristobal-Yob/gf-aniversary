import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import BackgroundMusic from '@/components/BackgroundMusic'

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
          {children}
          <BackgroundMusic />
        </AuthProvider>
      </body>
    </html>
  )
}
