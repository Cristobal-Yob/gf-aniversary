'use client'

import { useEffect, useState } from 'react'

export function useAudioBeat(audioElement: HTMLAudioElement | null) {
  const [beat, setBeat] = useState(false)
  const [bpm, setBpm] = useState(120) // BPM por defecto

  useEffect(() => {
    if (!audioElement) return

    let audioContext: AudioContext | null = null
    let analyser: AnalyserNode | null = null
    let source: MediaElementAudioSourceNode | null = null
    let animationFrame: number

    const initAudioAnalyzer = () => {
      try {
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)()
        analyser = audioContext.createAnalyser()
        source = audioContext.createMediaElementSource(audioElement)

        source.connect(analyser)
        analyser.connect(audioContext.destination)

        analyser.fftSize = 512
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        // Detectar beats
        let lastBeatTime = 0
        const beatThreshold = 200 // Umbral para detectar beat
        const minTimeBetweenBeats = 300 // Mínimo tiempo entre beats (ms)

        const detectBeat = () => {
          analyser!.getByteFrequencyData(dataArray)

          // Calcular energía de las frecuencias bajas (bass)
          const bassRange = Math.floor(bufferLength * 0.1)
          let bassEnergy = 0
          for (let i = 0; i < bassRange; i++) {
            bassEnergy += dataArray[i]
          }
          bassEnergy /= bassRange

          const now = Date.now()
          const timeSinceLastBeat = now - lastBeatTime

          // Si hay suficiente energía y ha pasado suficiente tiempo
          if (
            bassEnergy > beatThreshold &&
            timeSinceLastBeat > minTimeBetweenBeats
          ) {
            setBeat(true)
            lastBeatTime = now

            // Calcular BPM aproximado
            if (
              timeSinceLastBeat < 1000 &&
              timeSinceLastBeat > minTimeBetweenBeats
            ) {
              const newBpm = Math.round(60000 / timeSinceLastBeat)
              if (newBpm >= 60 && newBpm <= 200) {
                setBpm(newBpm)
              }
            }

            // Resetear beat después de un corto tiempo
            setTimeout(() => setBeat(false), 100)
          }

          animationFrame = requestAnimationFrame(detectBeat)
        }

        detectBeat()
      } catch (error) {
        console.error('Error initializing audio analyzer:', error)
      }
    }

    // Esperar a que el audio esté listo
    if (audioElement.readyState >= 2) {
      initAudioAnalyzer()
    } else {
      audioElement.addEventListener('loadeddata', initAudioAnalyzer)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (source) {
        source.disconnect()
      }
      if (analyser) {
        analyser.disconnect()
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [audioElement])

  return { beat, bpm }
}
