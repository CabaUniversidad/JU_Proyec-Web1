// types/chatbot.ts

export interface ChatMessage {
  id: string
  content: string
  sender: "bot" | "user"
  timestamp: Date
  type: "text" | "options" | "product"
  data?: {
    options?: string[]
    products?: Product[]
    nextAction?: string
  }
}

export interface Product {
  NomProducto: string
  marca: string
  PrecioUnitario: number
  Stock: number
  descripcion?: string
  imagen?: string
}

export interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
}

export interface N8NWebhookResponse {
  success?: boolean
  message: string
  suggestions?: string[]
  nextAction?: string
  products?: any[]
  context?: any  
}
