"use client"

import { useState, useCallback } from "react"
import type { ChatMessage, ChatbotState, N8NWebhookResponse } from "@/types/chatbot"

const N8N_WEBHOOK_URL = "/api/chatbot"

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

  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

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

  const optionMap: Record<string, string> = {
    "Ver productos disponibles": "productos",
    "Consultar precios": "precios",
    "Hacer un pedido": "pedido",
    "Estado de mi solicitud": "estado",
    "Hablar con un humano": "soporte",
  }

  const sendToN8N = async (userMessage: string, context?: any): Promise<N8NWebhookResponse> => {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          context,
          timestamp: new Date().toISOString(),
          sessionId: `session_${Date.now()}`,
        }),
      })
      if (!response.ok) throw new Error("Error en la comunicación con N8N")
      const json = await response.json()
      return json
    } catch (error) {
      console.error("Error sending to N8N:", error)
      return {
        success: false,
        message:
          "Lo siento, hay un problema técnico. Por favor, intenta más tarde o contacta a nuestro equipo de soporte.",
      }
    }
  }

  // Agregamos el estado de contexto para evitar loops y dar contexto al backend
  const [context, setContext] = useState<any>(undefined)

  const sendMessage = useCallback(
    async (content: string) => {
      const mappedContent = optionMap[content] || content

      addMessage({ content, sender: "user", type: "text" })

      setTyping(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const n8nResponse = await sendToN8N(mappedContent, context)

        // Actualizamos contexto, evitando asignar null (error TS)
        setContext(n8nResponse.context ?? undefined)

        const productsNormalized = n8nResponse.products?.map((p: any) => ({
          NomProducto: p.nomproducto || p.NomProducto || "",
          marca: p.marca || "",
          PrecioUnitario: p.preciounitario || p.PrecioUnitario || 0,
          Stock: p.stock || p.Stock || 0,
          descripcion: p.descripcion || "",
          imagen: p.imagen || "",
        }))

        addMessage({
          content: n8nResponse.message,
          sender: "bot",
          type: productsNormalized
            ? "product"
            : n8nResponse.suggestions
            ? "options"
            : "text",
          data: {
            products: productsNormalized,
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
    [addMessage, setTyping, context]
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
      messages: [prev.messages[0]],
    }))
    setContext(undefined)
  }, [])

  return {
    chatState,
    sendMessage,
    openChat,
    closeChat,
    clearChat,
  }
}
