'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioGraph {
  context: AudioContext
  analyser: AnalyserNode
}

// Un elemento <audio> solo admite un MediaElementSource en toda su vida, y una vez
// conectado su sonido pasa por el grafo. Por eso el grafo se crea una sola vez por
// elemento y nunca se desconecta: desconectarlo dejaría la música en silencio.
const graphs = new WeakMap<HTMLAudioElement, AudioGraph>()
const pending = new WeakMap<HTMLAudioElement, Promise<AudioGraph | null>>()

async function getGraph(audio: HTMLAudioElement): Promise<AudioGraph | null> {
  const existing = graphs.get(audio)
  if (existing) return existing
  const inFlight = pending.get(audio)
  if (inFlight) return inFlight

  const attempt = (async () => {
    const AudioContextClass =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AudioContextClass) return null

    let context: AudioContext
    try {
      context = new AudioContextClass()
    } catch {
      return null
    }

    // Si el navegador no deja arrancar el contexto, conectar el audio lo silenciaría.
    // En ese caso no se toca el elemento y el ecualizador queda en modo CSS.
    await Promise.race([
      context.resume().catch(() => undefined),
      new Promise(resolve => setTimeout(resolve, 600)),
    ])
    if (context.state !== 'running') {
      context.close().catch(() => undefined)
      return null
    }

    try {
      const source = context.createMediaElementSource(audio)
      const analyser = context.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.78
      source.connect(analyser)
      analyser.connect(context.destination)
      const graph = { context, analyser }
      graphs.set(audio, graph)
      return graph
    } catch {
      context.close().catch(() => undefined)
      return null
    }
  })()

  pending.set(audio, attempt)
  const graph = await attempt
  pending.delete(audio)
  return graph
}

/**
 * Lee el nivel real del audio en `bands` bandas (0 a 1) mientras `active` es verdadero
 * y se lo entrega a `onLevels` en cada cuadro, sin pasar por el estado de React.
 * Devuelve `live: false` cuando el navegador no puede analizar el audio.
 */
export function useAudioBeat(
  audio: HTMLAudioElement | null,
  active: boolean,
  onLevels: (levels: number[]) => void,
  bands = 5
) {
  const [live, setLive] = useState(false)
  const onLevelsRef = useRef(onLevels)
  onLevelsRef.current = onLevels

  useEffect(() => {
    if (!audio || !active) return

    let cancelled = false
    let frame = 0

    getGraph(audio).then(graph => {
      if (cancelled) return
      if (!graph) {
        setLive(false)
        return
      }
      setLive(true)

      const data = new Uint8Array(graph.analyser.frequencyBinCount)
      // Bandas logarítmicas: los graves ocupan pocos bins y mucha energía
      const usable = Math.floor(data.length * 0.7)
      const edges = Array.from({ length: bands + 1 }, (_, i) =>
        Math.max(1, Math.round(Math.pow(usable, i / bands)))
      )

      const tick = () => {
        graph.analyser.getByteFrequencyData(data)
        const levels: number[] = []
        for (let b = 0; b < bands; b++) {
          const start = edges[b] - 1
          const end = Math.max(edges[b + 1], start + 1)
          let sum = 0
          for (let i = start; i < end; i++) sum += data[i]
          levels.push(sum / (end - start) / 255)
        }
        onLevelsRef.current(levels)
        frame = requestAnimationFrame(tick)
      }
      tick()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [audio, active, bands])

  return { live }
}
