"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"

interface MOTDBannerProps {
  message: string
  link?: string
  linkText?: string
  isDismissible?: boolean
  autoHide?: boolean
  hideAfter?: number
  onDismiss?: () => void
}

export function MOTDBanner({
  message,
  link,
  linkText = "Ver más",
  isDismissible = true,
  autoHide = false,
  hideAfter = 10000,
  onDismiss,
}: MOTDBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoHide && hideAfter) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, hideAfter)

      return () => clearTimeout(timer)
    }
  }, [autoHide, hideAfter, onDismiss])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 shadow-sm">
      <Sparkles className="h-4 w-4 text-green-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">Mensaje:</span>
          <span>{message}</span>
        </div>

        <div className="flex items-center gap-2">
          {link && (
            <Link href={link}>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                {linkText}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          )}

          {isDismissible && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="h-7 w-7 p-0 text-green-600 hover:bg-green-100"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
