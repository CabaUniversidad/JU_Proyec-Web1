"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, TrendingUp, Settings } from "lucide-react"

interface ChatSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  messageCount: number
  status: "active" | "ended"
  lastMessage: string
}

interface ChatAnalytics {
  totalSessions: number
  activeSessions: number
  averageSessionDuration: number
  commonQueries: string[]
  satisfactionRate: number
}

export function ChatbotAdmin() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [analytics, setAnalytics] = useState<ChatAnalytics>({
    totalSessions: 0,
    activeSessions: 0,
    averageSessionDuration: 0,
    commonQueries: [],
    satisfactionRate: 0,
  })
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  // Simular datos de ejemplo
  useEffect(() => {
    const mockSessions: ChatSession[] = [
      {
        id: "session_1",
        userId: "user_123",
        startTime: new Date(Date.now() - 3600000),
        messageCount: 8,
        status: "active",
        lastMessage: "¿Tienen bolígrafos azules disponibles?",
      },
      {
        id: "session_2",
        userId: "user_456",
        startTime: new Date(Date.now() - 7200000),
        endTime: new Date(Date.now() - 3600000),
        messageCount: 12,
        status: "ended",
        lastMessage: "Gracias por la ayuda",
      },
    ]

    const mockAnalytics: ChatAnalytics = {
      totalSessions: 156,
      activeSessions: 3,
      averageSessionDuration: 8.5,
      commonQueries: ["Ver productos disponibles", "Consultar precios", "Estado de pedido", "Información de envío"],
      satisfactionRate: 4.2,
    }

    setSessions(mockSessions)
    setAnalytics(mockAnalytics)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel de Administración - Chatbot</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Configuración
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Totales</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSessions}</div>
            <p className="text-xs text-muted-foreground">+12% desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Activas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeSessions}</div>
            <p className="text-xs text-muted-foreground">En tiempo real</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duración Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageSessionDuration} min</div>
            <p className="text-xs text-muted-foreground">+2.1 min vs. promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.satisfactionRate}/5</div>
            <p className="text-xs text-muted-foreground">Calificación promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Sesiones Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions
                .filter((s) => s.status === "active")
                .map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{session.userId}</Badge>
                        <Badge className="bg-green-100 text-green-800">Activa</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{session.lastMessage}</p>
                      <p className="text-xs text-gray-500">{session.messageCount} mensajes</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Chat
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Queries */}
        <Card>
          <CardHeader>
            <CardTitle>Consultas Más Frecuentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.commonQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{query}</span>
                  <Badge variant="outline">{Math.floor(Math.random() * 50) + 10}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Mensaje Broadcast</h4>
              <Textarea placeholder="Enviar mensaje a todos los usuarios activos..." />
              <Button className="w-full">Enviar</Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Respuesta Automática</h4>
              <Input placeholder="Palabra clave..." />
              <Textarea placeholder="Respuesta automática..." />
              <Button className="w-full">Configurar</Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Estado del Bot</h4>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">En línea</Badge>
                <span className="text-sm text-gray-600">Funcionando correctamente</span>
              </div>
              <Button variant="outline" className="w-full">
                Reiniciar Bot
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
