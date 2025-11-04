"use client"

import { useState } from "react"
import type { Product, FilterState } from "@/types/product"

export function useProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, Infinity],
  })
  const [selectedCategory, setSelectedCategory] = useState<number | "todos">("todos")
  const [activeTab, setActiveTab] = useState<"productos" | "favoritos">("productos")

  const toggleFavorite = (productId: string) => {
    setProducts(
      products.map((product) =>
        product.idProd === productId ? { ...product, isFavorite: !product.isFavorite } : product,
      ),
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "todos" || product.idCategoria === selectedCategory

    const lowerSearch = searchTerm.toLowerCase()
    const matchesSearch =
      product.NomProducto.toLowerCase().includes(lowerSearch) ||
      product.Descripcion.toLowerCase().includes(lowerSearch)

    const matchesTab = activeTab === "productos" || (activeTab === "favoritos" && product.isFavorite)

    const matchesFilterCategory =
      filters.categories.length === 0 || filters.categories.includes(product.idCategoria)

    const matchesFilterBrand =
      filters.brands.length === 0 || filters.brands.includes(product.marca)

    const matchesPrice =
      product.PrecioUnitario >= filters.priceRange[0] &&
      product.PrecioUnitario <= filters.priceRange[1]

    return (
      matchesCategory &&
      matchesSearch &&
      matchesTab &&
      matchesFilterCategory &&
      matchesFilterBrand &&
      matchesPrice
    )
  })

  const favoriteProducts = products.filter((product) => product.isFavorite)

  return {
    products,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedCategory,
    setSelectedCategory,
    activeTab,
    setActiveTab,
    toggleFavorite,
    filteredProducts,
    favoriteProducts,
  }
}
