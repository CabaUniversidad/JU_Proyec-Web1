"use client"
import { Heart, Grid3X3, Star, ChevronDown, ChevronRight, Plus } from "lucide-react"
import type { Product } from "@/types/product" // o la ruta donde tengas estas interfaces

interface SidebarProps {
  products: Product[]
  favoriteProducts: Product[]
  showSidebar: boolean
  isProductListExpanded: boolean
  isFavoritesExpanded: boolean
  onProductListToggle: () => void
  onFavoritesToggle: () => void
  onToggleFavorite: (productId: string) => void // idProd es string
  onProductSelect: (product: Product) => void
}

export function Sidebar({
  products,
  favoriteProducts,
  showSidebar,
  isProductListExpanded,
  isFavoritesExpanded,
  onProductListToggle,
  onFavoritesToggle,
  onToggleFavorite,
  onProductSelect,
}: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:shadow-none md:w-64 md:border-r md:border-gray-200`}
    >
      <div className="p-6 space-y-6">
        {/* Lista de Productos */}
        <div>
          <button
            onClick={onProductListToggle}
            className="flex items-center gap-2 w-full text-left text-lg font-semibold mb-4 hover:text-blue-600 transition-colors text-gray-900"
          >
            {/* Icono */}
            <Grid3X3 className="h-4 w-4" />
            Lista de Productos
            {isProductListExpanded ? (
              <ChevronDown className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>

          {isProductListExpanded && (
            <div className="space-y-2">
              {products.length === 0 ? (
                <p className="text-gray-500 text-sm px-3 py-2">No hay productos disponibles</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.idProd}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => onToggleFavorite(product.idProd)}
                        className="flex-shrink-0"
                        aria-label={product.Estado ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        <Heart
                          className={`h-4 w-4 ${product.Estado ? "text-red-500 fill-current" : "text-gray-400"}`}
                        />
                      </button>
                      <span className="text-sm truncate text-gray-700">{product.NomProducto}</span>
                    </div>
                    <button
                      onClick={() => onProductSelect(product)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label={`Agregar ${product.NomProducto} al pedido`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Sección de Favoritos */}
        <div>
          <button
            onClick={onFavoritesToggle}
            className="flex items-center gap-2 w-full text-left text-lg font-semibold mb-4 hover:text-blue-600 transition-colors text-gray-900"
          >
            <Star className="h-4 w-4" />
            Sección de Favoritos
            {isFavoritesExpanded ? (
              <ChevronDown className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>

          {isFavoritesExpanded && (
            <div className="space-y-2">
              {favoriteProducts.length === 0 ? (
                <p className="text-gray-500 text-sm px-3 py-2">No tiene productos favoritos</p>
              ) : (
                favoriteProducts.map((product) => (
                  <div
                    key={product.idProd}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => onToggleFavorite(product.idProd)}
                        className="flex-shrink-0"
                        aria-label={product.Estado ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                      </button>
                      <span className="text-sm truncate text-gray-700">{product.NomProducto}</span>
                    </div>
                    <button
                      onClick={() => onProductSelect(product)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label={`Agregar ${product.NomProducto} al pedido`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
