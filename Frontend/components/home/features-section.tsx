import Image from "next/image"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
  const features = [
    "Control de inventario en tiempo real para optimizar sus pedidos",
    "Entregas programadas según las necesidades de su empresa",
    "Reportes detallados de consumo y proyecciones de demanda",
    "Plataforma digital para realizar pedidos de forma sencilla",
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Sistema de Gestión Integral</h2>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4">Solicitar demostración</Button>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden border">
          <Image src="/placeholder.svg?height=300&width=500" alt="Sistema de gestión" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
