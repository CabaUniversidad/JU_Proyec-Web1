"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Product, Category, FilterState } from "@/types/product"

export function useSupabaseProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 10000],
  })
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"productos" | "favoritos">("productos")
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([])

  // Cargar productos desde Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("producto")
        .select(`
          *,
          categoria:categoria(*)
        `)
        .eq("estado", true)
        .order("nomproducto")

      if (error) throw error

      const formattedProducts: Product[] = (data || []).map((item) => ({
        idProd: item.idprod,
        NomProducto: item.nomproducto || "",
        Estado: item.estado || false,
        Imagen: item.imagen,
        idCategoria: item.idcategoria || 0,
        Stock: item.stock || 0,
        marca: item.marca || "",
        Descripcion: item.descripcion || "",
        PrecioUnitario: item.preciounitario || 0,
        PrecioMayor: item.preciomayor || 0,
        categoria: item.categoria || { nomcategoria: "" },
      }))

      setProducts(formattedProducts)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  // Cargar categorías desde Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categoria")
        .select("*")
        .order("nomcategoria")

      if (error) throw error

      setCategories(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar categorías")
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === null || product.idCategoria === selectedCategory
    const lowerSearchTerm = searchTerm.toLowerCase()

    const matchesSearch =
      (product.NomProducto || "").toLowerCase().includes(lowerSearchTerm) ||
      (product.Descripcion || "").toLowerCase().includes(lowerSearchTerm) ||
      (product.marca || "").toLowerCase().includes(lowerSearchTerm)

    const matchesFilterCategory = filters.categories.length === 0 || filters.categories.includes(product.idCategoria)
    const matchesFilterBrand = filters.brands.length === 0 || filters.brands.includes(product.marca)
    const matchesPrice =
      product.PrecioUnitario >= filters.priceRange[0] && product.PrecioUnitario <= filters.priceRange[1]

    const matchesTab =
      activeTab === "productos" || (activeTab === "favoritos" && favoriteProducts.includes(product.idProd))

    return matchesCategory && matchesSearch && matchesFilterCategory && matchesFilterBrand && matchesPrice && matchesTab
  })

  const toggleFavorite = (productId: string) => {
    setFavoriteProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const getFavoriteProducts = () => {
    return products.filter((product) => favoriteProducts.includes(product.idProd))
  }

  return {
    products,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedCategory,
    setSelectedCategory,
    activeTab,
    setActiveTab,
    filteredProducts,
    favoriteProducts: getFavoriteProducts(),
    toggleFavorite,
    refetchProducts: fetchProducts,
  }
}
