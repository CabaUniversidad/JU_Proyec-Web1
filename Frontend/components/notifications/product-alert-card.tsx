"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import type { ProductAlert } from "@/types/notifications"
import { formatPrice } from "@/utils/product-helpers"

interface ProductAlertCardProps {
  alert: ProductAlert
  onViewProduct?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

export function ProductAlertCard({ alert, onViewProduct, onAddToCart }: ProductAlertCardProps) {
  return (
    <Card className="border-green-200 bg-green-50 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Icono de nuevo */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Imagen del producto */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-white rounded-lg border border-green-200 overflow-hidden">
              {alert.productImage ? (
                <Image
                  src={alert.productImage || "/placeholder.svg"}
                  alt={alert.productName}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ShoppingCart className="h-6 w-6" />
                </div>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-green-600 text-white text-xs">¡NUEVO!</Badge>
              {alert.category && (
                <Badge variant="outline" className="text-xs">
                  {alert.category}
                </Badge>
              )}
            </div>

            <h4 className="font-semibold text-green-900 truncate">{alert.productName}</h4>

            <div className="flex items-center justify-between mt-2">
              {alert.price && <span className="text-sm font-medium text-green-800">{formatPrice(alert.price)}</span>}

              <span className="text-xs text-green-600">
                Agregado hace {Math.floor((Date.now() - alert.addedAt.getTime()) / 60000)} min
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              onClick={() => onViewProduct?.(alert.productId)}
              className="h-8 bg-green-600 hover:bg-green-700 text-white"
            >
              <Eye className="h-3 w-3 mr-1" />
              Ver
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddToCart?.(alert.productId)}
              className="h-8 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Agregar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
