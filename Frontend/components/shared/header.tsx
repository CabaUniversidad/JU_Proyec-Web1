"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Briefcase, Package, Truck, MapPin, Phone, Mail, Clock, Menu, X } from "lucide-react"

export function Header() {
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [isDistributionModalOpen, setIsDistributionModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const products = [
    { name: "Papel y Cartón", description: "Papel bond, cartulinas, folders" },
    { name: "Útiles de Escritura", description: "Bolígrafos, lápices, marcadores" },
    { name: "Archivadores", description: "Carpetas, biblioratos, cajas archivo" },
    { name: "Suministros de Oficina", description: "Grapas, clips, cintas adhesivas" },
    { name: "Tecnología", description: "Cartuchos, toners, cables" },
    { name: "Mobiliario", description: "Sillas, escritorios, estanterías" },
  ]

  const handleWhatsAppQuote = () => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = "Hola, me gustaría solicitar una cotización para material de oficina."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">OfficeSupply</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setIsProductsModalOpen(true)} className="text-sm font-medium hover:text-blue-600">
              Productos
            </button>
            <Link href="/catalogo" className="text-sm font-medium hover:text-blue-600">
              Catálogos
            </Link>
            <button
              onClick={() => setIsDistributionModalOpen(true)}
              className="text-sm font-medium hover:text-blue-600"
            >
              Distribución
            </button>
            <button onClick={() => setIsContactModalOpen(true)} className="text-sm font-medium hover:text-blue-600">
              Contacto
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Button onClick={handleWhatsAppQuote} className="hidden md:block">
              Solicitar Cotización
            </Button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">OfficeSupply</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              <button
                onClick={() => {
                  setIsProductsModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-lg font-medium"
              >
                Productos
              </button>
              <Link
                href="/catalogo"
                className="block py-2 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catálogos
              </Link>
              <button
                onClick={() => {
                  setIsDistributionModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-lg font-medium"
              >
                Distribución
              </button>
              <button
                onClick={() => {
                  setIsContactModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-lg font-medium"
              >
                Contacto
              </button>
              <Button onClick={handleWhatsAppQuote} className="w-full mt-4">
                Solicitar Cotización
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Modal de Productos */}
      <Dialog open={isProductsModalOpen} onOpenChange={setIsProductsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Nuestros Productos
            </DialogTitle>
            <DialogDescription>Amplio catálogo de material de oficina para todas sus necesidades</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Link href="/catalogo">
              <Button variant="outline">Ver Catálogo Completo</Button>
            </Link>
            <Button onClick={handleWhatsAppQuote}>Solicitar Cotización</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Distribución */}
      <Dialog open={isDistributionModalOpen} onOpenChange={setIsDistributionModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Sistema de Distribución
            </DialogTitle>
            <DialogDescription>
              Cobertura nacional con entregas programadas y seguimiento en tiempo real
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Zonas de Cobertura</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Ciudad de México y Área Metropolitana</li>
                  <li>• Guadalajara y zona conurbada</li>
                  <li>• Monterrey y área metropolitana</li>
                  <li>• Principales ciudades del interior</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Tipos de Entrega</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Entregas programadas semanales</li>
                  <li>• Entregas urgentes (24-48 hrs)</li>
                  <li>• Distribución a múltiples sucursales</li>
                  <li>• Entregas con cita previa</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Ventajas de Nuestro Sistema:</h4>
              <ul className="text-sm space-y-1 text-blue-800">
                <li>✓ Seguimiento GPS en tiempo real</li>
                <li>✓ Notificaciones automáticas de entrega</li>
                <li>✓ Flexibilidad en horarios de entrega</li>
                <li>✓ Personal capacitado y uniformado</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Contacto */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Información de Contacto
            </DialogTitle>
            <DialogDescription>OfficeSupply - Su socio en distribución de material de oficina</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Dirección</p>
                <p className="text-sm text-gray-600">
                  123 Calle Principal, Ciudad
                  <br />
                  Código Postal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Teléfono</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">info@officesupply.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Horarios</p>
                <p className="text-sm text-gray-600">
                  Lun - Vie: 8:00 AM - 6:00 PM
                  <br />
                  Sáb: 9:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={handleWhatsAppQuote} className="flex-1">
              Contactar por WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
