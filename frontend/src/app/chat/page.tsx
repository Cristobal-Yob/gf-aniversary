'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { IconArrowRight, IconChat } from '@/components/icons'
import PrivateSheet from '@/components/secondary/PrivateSheet'
import SheetHeader from '@/components/secondary/SheetHeader'
import { useReveal } from '@/components/secondary/motion'
import { EASE_OUT } from '@/lib/site'

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
  const reduceMotion = useReducedMotion()
  const reveal = useReveal()
  const logRef = useRef<HTMLDivElement>(null)

  // Mantener visible el último mensaje
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, isLoading])

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
          '¡Qué lindo mensaje! Pronto estaré conectada con una IA real para responder mejor.',
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
      <PrivateSheet
        title="Área Privada"
        message="Necesitas iniciar sesión para chatear con nuestra IA"
      />
    )
  }

  const rowMotion = (fromRight: boolean) => ({
    initial: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          transform: `translateX(${fromRight ? 16 : -16}px)`,
        },
    animate: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, transform: 'translateX(0px)' },
    transition: { duration: 0.45, ease: EASE_OUT },
  })

  return (
    <>
      <Navbar />

      <main>
        <SheetHeader label="Chat" title="Chat con IA">
          <p>Habla sobre nuestros recuerdos y momentos especiales</p>
        </SheetHeader>

        <section className="px-4 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
          <motion.div
            {...reveal()}
            className="mx-auto max-w-4xl border-2 border-ink"
          >
            {/* Mensajes */}
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              className="h-[min(500px,60svh)] overflow-y-auto"
            >
              {messages.map((message, index) => {
                const isUser = message.role === 'user'
                return (
                  <motion.div
                    key={index}
                    {...rowMotion(isUser)}
                    className={`flex border-b border-rule px-4 py-4 md:px-6 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 md:max-w-[70%] ${
                        isUser
                          ? 'bg-calipso text-ink'
                          : 'border-2 border-ink bg-paper text-ink'
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p
                        className={`mt-1 font-display text-sm font-semibold uppercase tracking-wide tabular-nums ${
                          isUser ? 'text-calipso-shade' : 'text-dim'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>
                )
              })}

              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start px-4 py-4 md:px-6"
                  >
                    <div
                      role="status"
                      aria-label="Escribiendo"
                      className="flex gap-2 border-2 border-ink bg-paper px-4 py-4"
                    >
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="h-2 w-2 bg-ink motion-safe:animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Preguntas sugeridas */}
            <div className="border-t-2 border-ink px-4 py-4 md:px-6">
              <p className="mb-3 font-display text-lg font-semibold uppercase tracking-wide">
                Preguntas sugeridas:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map(question => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleSuggestedQuestion(question)}
                    className="border-2 border-ink px-3 py-1.5 text-left text-sm transition-colors duration-200 hover:bg-marker"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSendMessage}
              className="flex flex-col gap-3 border-t-2 border-ink p-4 sm:flex-row md:p-6"
            >
              <label htmlFor="chat-message" className="sr-only">
                Escribe tu mensaje...
              </label>
              <input
                id="chat-message"
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="w-full flex-1 border-2 border-ink bg-paper px-4 py-3.5 text-base placeholder:text-dim focus:border-calipso-deep focus:outline-none focus:ring-0"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="btn-almanac group border-ink bg-ink text-paper hover:border-calipso hover:bg-calipso hover:text-ink disabled:cursor-not-allowed disabled:border-rule disabled:bg-rule disabled:text-dim"
              >
                Enviar
                <IconArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>

          {/* Aviso de integración con OpenAI */}
          <motion.aside
            {...reveal(0.1)}
            className="mx-auto mt-14 grid max-w-4xl gap-4 border-y-2 border-ink py-6 sm:grid-cols-[auto_1fr] sm:gap-6"
          >
            <IconChat className="h-10 w-10 text-calipso-deep" />
            <div>
              <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.9] md:text-4xl">
                Próximamente: Integración con OpenAI
              </h2>
              <p className="mt-3 text-base text-dim md:text-lg">
                Pronto esta IA estará conectada a GPT-4 para respuestas más
                inteligentes
              </p>
              <p className="mt-4 border-t border-rule pt-3 font-display text-base font-semibold uppercase tracking-wide">
                OpenAI GPT-4 integration coming soon...
              </p>
            </div>
          </motion.aside>
        </section>
      </main>

      <div className="h-28 bg-ink" aria-hidden />
    </>
  )
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content:
      '¡Hola! Soy tu asistente de IA. Puedo ayudarte a recordar momentos especiales de Cristóbal y Josefa. ¿Qué te gustaría saber?',
    timestamp: '10:00',
  },
]

const suggestedQuestions = [
  '¿Cuándo fue su primera cita?',
  'Cuéntame sobre sus canciones favoritas',
  '¿Qué juegos les gusta jugar juntos?',
  'Muéstrame fotos de viajes',
]
