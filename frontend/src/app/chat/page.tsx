'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export default function ChatPage() {
  const { isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages([...messages, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simular respuesta de la IA (aquí irá la integración con OpenAI)
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content:
          '¡Qué lindo mensaje! 💕 Pronto estaré conectada con una IA real para responder mejor.',
        timestamp: new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
  }

  if (!isAuthenticated) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-secondary-50 to-primary-50">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 text-6xl">🔒</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Área Privada
            </h1>
            <p className="mb-8 text-gray-600">
              Necesitas iniciar sesión para chatear con nuestra IA
            </p>
            <Link
              href="/auth"
              className="inline-block rounded-full bg-primary-900 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-800"
            >
              Iniciar Sesión 💖
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-secondary-50 to-primary-50">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">💬</div>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-primary-900 via-primary-700 to-accent-600 bg-clip-text text-transparent">
              Chat con IA
            </span>
          </h1>
          <p className="text-xl text-secondary-600">
            Habla sobre nuestros recuerdos y momentos especiales
          </p>
        </div>

        {/* Chat Container */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {/* Messages */}
          <div className="h-[500px] space-y-4 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-900 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="mb-1">{message.content}</p>
                  <p
                    className={`text-xs ${
                      message.role === 'user'
                        ? 'text-primary-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-gray-100 p-4 text-gray-800">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="mb-2 text-sm text-gray-600">Preguntas sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm transition-colors hover:border-primary-600 hover:text-primary-900"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-6"
          >
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="rounded-full bg-primary-900 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-800 disabled:bg-primary-300"
              >
                Enviar 💌
              </button>
            </div>
          </form>
        </div>

        {/* OpenAI Integration Info */}
        <div className="mt-8 rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-4xl">🤖</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Próximamente: Integración con OpenAI
          </h2>
          <p className="mb-6 text-gray-600">
            Pronto esta IA estará conectada a GPT-4 para respuestas más
            inteligentes
          </p>
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-green-700">
              🤖 OpenAI GPT-4 integration coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content:
      '¡Hola! 💕 Soy tu asistente de IA. Puedo ayudarte a recordar momentos especiales de Cristóbal y Josefa. ¿Qué te gustaría saber?',
    timestamp: '10:00',
  },
]

const suggestedQuestions = [
  '¿Cuándo fue su primera cita?',
  'Cuéntame sobre sus canciones favoritas',
  '¿Qué juegos les gusta jugar juntos?',
  'Muéstrame fotos de viajes',
]
