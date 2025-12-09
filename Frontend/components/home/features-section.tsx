"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FeaturesSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const features = [
    "Control de inventario en tiempo real para optimizar sus pedidos",
    "Entregas programadas según las necesidades de su empresa",
    "Reportes detallados de consumo y proyecciones de demanda",
    "Plataforma digital para realizar pedidos de forma sencilla",
  ]

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar el formulario
    alert("Solicitud de demostración enviada. Nos contactaremos pronto.")
    setIsDemoModalOpen(false)
  }

  return (
    <>
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
            <Button className="mt-4" onClick={() => setIsDemoModalOpen(true)}>
              Solicitar demostración
            </Button>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden border">
            <Image
              src="/fondoinicio2.png?height=300&width=500"
              alt="Sistema de gestión"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Demostración</DialogTitle>
            <DialogDescription>Complete el formulario y le mostraremos cómo funciona nuestro sistema</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDemoRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" placeholder="Nombre de su empresa" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Su nombre completo" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="su.email@empresa.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" placeholder="Número de contacto" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Número de empleados</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tamaño de su empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 empleados</SelectItem>
                  <SelectItem value="11-50">11-50 empleados</SelectItem>
                  <SelectItem value="51-200">51-200 empleados</SelectItem>
                  <SelectItem value="200+">Más de 200 empleados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje adicional</Label>
              <Textarea id="message" placeholder="Cuéntenos sobre sus necesidades específicas" />
            </div>
            <Button type="submit" className="w-full">
              Solicitar Demostración
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
