'use client'

import { useEffect, useState } from 'react'

// Se construye en tiempo de ejecución: el target es5 de TypeScript no acepta la bandera "u" literal
const EMOJI = new RegExp(
  '[\\u{1F1E6}-\\u{1F1FF}]|\\p{Extended_Pictographic}|\\uFE0F|\\u200D',
  'gu'
)

/** Quita los emoji que aún quedan en los textos del contenido */
export function plainText(text: string) {
  return text.replace(EMOJI, '').replace(/\s{2,}/g, ' ').trim()
}

/** Ilustración risográfica de cada categoría ("all" no tiene) */
export function illustrationFor(categoryId: string) {
  if (categoryId === 'all') return null
  const file = categoryId.normalize('NFD').replace(/[̀-ͯ]/g, '')
  return `/illustrations/${file}.webp`
}

/** Identificador compartido entre la copia y la foto ampliada */
export function photoLayoutId(src: string) {
  return `photo-${src}`
}

/** Devuelve si la media query coincide; false durante el prerender */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])

  return matches
}
