export const getCategoryBadge = (categoria?: { NomCategoria?: string }) => {
  if (!categoria || !categoria.NomCategoria) {
    return { text: "Sin categoría", className: "bg-gray-500 text-white" }
  }

  const categoryName = categoria.NomCategoria.toLowerCase()

  if (categoryName.includes("premium") || categoryName.includes("lujo")) {
    return { text: "Premium", className: "bg-yellow-600 text-white" }
  }
  if (categoryName.includes("estándar") || categoryName.includes("estandar")) {
    return { text: "Estándar", className: "bg-blue-600 text-white" }
  }
  if (categoryName.includes("básico") || categoryName.includes("basico")) {
    return { text: "Básico", className: "bg-gray-600 text-white" }
  }

  return { text: categoria.NomCategoria, className: "bg-green-600 text-white" }
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}