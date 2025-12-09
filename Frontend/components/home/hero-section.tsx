"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Truck, BarChart3, Smartphone } from "lucide-react"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Distribución Eficiente de Material de Oficina
            </h1>
            <p className="text-gray-600 max-w-md">
              Optimice su cadena de suministro con nuestro sistema integral de distribución de material de escritorio
              para empresas de todos los tamaños.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={() => setIsModalOpen(true)}>
                Conocer más
              </Button>
              <Link href="/catalogo">
                <Button variant="outline" size="lg">
                  Ver catálogo
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/fondoinicio.png?height=400&width=600"
              alt="Sistema de distribución"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Nuestro Sistema de Distribución</DialogTitle>
            <DialogDescription>
              Descubra cómo podemos transformar la gestión de material de oficina en su empresa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Control Total</span>
                </div>
                <p className="text-sm text-gray-600">Monitoreo en tiempo real de inventarios y consumo de materiales</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Entregas Programadas</span>
                </div>
                <p className="text-sm text-gray-600">Distribución automatizada según sus necesidades específicas</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Análisis Avanzado</span>
                </div>
                <p className="text-sm text-gray-600">Reportes detallados y proyecciones de demanda inteligentes</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Plataforma Digital</span>
                </div>
                <p className="text-sm text-gray-600">
                  Interfaz intuitiva para gestionar pedidos desde cualquier dispositivo
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Beneficios Principales:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Reducción de costos operativos hasta 30%</li>
                <li>• Eliminación de faltantes de material</li>
                <li>• Optimización de espacios de almacenamiento</li>
                <li>• Mejora en la productividad del personal</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
