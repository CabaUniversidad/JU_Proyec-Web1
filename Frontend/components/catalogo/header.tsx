"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Filter, History, ArrowUpDown, Menu } from "lucide-react"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useNotifications } from "@/hooks/use-notifications"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  totalItems: number
  onCartClick: () => void
  onFiltersClick: () => void
  onSidebarToggle: () => void
  showSidebar: boolean
}

export function Header({
  searchTerm,
  onSearchChange,
  totalItems,
  onCartClick,
  onFiltersClick,
  onSidebarToggle,
  showSidebar,
}: HeaderProps) {
  const { notifications, markAsRead, dismissBanner } = useNotifications()

  const handleDismissNotification = (notificationId: string) => {
    // En una implementación real, esto actualizaría la base de datos
    dismissBanner(notificationId)
  }

  return (
    <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={onSidebarToggle}
            aria-label={showSidebar ? "Cerrar menú lateral" : "Abrir menú lateral"}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
            <p className="text-gray-600 mt-1">Explore nuestra selección de productos y haga sus reservaciones</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-300 text-gray-900 w-48 md:w-64 lg:w-80"
            />
          </div>

          {/* Centro de Notificaciones */}
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onDismiss={handleDismissNotification}
          />

          <Button variant="outline" size="icon" className="relative border-gray-300" onClick={onCartClick}>
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-600">
                {totalItems}
              </Badge>
            )}
          </Button>
          <Button variant="outline" size="icon" className="border-gray-300" onClick={onFiltersClick}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="sm:hidden relative mt-4 mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-50 border-gray-300 text-gray-900 w-full"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
        <Button variant="outline" className="border-gray-300 text-gray-600 text-xs sm:text-sm">
          <History className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Historial
        </Button>
        <Button variant="outline" className="border-gray-300 text-gray-600 text-xs sm:text-sm">
          <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Ordenar
        </Button>
      </div>
    </div>
  )
}
