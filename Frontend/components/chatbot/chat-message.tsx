"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, ShoppingCart } from "lucide-react"
import type { ChatMessage as ChatMessageType } from "@/types/chatbot"
import { formatPrice } from "@/utils/product-helpers"

interface ChatMessageProps {
  message: ChatMessageType
  onOptionClick: (option: string) => void
}

export function ChatMessage({ message, onOptionClick }: ChatMessageProps) {
  const isBot = message.sender === "bot"

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`flex items-start gap-2 max-w-[80%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
            isBot ? "bg-blue-600 text-white" : "bg-gray-600 text-white"
          }`}
        >
          {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
          <div
            className={`rounded-lg px-3 py-2 max-w-full ${
              isBot ? "bg-white border border-gray-200 text-gray-900" : "bg-blue-600 text-white"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Options */}
          {message.type === "options" && message.data?.options && (
            <div className="mt-2 space-y-1 w-full">
              {message.data.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onOptionClick(option)}
                  className="w-full text-left justify-start text-xs hover:bg-blue-50"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {/* Products */}
          {message.type === "product" && message.data?.products && (
            <div className="mt-2 space-y-2 w-full">
              {message.data.products.slice(0, 3).map((product: any, index: number) => (
                <Card key={index} className="w-full">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{product.NomProducto}</h4>
                        <p className="text-xs text-gray-600 truncate">{product.marca}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {formatPrice(product.PrecioUnitario)}
                          </Badge>
                          <span className="text-xs text-gray-500">Stock: {product.Stock}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2 text-xs"
                      onClick={() => onOptionClick(`Ver detalles de ${product.NomProducto}`)}
                    >
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {message.data.products.length > 3 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOptionClick("Ver todos los productos")}
                  className="w-full text-xs"
                >
                  Ver {message.data.products.length - 3} productos más
                </Button>
              )}
            </div>
          )}

          {/* Timestamp */}
          <span className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  )
}
