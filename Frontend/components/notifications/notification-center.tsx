"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, X, Sparkles, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Notification } from "@/types/notifications"

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (notificationId: string) => void
  onDismiss: (notificationId: string) => void
}

export function NotificationCenter({ notifications, onMarkAsRead, onDismiss }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeNotifications = notifications.filter((n) => n.isActive)
  const unreadCount = activeNotifications.length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_product":
        return <Sparkles className="h-4 w-4 text-green-600" />
      case "promotion":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-600 text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Notificaciones
              {unreadCount > 0 && <Badge variant="secondary">{unreadCount} nuevas</Badge>}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {activeNotifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No hay notificaciones</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {activeNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 hover:bg-gray-50 cursor-pointer ${getPriorityColor(notification.priority)}`}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDismiss(notification.id)
                              }}
                              className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-xs text-gray-600 mb-2">{notification.message}</p>

                          {notification.productName && (
                            <Badge variant="outline" className="text-xs">
                              {notification.productName}
                            </Badge>
                          )}

                          <p className="text-xs text-gray-400 mt-2">{notification.createdAt.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
