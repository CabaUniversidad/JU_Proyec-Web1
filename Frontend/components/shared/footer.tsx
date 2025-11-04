import Link from "next/link"
import { Briefcase } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">OfficeSupply</span>
            </div>
            <p className="text-sm">Soluciones integrales para la distribución de material de escritorio y oficina.</p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-4">Productos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Papelería
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Escritura
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Organización
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Distribución
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Gestión de inventario
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Plataforma digital
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Soporte técnico
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>info@officesupply.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Calle Principal, Ciudad</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          © {new Date().getFullYear()} OfficeSupply. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
