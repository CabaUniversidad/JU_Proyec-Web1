import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Distribución Eficiente de Material de Oficina
          </h1>
          <p className="text-gray-600 max-w-md">
            Optimice su cadena de suministro con nuestro sistema integral de distribución de material de escritorio para
            empresas de todos los tamaños.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg">Conocer más</Button>
            <Link href="/catalogo">
              <Button variant="outline" size="lg">
                Ver catálogo
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Sistema de distribución"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
