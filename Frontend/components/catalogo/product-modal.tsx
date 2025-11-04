"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import * as Dialog from "@radix-ui/react-dialog" // Usamos el namespace para evitar conflictos
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import type { Product } from "@/types/product"
import { getCategoryBadge, formatPrice } from "@/utils/product-helpers"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onToggleFavorite: (productId: string) => void
  onAddToCart: (productId: string, quantity: number) => void
  isFavorite: boolean
}

export function ProductModal({
  isOpen,
  onClose,
  product,
  onToggleFavorite,
  onAddToCart,
  isFavorite,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product.idProd, quantity)
    onClose()
  }

  const badge = getCategoryBadge(product.categoria)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-2xl w-full max-h-[90vh] overflow-auto bg-white border border-gray-200 text-gray-900 rounded-md p-6 shadow-lg -translate-x-1/2 -translate-y-1/2">
          {/* Aquí va el Dialog.Title para accesibilidad */}
          <Dialog.Title className="text-2xl font-bold mb-4">{product.NomProducto}</Dialog.Title>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Imagen del producto */}
            <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-6xl font-bold text-yellow-500 opacity-30">OFFICE</div>
            </div>

            {/* Detalles del producto */}
            <div className="space-y-4">
              <Badge className={badge.className}>{badge.text}</Badge>
              <p className="text-gray-600">Marca: {product.marca}</p>

              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">{formatPrice(product.PrecioUnitario)}</p>
                <button
                  onClick={() => onToggleFavorite(product.idProd)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`} />
                </button>
              </div>

              <p className="text-gray-700">{product.Descripcion}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 border-gray-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 border-gray-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar al carrito
              </Button>
            </div>
          </div>
          <Dialog.Close className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" aria-label="Cerrar">
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
