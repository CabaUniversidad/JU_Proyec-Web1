"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, RotateCcw } from "lucide-react"
import { ChatMessage } from "./chat-message"
import { TypingIndicator } from "./typing-indicator"
import type { ChatMessage as ChatMessageType } from "@/types/chatbot"

interface ChatbotWindowProps {
  messages: ChatMessageType[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  onClearChat: () => void
}

export function ChatbotWindow({ messages, isTyping, onSendMessage, onClearChat }: ChatbotWindowProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleOptionClick = (option: string) => {
    onSendMessage(option)
  }

  return (
    <div className="flex flex-col h-80">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} onOptionClick={handleOptionClick} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" onClick={onClearChat} className="text-xs text-gray-500 hover:text-gray-700">
            <RotateCcw className="h-3 w-3 mr-1" />
            Limpiar chat
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 text-sm"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-9 w-9 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
