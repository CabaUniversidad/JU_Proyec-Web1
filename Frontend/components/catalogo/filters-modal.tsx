"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { FilterState, Category } from "@/types/product"
import { formatPrice } from "@/utils/product-helpers"

interface FiltersModalProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onApplyFilters: () => void
  onClearFilters: () => void
  categories: Category[]
  brands: string[]
  maxPrice: number
}

export function FiltersModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  categories,
  brands,
  maxPrice,
}: FiltersModalProps) {
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, categories: [...filters.categories, categoryId] })
    } else {
      onFiltersChange({ ...filters, categories: filters.categories.filter((c) => c !== categoryId) })
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, brands: [...filters.brands, brand] })
    } else {
      onFiltersChange({ ...filters, brands: filters.brands.filter((b) => b !== brand) })
    }
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Filtros</DialogTitle>
          <p className="text-gray-600">Filtre los productos por categoría, marca y precio</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categorías */}
          <div>
            <h3 className="font-semibold mb-3">Categorías</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.idCategoria} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.idCategoria}`}
                    checked={filters.categories.includes(category.idCategoria)}
                    onCheckedChange={(checked) => handleCategoryChange(category.idCategoria, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.idCategoria}`} className="text-sm">
                    {category.NomCategoria}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Marcas */}
          <div>
            <h3 className="font-semibold mb-3">Marcas</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rango de precios */}
          <div>
            <h3 className="font-semibold mb-3">Rango de precios</h3>
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={maxPrice}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Limpiar filtros
          </Button>
          <Button onClick={onApplyFilters} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
