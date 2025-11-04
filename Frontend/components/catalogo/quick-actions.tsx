import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Phone, FileText } from "lucide-react"

export function QuickActions() {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Accesos Rápidos</h3>
      <div className="flex gap-2 min-w-max">
        <Link href="/">
          <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
            <Home className="h-3 w-3 mr-1" />
            Inicio
          </Button>
        </Link>
        <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
          <FileText className="h-3 w-3 mr-1" />
          Conocer más
        </Button>
        <Button size="sm" className="text-xs bg-blue-600 text-white hover:bg-blue-700">
          <Phone className="h-3 w-3 mr-1" />
          Solicitar Cotización
        </Button>
        <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
          Solicitar demostración
        </Button>
        <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
          Contactar ahora
        </Button>
      </div>
    </div>
  )
}
