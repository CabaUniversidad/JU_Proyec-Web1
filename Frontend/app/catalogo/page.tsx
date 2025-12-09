"use client"

import { useState } from "react"
import { useSupabaseProducts } from "@/hooks/use-supabase-products"
import { useSupabaseCart } from "@/hooks/use-supabase-cart"
import { useNotifications } from "@/hooks/use-notifications"
import { Header } from "@/components/catalogo/header"
import { QuickActions } from "@/components/catalogo/quick-actions"
import { Sidebar } from "@/components/catalogo/sidebar"
import { ProductGrid } from "@/components/catalogo/product-grid"
import { CartModal } from "@/components/catalogo/cart-modal"
import { FiltersModal } from "@/components/catalogo/filters-modal"
import { ProductModal } from "@/components/catalogo/product-modal"
import { BannerSystem } from "@/components/notifications/banner-system"
import { ProductAlertCard } from "@/components/notifications/product-alert-card"
import type { Product } from "@/types/product"
import { Footer } from "@/components/shared/footer"

// Función para obtener mensaje seguro del error
function getErrorMessage(error: unknown): string {
  if (!error) return "Error desconocido"
  if (typeof error === "string") return error
  if (error instanceof Error) return error.message
  try {
    return String(error)
  } catch {
    return "Error desconocido"
  }
}

export default function CatalogoPage() {
  // Estados de UI
  const [showCart, setShowCart] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isProductListExpanded, setIsProductListExpanded] = useState(true)
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true)

  // Custom hooks
  const {
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    submitOrder,
    loading: cartLoading,
  } = useSupabaseCart()

  const {
    products,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    activeTab,
    setActiveTab,
    filteredProducts,
    favoriteProducts,
    toggleFavorite,
  } = useSupabaseProducts()

  const { banners, newProductAlerts, dismissBanner, createNotification } = useNotifications()

  // Handlers
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const handleAddToCart = (product: Product, quantity = 1) => {
    addToCart(product, quantity)

    createNotification({
      type: "new_product",
      title: "Producto agregado al carrito",
      message: `${product.NomProducto} ha sido agregado a tu carrito`,
      productId: product.idProd,
      productName: product.NomProducto ?? undefined,
      priority: "low",
      isActive: true,
      startDate: new Date(),
    })
  }

  const handleViewProductFromAlert = (productId: string) => {
    const product = products.find((p) => p.idProd === productId)
    if (product) {
      handleProductSelect(product)
    }
  }

  const handleAddToCartFromAlert = (productId: string) => {
    const product = products.find((p) => p.idProd === productId)
    if (product) {
      handleAddToCart(product)
    }
  }

  const handleApplyFilters = () => {
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    const maxPrice = Math.max(...products.map((p) => p.PrecioUnitario ?? 0), 10000)
    setFilters({ categories: [], brands: [], priceRange: [0, maxPrice] })
  }

  // Marcas únicas filtrando nulls
  const uniqueBrands = [...new Set(products.map((p) => p.marca).filter((b): b is string => !!b))]

  const maxPrice = Math.max(...products.map((p) => p.PrecioUnitario ?? 0), 10000)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4 font-semibold">Error: {getErrorMessage(error)}</p>
          <pre className="text-xs text-gray-700 bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="px-4 sm:px-6 md:px-8 pt-4">
        <BannerSystem banners={banners} onDismiss={dismissBanner} />
      </div>

      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalItems={getTotalItems()}
        onCartClick={() => setShowCart(true)}
        onFiltersClick={() => setShowFilters(true)}
        onSidebarToggle={() => setShowSidebar(!showSidebar)}
        showSidebar={showSidebar}
      />

      {newProductAlerts.length > 0 && (
        <div className="px-4 sm:px-6 md:px-8 py-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🎉 ¡Nuevos productos disponibles!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newProductAlerts.map((alert) => (
              <ProductAlertCard
                key={alert.productId}
                alert={alert}
                onViewProduct={handleViewProductFromAlert}
                onAddToCart={handleAddToCartFromAlert}
              />
            ))}
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 md:px-8">
        <QuickActions />
      </div>

      <div className="flex flex-col md:flex-row">
        <Sidebar
          products={products}
          favoriteProducts={favoriteProducts}
          showSidebar={showSidebar}
          isProductListExpanded={isProductListExpanded}
          isFavoritesExpanded={isFavoritesExpanded}
          onProductListToggle={() => setIsProductListExpanded(!isProductListExpanded)}
          onFavoritesToggle={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
          onToggleFavorite={toggleFavorite}
          onProductSelect={handleProductSelect}
        />

        <ProductGrid
          products={filteredProducts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onToggleFavorite={toggleFavorite}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductSelect}
          favoriteProductIds={favoriteProducts.map((p) => p.idProd)}
        />
      </div>

      <CartModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onSubmitOrder={submitOrder}
        totalPrice={getTotalPrice()}
        loading={cartLoading}
      />

      <FiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        categories={categories}
        brands={uniqueBrands}
        maxPrice={maxPrice}
      />

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
        onToggleFavorite={toggleFavorite}
        onAddToCart={(productId, quantity) => {
          const product = products.find((p) => p.idProd === productId)
          if (product) addToCart(product, quantity)
        }}
        isFavorite={selectedProduct ? favoriteProducts.some((p) => p.idProd === selectedProduct.idProd) : false}
      />

      <Footer />
    </div>
  )
}
