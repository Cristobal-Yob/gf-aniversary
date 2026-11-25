import './globals.css'
import type { Metadata } from 'next'
import {
  Big_Shoulders_Display,
  Covered_By_Your_Grace,
  Hanken_Grotesk,
} from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { MusicPlayerProvider } from '@/contexts/MusicPlayerContext'
import GlobalMusicPlayer from '@/components/GlobalMusicPlayer'

const display = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['600', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const body = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const hand = Covered_By_Your_Grace({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cristóbal y Josefa - Aniversario Número 9',
  description:
    'Celebrando 9 años de amor, recuerdos y momentos especiales juntos',
  icons: {
    icon: '/photos/icon/J&C.png',
    apple: '/photos/icon/J&C.png',
  },
}

/*
 * DIRECTION CONTRACT (seed a41eef71)
 * THESIS: the relationship is counted, not described. Every screen is a page of
 *   a tear-off calendar running since 25 Nov 2017. Refuses the pink-hearts
 *   romantic landing.
 * OWN-WORLD: cobalt field, cool paper, ink, marker yellow circling dates by
 *   hand; giant condensed numerals, ruled grids, ring binding, torn edges,
 *   photos as dated prints. No gradients, no emoji, square corners.
 * STORY: she sees how many days it has been, recognises their photos and
 *   dates, and walks into the story, the gallery and the music.
 * FIRST VIEWPORT: cobalt calendar page; binding rings on top, day count as the
 *   dominant numeral circled in marker, names and actions below it, three
 *   photo prints dropped on the page.
 * FORM: wall calendar / almanac, candidate 5 of 7.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${hand.variable}`}
    >
      <body>
        <AuthProvider>
          <MusicPlayerProvider>
            {children}
            <GlobalMusicPlayer />
          </MusicPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
