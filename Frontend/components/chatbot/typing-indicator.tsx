"use client"

import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-2 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white">
          <Bot className="h-4 w-4" />
        </div>

        {/* Typing Animation */}
        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">Escribiendo...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
