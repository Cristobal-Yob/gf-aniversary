import { Vinyl } from '@/components/illustrations/extra'

interface SpinningVinylProps {
  spinning: boolean
  className?: string
  /** Segundos por vuelta */
  period?: number
}

/**
 * El disco gira solo mientras suena. La animación existe siempre y se pausa,
 * así el disco se detiene donde quedó en vez de saltar a cero.
 */
export default function SpinningVinyl({
  spinning,
  className = '',
  period = 1.8,
}: SpinningVinylProps) {
  return (
    <span
      aria-hidden
      data-spinning={spinning}
      className={`almanac-vinyl block ${className}`}
      style={{ animationDuration: `${period}s` }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes almanac-vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .almanac-vinyl {
          animation-name: almanac-vinyl-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: paused;
        }
        .almanac-vinyl[data-spinning=true] {
          animation-play-state: running;
        }
        @media (prefers-reduced-motion: reduce) {
          .almanac-vinyl { animation: none; }
        }
      `,
        }}
      />
      <Vinyl className="h-full w-full" />
    </span>
  )
}
