'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BindingRings } from '@/components/illustrations'
import { IconCalendar } from '@/components/icons'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, requireAuth, router])

  // Hoja en blanco mientras se comprueba la sesión
  if (isLoading) {
    return (
      <div
        role="status"
        className="flex min-h-view flex-col bg-calipso text-ink"
      >
        <BindingRings className="h-8 w-full text-ink md:h-10" />
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4">
          <IconCalendar className="h-14 w-14 motion-safe:animate-pulse" />
          <p className="font-display text-2xl font-semibold uppercase tracking-wide">
            Cargando...
          </p>
        </div>
      </div>
    )
  }

  // If auth is required but user is not authenticated, show nothing (will redirect)
  if (requireAuth && !isAuthenticated) {
    return null
  }

  return <>{children}</>
}
