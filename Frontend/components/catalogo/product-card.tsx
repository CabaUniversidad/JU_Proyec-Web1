"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Package } from "lucide-react"
import type { Product } from "@/types/product"
import { getCategoryBadge, formatPrice } from "@/utils/product-helpers"

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (productId: string) => void
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
}

export function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onProductClick }: ProductCardProps) {
  // Aseguramos que la categoría exista para no mandar undefined
  const badge = getCategoryBadge(product.categoria ?? undefined)

  return (
    <Card className="bg-white border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <div
          className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          {product.Imagen ? (
            <Image
              src={product.Imagen}
              alt={product.NomProducto ?? "Producto"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          ) : (
            <div className="text-center text-white">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <span className="text-sm opacity-75">Vista no Disponible</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onToggleFavorite(product.idProd)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          type="button"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "text-red-500 fill-current" : "text-white"}`} />
        </button>

        <Badge className={`absolute top-3 left-3 ${badge.className}`}>{badge.text}</Badge>

        {product.Stock !== undefined && product.Stock <= 5 && product.Stock > 0 && (
          <Badge className="absolute bottom-3 left-3 bg-orange-600 text-white">Productos Disponibles: {product.Stock}</Badge>
        )}

        {product.Stock === 0 && (
          <Badge className="absolute bottom-3 left-3 bg-red-600 text-white">Producto Agotado</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.NomProducto}</h3>
        </div>

        <div className="space-y-1 mb-3">
          <p className="text-2xl font-bold text-gray-900">{formatPrice(product.PrecioUnitario)}</p>
          {product.PrecioMayor !== undefined &&
          product.PrecioMayor !== product.PrecioUnitario && (
            <p className="text-sm text-gray-600">Precio mayor: {formatPrice(product.PrecioMayor)}</p>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.Descripcion ?? "Sin descripción"}</p>
        <p className="text-gray-500 text-xs mb-2">Marca: {product.marca ?? "No especificada"}</p>
        <p className="text-gray-500 text-xs mb-4">Stock disponible: {product.Stock ?? 0}</p>

        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          disabled={product.Stock === 0}
          type="button"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.Stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </Button>
      </CardContent>
    </Card>
  )
}
