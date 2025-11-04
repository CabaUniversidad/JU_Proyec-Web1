"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, AlertCircle } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { supabase } from "@/lib/supabase"

export function ProductManager() {
  const [formData, setFormData] = useState({
    idProd: "",
    NomProducto: "",
    Descripcion: "",
    PrecioUnitario: "",
    PrecioMayor: "",
    Stock: "",
    marca: "",
    Imagen: "",
    idCategoria: "",
    Estado: true,
  })
  const [loading, setLoading] = useState(false)
  const { createBanner, createNotification } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generar ID único para el producto
      const productId = `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

      const productData = {
        idProd: productId,
        NomProducto: formData.NomProducto,
        Descripcion: formData.Descripcion,
        PrecioUnitario: Number.parseFloat(formData.PrecioUnitario),
        PrecioMayor: formData.PrecioMayor ? Number.parseFloat(formData.PrecioMayor) : null,
        Stock: Number.parseInt(formData.Stock),
        marca: formData.marca,
        Imagen: formData.Imagen || null,
        idCategoria: Number.parseInt(formData.idCategoria),
        Estado: formData.Estado,
      }

      const { error } = await supabase.from("Producto").insert(productData)

      if (error) throw error

      // Crear banner de nuevo producto
      createBanner({
        type: "motd",
        content: `🎉 ¡Nuevo producto agregado! ${formData.NomProducto} ya está disponible en nuestro catálogo.`,
        variant: "success",
        isVisible: true,
        isDismissible: true,
        autoHide: true,
        hideAfter: 15000,
        link: "/catalogo",
        linkText: "Ver en catálogo",
      })

      // Crear notificación
      createNotification({
        type: "new_product",
        title: "Nuevo producto agregado",
        message: `${formData.NomProducto} ha sido agregado al catálogo y está disponible para los clientes.`,
        productId: productId,
        productName: formData.NomProducto,
        priority: "medium",
        isActive: true,
        startDate: new Date(),
      })

      // Limpiar formulario
      setFormData({
        idProd: "",
        NomProducto: "",
        Descripcion: "",
        PrecioUnitario: "",
        PrecioMayor: "",
        Stock: "",
        marca: "",
        Imagen: "",
        idCategoria: "",
        Estado: true,
      })

      alert("¡Producto agregado exitosamente!")
    } catch (error) {
      console.error("Error al agregar producto:", error)
      alert("Error al agregar el producto. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Agregar Nuevo Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Producto *</Label>
              <Input
                id="nombre"
                value={formData.NomProducto}
                onChange={(e) => setFormData({ ...formData, NomProducto: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca">Marca *</Label>
              <Input
                id="marca"
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio Unitario *</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                value={formData.PrecioUnitario}
                onChange={(e) => setFormData({ ...formData, PrecioUnitario: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precioMayor">Precio Mayorista</Label>
              <Input
                id="precioMayor"
                type="number"
                step="0.01"
                value={formData.PrecioMayor}
                onChange={(e) => setFormData({ ...formData, PrecioMayor: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.Stock}
                onChange={(e) => setFormData({ ...formData, Stock: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select
                value={formData.idCategoria}
                onValueChange={(value) => setFormData({ ...formData, idCategoria: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Papelería</SelectItem>
                  <SelectItem value="2">Escritura</SelectItem>
                  <SelectItem value="3">Organización</SelectItem>
                  <SelectItem value="4">Accesorios</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.Descripcion}
              onChange={(e) => setFormData({ ...formData, Descripcion: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagen">URL de Imagen</Label>
            <Input
              id="imagen"
              type="url"
              value={formData.Imagen}
              onChange={(e) => setFormData({ ...formData, Imagen: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="estado"
              checked={formData.Estado}
              onCheckedChange={(checked) => setFormData({ ...formData, Estado: checked })}
            />
            <Label htmlFor="estado">Producto activo</Label>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800">
              Al agregar este producto, se enviará automáticamente una notificación MOTD a todos los usuarios.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Agregando producto..." : "Agregar Producto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
