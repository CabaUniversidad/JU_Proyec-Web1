"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const productCategories = [
    {
      name: "Papelería",
      description: "Papel, cuadernos, libretas",
      image: "/papeleria.png?height=200&width=300",
      products: [
        "Papel bond A4 y carta",
        "Cuadernos profesionales",
        "Libretas de notas",
        "Papel fotocopia",
        "Cartulinas de colores",
        "Papel membretado",
      ],
    },
    {
      name: "Escritura",
      description: "Bolígrafos, lápices, marcadores",
      image: "/escritura.png?height=200&width=300",
      products: [
        "Bolígrafos azul, negro, rojo",
        "Lápices HB y 2B",
        "Marcadores permanentes",
        "Resaltadores fluorescentes",
        "Plumas estilográficas",
        "Correctores líquidos",
      ],
    },
    {
      name: "Organización",
      description: "Archivadores, carpetas, separadores",
      image: "/organizacion.png?height=200&width=300",
      products: [
        "Archivadores de palanca",
        "Carpetas colgantes",
        "Separadores de colores",
        "Cajas archivo",
        "Portafolios ejecutivos",
        "Organizadores de escritorio",
      ],
    },
    {
      name: "Accesorios",
      description: "Grapadoras, tijeras, pegamento",
      image: "/accesorios.png?height=200&width=300",
      products: [
        "Grapadoras estándar",
        "Tijeras de oficina",
        "Pegamento en barra",
        "Clips metálicos",
        "Grapas estándar",
        "Perforadoras de papel",
      ],
    },
  ]

  const selectedCategoryData = productCategories.find((cat) => cat.name === selectedCategory)

  const handleWhatsAppQuote = (categoryName: string) => {
    const phoneNumber = "1234567890"
    const message = `Hola, me interesa recibir una cotización para productos de la categoría: ${categoryName}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Catálogo de Productos</h2>
            <p className="text-gray-600">
              Descubra nuestra amplia gama de productos de oficina de alta calidad para satisfacer todas sus
              necesidades.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 pt-8">
            {productCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-48" onClick={() => setSelectedCategory(category.name)}>
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    Ver productos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCategoryData?.name}</DialogTitle>
            <DialogDescription>{selectedCategoryData?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Productos disponibles:</h4>
              <ul className="text-sm space-y-1">
                {selectedCategoryData?.products.map((product, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedCategory(null)}>
                Cerrar
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (selectedCategory) {
                    handleWhatsAppQuote(selectedCategory)
                  }
                }}
              >
                Cotizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
