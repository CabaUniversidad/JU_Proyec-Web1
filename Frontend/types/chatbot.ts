export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "product" | "order" | "options"
  data?: any
}

export interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
  currentFlow?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export interface N8NWebhookResponse {
  success: boolean
  message: string
  data?: any
  suggestions?: string[]
  products?: Product[]
  nextAction?: string
}

export interface ChatbotIntent {
  intent: string
  confidence: number
  entities?: Record<string, any>
}
