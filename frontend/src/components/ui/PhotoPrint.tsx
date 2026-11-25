import Image from 'next/image'

interface PhotoPrintProps {
  src: string
  alt: string
  caption: string
  date?: string
  sizes: string
  priority?: boolean
}

/** Copia fotográfica con borde de papel y pie fechado */
export default function PhotoPrint({
  src,
  alt,
  caption,
  date,
  sizes,
  priority = false,
}: PhotoPrintProps) {
  return (
    <figure className="bg-paper p-1.5 shadow-[0_22px_44px_-14px_rgba(15,17,21,0.5)] sm:p-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-rule">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-2 px-0.5 pb-0.5 pt-2 font-display text-xs font-semibold uppercase tracking-wide text-ink sm:text-sm">
        <span>{caption}</span>
        {date && <span className="text-dim">{date}</span>}
      </figcaption>
    </figure>
  )
}
