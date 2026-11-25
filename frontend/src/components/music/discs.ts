import { discs, type Disc, type Track } from '@/content/playlist'

/** Color de la etiqueta del vinilo por disco (clases literales para Tailwind) */
export const discAccent: Record<Track['disc'], string> = {
  1: '[--accent:theme(colors.marker)]',
  2: '[--accent:theme(colors.calipso.DEFAULT)]',
}

export interface DiscGroup {
  disc: Disc
  tracks: Track[]
}

/** Agrupa la lista en el orden de `discs`, sin discos vacíos */
export function groupByDisc(list: Track[]): DiscGroup[] {
  return discs
    .map(disc => ({ disc, tracks: list.filter(t => t.disc === disc.id) }))
    .filter(group => group.tracks.length > 0)
}

/** "Disco 2 · 03 / 09" para la canción actual */
export function discPosition(track: Track, list: Track[]) {
  const sameDisc = list.filter(t => t.disc === track.disc)
  const index = sameDisc.findIndex(t => t.id === track.id)
  const disc = discs.find(d => d.id === track.disc)
  return {
    title: disc?.title ?? '',
    number: index + 1,
    total: sameDisc.length,
  }
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
