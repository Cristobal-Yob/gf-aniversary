'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  username: string
  email: string
  full_name?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('access_token')
    if (token === 'couple_token_2024') {
      // Restore user session
      setUser({
        id: 1,
        username: 'cristobal-josefa',
        email: 'cristobal.josefa@amor.com',
        full_name: 'Cristóbal & Josefa',
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      // Credenciales únicas para la pareja
      const validCredentials = {
        username: 'cristobal-josefa',
        password: 'nuestroamor2024',
      }

      if (
        username === validCredentials.username &&
        password === validCredentials.password
      ) {
        setUser({
          id: 1,
          username: 'cristobal-josefa',
          email: 'cristobal.josefa@amor.com',
          full_name: 'Cristóbal & Josefa',
        })
        localStorage.setItem('access_token', 'couple_token_2024')
        router.push('/')
      } else {
        throw new Error('Credenciales incorrectas')
      }
    } catch (error) {
      throw new Error('Usuario o contraseña incorrectos')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('access_token')
    router.push('/')
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
