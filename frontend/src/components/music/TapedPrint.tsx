import Image from 'next/image'
import { TapeStrip } from '@/components/illustrations/extra'

interface TapedPrintProps {
  src: string
  alt: string
  width: number
  height: number
  rotate?: number
  className?: string
}

/**
 * Una foto pequeña pegada con cinta. La imagen original es de baja resolución:
 * se muestra a 1x en el teléfono y a 1.25x desde `sm`, con píxeles nítidos.
 */
export default function TapedPrint({
  src,
  alt,
  width,
  height,
  rotate = -3,
  className = '',
}: TapedPrintProps) {
  return (
    <figure
      className={`relative inline-block bg-paper p-2 pb-1 shadow-[0_18px_36px_-14px_rgba(15,17,21,0.45)] [--accent:theme(colors.marker)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <TapeStrip className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3" />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="block h-auto w-[236px] max-w-full sm:w-[295px]"
        style={{ imageRendering: 'pixelated' }}
      />
      <figcaption className="max-w-[236px] px-0.5 pt-1.5 font-hand text-xl leading-tight text-calipso-deep sm:max-w-[295px] sm:text-2xl">
        {alt}
      </figcaption>
    </figure>
  )
}
