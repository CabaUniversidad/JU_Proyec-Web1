"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Minimize2 } from "lucide-react"
import { ChatbotWindow } from "./chatbot-window"
import { useChatbot } from "@/hooks/use-chatbot"

export function ChatbotWidget() {
  const { chatState, sendMessage, openChat, closeChat, clearChat } = useChatbot()
  const [isMinimized, setIsMinimized] = useState(false)

  if (!chatState.isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </Button>

        {/* Indicador de nuevo mensaje (opcional) */}
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">!</span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? "h-16 w-80" : "h-96 w-80 md:w-96"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Asistente OfficeSupply</h3>
              <p className="text-xs opacity-90">En línea</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-white hover:bg-blue-500"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={closeChat} className="h-8 w-8 text-white hover:bg-blue-500">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Window */}
        {!isMinimized && (
          <ChatbotWindow
            messages={chatState.messages}
            isTyping={chatState.isTyping}
            onSendMessage={sendMessage}
            onClearChat={clearChat}
          />
        )}
      </div>
    </div>
  )
}
