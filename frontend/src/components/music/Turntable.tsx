'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { EqualizerBars, ToneArm } from '@/components/illustrations/extra'
import SpinningVinyl from '@/components/music/SpinningVinyl'
import { useAudioBeat } from '@/hooks/useAudioBeat'

interface TurntableProps {
  audio: HTMLAudioElement | null
  isPlaying: boolean
}

const SWING = [0.77, 0, 0.175, 1] as const

/**
 * Tocadiscos: el disco gira, el brazo baja sobre el surco al sonar, y el
 * ecualizador sigue el nivel real del audio (o una animación CSS si no se puede leer).
 */
export default function Turntable({ audio, isPlaying }: TurntableProps) {
  const reduceMotion = useReducedMotion()
  const eqRef = useRef<HTMLDivElement>(null)

  const paintLevels = useCallback((levels: number[]) => {
    const bars = eqRef.current?.querySelectorAll<SVGElement>('.eq-bar')
    bars?.forEach((bar, i) => {
      const level = levels[i % levels.length] ?? 0
      bar.style.transform = `scaleY(${(0.12 + Math.min(1, level * 1.25) * 0.88).toFixed(3)})`
    })
  }, [])

  const { live } = useAudioBeat(
    audio,
    isPlaying && !reduceMotion,
    paintLevels,
    5
  )

  // Al pausar, las barras vuelven a su altura de reposo
  useEffect(() => {
    if (isPlaying && !reduceMotion) return
    eqRef.current
      ?.querySelectorAll<SVGElement>('.eq-bar')
      .forEach(bar => (bar.style.transform = ''))
  }, [isPlaying, reduceMotion])

  const armOn = 'rotate(0deg)'
  const armOff = 'rotate(-38deg)'

  return (
    <div className="relative">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes almanac-eq {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
        .almanac-eq .eq-bar {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: scaleY(0.2);
          transition: transform 90ms linear;
        }
        .almanac-eq[data-mode=css][data-playing=true] .eq-bar {
          animation: almanac-eq 0.9s ease-in-out infinite;
        }
        .almanac-eq[data-mode=css] .eq-bar:nth-of-type(2) { animation-duration: 0.7s; animation-delay: -0.2s; }
        .almanac-eq[data-mode=css] .eq-bar:nth-of-type(3) { animation-duration: 1.1s; animation-delay: -0.5s; }
        .almanac-eq[data-mode=css] .eq-bar:nth-of-type(4) { animation-duration: 0.8s; animation-delay: -0.35s; }
        .almanac-eq[data-mode=css] .eq-bar:nth-of-type(5) { animation-duration: 1s; animation-delay: -0.1s; }
        @media (prefers-reduced-motion: reduce) {
          .almanac-eq .eq-bar { animation: none !important; transition: none; }
        }
      `,
        }}
      />

      {/* Plato */}
      <div className="relative aspect-square w-full border-2 border-ink bg-calipso p-[7%]">
        <SpinningVinyl
          spinning={isPlaying}
          period={2.2}
          className="h-full w-full text-ink [--accent:theme(colors.marker)] [--hole:theme(colors.calipso.DEFAULT)]"
        />

        {/* Brazo: pivota sobre su contrapeso (94,26 de 120x160) */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{
            transform: reduceMotion ? armOff : isPlaying ? armOn : armOff,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: SWING }}
          className="absolute right-[3%] top-[3%] h-[48%] w-[36%] text-paper"
          style={{ transformOrigin: '78.3% 16.25%' }}
        >
          <ToneArm className="h-full w-full" />
        </motion.div>
      </div>

      <div
        ref={eqRef}
        data-mode={live ? 'live' : 'css'}
        data-playing={isPlaying}
        className="almanac-eq mt-4 flex items-end gap-4 text-ink [--accent:theme(colors.calipso.deep)]"
      >
        <EqualizerBars className="h-14 w-24 md:h-16 md:w-28" />
      </div>
    </div>
  )
}
