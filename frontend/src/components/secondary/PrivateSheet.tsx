'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { IconArrowRight, IconLock } from '@/components/icons'
import SheetHeader from './SheetHeader'
import { useReveal } from './motion'

interface PrivateSheetProps {
  title: string
  message: string
}

/** Hoja cerrada: lo que ve quien todavía no ha iniciado sesión */
export default function PrivateSheet({ title, message }: PrivateSheetProps) {
  const reveal = useReveal()

  return (
    <>
      <Navbar />
      <main className="pb-28 lg:flex lg:min-h-view lg:flex-col lg:pb-0">
        <SheetHeader label="Hoja cerrada" title={title}>
          <p>{message}</p>
        </SheetHeader>

        <section className="mx-auto w-full max-w-7xl px-4 pt-20 md:px-8 md:pt-28 lg:flex lg:flex-1 lg:items-center lg:py-10">
          <motion.div
            {...reveal(0.1)}
            className="flex w-full flex-col gap-6 border-y-2 border-ink py-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <IconLock className="h-12 w-12 shrink-0 md:h-16 md:w-16" />
            <Link
              href="/auth"
              className="btn-almanac group border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink"
            >
              Iniciar Sesión
              <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  )
}
