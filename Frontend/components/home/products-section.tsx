import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ProductsSection() {
  const productCategories = [
    {
      name: "Papelería",
      description: "Papel, cuadernos, libretas",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Escritura",
      description: "Bolígrafos, lápices, marcadores",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Organización",
      description: "Archivadores, carpetas, separadores",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Accesorios",
      description: "Grapadoras, tijeras, pegamento",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Catálogo de Productos</h2>
          <p className="text-gray-600">
            Descubra nuestra amplia gama de productos de oficina de alta calidad para satisfacer todas sus necesidades.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 pt-8">
          {productCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
