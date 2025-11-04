import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">OfficeSupply</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
            Productos
          </Link>
          <Link href="/catalogo" className="text-sm font-medium hover:text-blue-600">
            Catálogos
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
            Distribución
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
            Contacto
          </Link>
        </nav>
        <Button>Solicitar Cotización</Button>
      </div>
    </header>
  )
}
