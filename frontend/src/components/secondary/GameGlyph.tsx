import type { SVGProps } from 'react'

export type GameGlyphName =
  | 'hero'
  | 'web'
  | 'flower'
  | 'runner'
  | 'snake'
  | 'invader'
  | 'blocks'
  | 'ball'

const plate = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': 'true',
  focusable: 'false',
} as const

const paths: Record<GameGlyphName, JSX.Element> = {
  // Antifaz de agente
  hero: (
    <>
      <path d="M2.5 9.5c3-1.5 6-1.5 9.5 0 3.5-1.5 6.5-1.5 9.5 0-.5 4.5-3 6.5-6 6.5-1.6 0-2.7-1-3.5-2.5-.8 1.5-1.9 2.5-3.5 2.5-3 0-5.5-2-6-6.5Z" />
      <path d="M7 12h1.5M15.5 12H17" />
    </>
  ),
  // Navegador con mando
  web: (
    <>
      <path d="M3 4h18v16H3ZM3 8h18" />
      <path d="M8.5 14h4m-2-2v4" />
      <path d="M15.5 14h.5" />
    </>
  ),
  // Girasol
  flower: (
    <>
      <circle cx={12} cy={9} r={2.5} />
      <path d="M12 3.5v1.5M12 13v1.5M6.5 9H8M16 9h1.5M8.1 5.1l1 1M14.9 11.9l1 1M8.1 12.9l1-1M14.9 6.1l1-1" />
      <path d="M12 14.5V21M12 18c-2.5 0-4-1.2-4.5-3 2.5 0 4 1.2 4.5 3Z" />
    </>
  ),
  // Corredor
  runner: (
    <>
      <circle cx={14.5} cy={4.5} r={1.75} />
      <path d="M9 9.5l4-2 3 3.5 3 .5M13 7.5l-2 6 4 3v4.5M11 13.5l-3.5 3.5H4" />
    </>
  ),
  // Serpiente de cuadros
  snake: (
    <>
      <path d="M4 18h10v-6H8V6h10v5" />
      <path d="M18 14.5v.5" />
    </>
  ),
  // Invasor
  invader: (
    <>
      <path d="M7 4l2 3h6l2-3M5 7h14v8H5ZM3 10v5M21 10v5M7 15v3h3M17 15v3h-3" />
      <path d="M9 10.5h1M14 10.5h1" />
    </>
  ),
  // Bloques que encajan
  blocks: (
    <>
      <path d="M4 14h5v5H4ZM9 14h5v5H9ZM14 14h5v5h-5ZM9 9h5v5H9ZM14 4h5v5h-5Z" />
    </>
  ),
  // Balón
  ball: (
    <>
      <circle cx={12} cy={12} r={9} />
      <path d="M12 7.5l3.5 2.5-1.3 4h-4.4l-1.3-4ZM12 3v4.5M15.5 10l5-1.5M14.2 14l2.8 4.5M9.8 14 7 18.5M8.5 10l-5-1.5" />
    </>
  ),
}

interface GameGlyphProps extends SVGProps<SVGSVGElement> {
  name: GameGlyphName
}

/** Ícono de cada juego, con el mismo trazo cuadrado que el set de íconos */
export default function GameGlyph({ name, ...props }: GameGlyphProps) {
  return (
    <svg {...plate} {...props}>
      {paths[name]}
    </svg>
  )
}
