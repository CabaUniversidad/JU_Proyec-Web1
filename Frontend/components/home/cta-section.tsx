"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  const handleWhatsAppContact = () => {
    const phoneNumber = "1234567890" // Reemplaza con tu número de WhatsApp
    const message =
      "Hola, estoy interesado en optimizar la distribución de material de oficina. Me gustaría recibir más información sobre su sistema."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">¿Listo para optimizar su distribución?</h2>
            <p className="text-gray-600">Contáctenos hoy para una consulta personalizada sobre nuestro sistema.</p>
          </div>
          <div className="flex-shrink-0">
            <Button size="lg" onClick={handleWhatsAppContact}>
              Contactar ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
