"use client"

import { useState, useCallback } from "react"
import type { ChatMessage, ChatbotState, N8NWebhookResponse } from "@/types/chatbot"

//const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/chatbot" // Reemplaza con tu URL de N8N
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/chatbot"

export function useChatbot() {
  const [chatState, setChatState] = useState<ChatbotState>({
    isOpen: false,
    messages: [
      {
        id: "welcome",
        content: "¡Hola! Soy el asistente virtual de OfficeSupply. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date(),
        type: "options",
        data: {
          options: [
            "Ver productos disponibles",
            "Consultar precios",
            "Hacer un pedido",
            "Estado de mi solicitud",
            "Hablar con un humano",
          ],
        },
      },
    ],
    isTyping: false,
  })

  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const addMessage = useCallback((message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: generateMessageId(),
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))

    return newMessage
  }, [])

  const setTyping = useCallback((isTyping: boolean) => {
    setChatState((prev) => ({ ...prev, isTyping }))
  }, [])

  const sendToN8N = async (userMessage: string, context?: any): Promise<N8NWebhookResponse> => {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: context,
          timestamp: new Date().toISOString(),
          sessionId: `session_${Date.now()}`, // En producción, usar un ID de sesión persistente
        }),
      })

      if (!response.ok) {
        throw new Error("Error en la comunicación con N8N")
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending to N8N:", error)
      return {
        success: false,
        message:
          "Lo siento, hay un problema técnico. Por favor, intenta más tarde o contacta a nuestro equipo de soporte.",
      }
    }
  }

  const sendMessage = useCallback(
    async (content: string, context?: any) => {
      // Agregar mensaje del usuario
      addMessage({
        content,
        sender: "user",
        type: "text",
      })

      // Mostrar indicador de escritura
      setTyping(true)

      try {
        // Simular delay de respuesta
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Enviar a N8N y obtener respuesta
        const n8nResponse = await sendToN8N(content, context)

        // Agregar respuesta del bot
        addMessage({
          content: n8nResponse.message,
          sender: "bot",
          type: n8nResponse.products ? "product" : n8nResponse.suggestions ? "options" : "text",
          data: {
            products: n8nResponse.products,
            options: n8nResponse.suggestions,
            nextAction: n8nResponse.nextAction,
          },
        })
      } catch (error) {
        addMessage({
          content: "Lo siento, hubo un error. Por favor, intenta nuevamente.",
          sender: "bot",
          type: "text",
        })
      } finally {
        setTyping(false)
      }
    },
    [addMessage, setTyping],
  )

  const openChat = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: true }))
  }, [])

  const closeChat = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const clearChat = useCallback(() => {
    setChatState((prev) => ({
      ...prev,
      messages: [prev.messages[0]], // Mantener solo el mensaje de bienvenida
    }))
  }, [])

  return {
    chatState,
    sendMessage,
    openChat,
    closeChat,
    clearChat,
  }
}
