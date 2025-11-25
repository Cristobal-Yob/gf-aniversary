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
    if (token && token.startsWith('couple_token_')) {
      // Restore user session
      setUser({
        id: 1,
        username: 'josefa',
        email: 'josefa@amor.com',
        full_name: 'Josefa',
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      // Hash simple para validación
      const hashPassword = (str: string) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i)
          hash = (hash << 5) - hash + char
          hash = hash & hash
        }
        return hash.toString()
      }

      const validUser = 'josefa'
      const validHash = '-1309015506' // hash de la contraseña

      if (
        username.toLowerCase() === validUser &&
        hashPassword(password) === validHash
      ) {
        setUser({
          id: 1,
          username: 'josefa',
          email: 'josefa@amor.com',
          full_name: 'Josefa',
        })
        localStorage.setItem('access_token', 'couple_token_' + hashPassword(password))
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
