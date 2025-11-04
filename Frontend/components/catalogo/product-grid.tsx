"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  activeTab: "productos" | "favoritos"
  onTabChange: (tab: "productos" | "favoritos") => void
  onToggleFavorite: (productId: string) => void
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
  favoriteProductIds: string[]
}

export function ProductGrid({
  products,
  activeTab,
  onTabChange,
  onToggleFavorite,
  onAddToCart,
  onProductClick,
  favoriteProductIds,
}: ProductGridProps) {
  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50">
      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
        <Button
          variant={activeTab === "productos" ? "default" : "outline"}
          onClick={() => onTabChange("productos")}
          className={
            activeTab === "productos"
              ? "bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm"
              : "border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
          }
        >
          Lista de Productos
        </Button>
        <Button
          variant={activeTab === "favoritos" ? "default" : "outline"}
          onClick={() => onTabChange("favoritos")}
          className={
            activeTab === "favoritos"
              ? "bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm"
              : "border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
          }
        >
          Sección de Favoritos
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.idProd}
            product={product}
            isFavorite={favoriteProductIds.includes(product.idProd)}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No se encontraron productos</p>
          <p className="text-gray-500 text-sm mt-2">
            {activeTab === "favoritos"
              ? "No tienes productos favoritos aún"
              : "Intenta ajustar tus filtros de búsqueda"}
          </p>
        </div>
      )}
    </div>
  )
}
