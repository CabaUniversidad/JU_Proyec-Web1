import { Pencil, FileText, Package, Truck, Phone } from "lucide-react"

export function ServicesSection() {
  const services = [
    { icon: Pencil, name: "Material de Escritura" },
    { icon: FileText, name: "Papelería" },
    { icon: Package, name: "Organización" },
    { icon: Truck, name: "Distribución" },
    { icon: Phone, name: "Soporte" },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Nuestros Servicios</h2>
          <p className="text-gray-600">
            Ofrecemos soluciones completas para la gestión y distribución de material de escritorio, adaptadas a las
            necesidades específicas de su empresa.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2">
              <div className="bg-gray-100 p-4 rounded-full">
                <service.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
