"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, Trash2, User, Phone, Mail } from "lucide-react"
import type { CartItem } from "@/types/product"
import { formatPrice } from "@/utils/product-helpers"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onSubmitOrder: (clienteData: { Nombre: string; Telefono: string; Email: string }, mensaje: string) => Promise<boolean>
  totalPrice: number
  loading: boolean
}

export function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
  totalPrice,
  loading,
}: CartModalProps) {
  const [clienteData, setClienteData] = useState({
    Nombre: "",
    Telefono: "",
    Email: "",
  })
  const [mensaje, setMensaje] = useState("")
  const [step, setStep] = useState<"cart" | "client">("cart")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!clienteData.Nombre.trim()) {
      newErrors.Nombre = "El nombre es requerido"
    }

    if (!clienteData.Email.trim()) {
      newErrors.Email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(clienteData.Email)) {
      newErrors.Email = "El email no es válido"
    }

    if (!clienteData.Telefono.trim()) {
      newErrors.Telefono = "El teléfono es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    const success = await onSubmitOrder(clienteData, mensaje)
    if (success) {
      setClienteData({ Nombre: "", Telefono: "", Email: "" })
      setMensaje("")
      setStep("cart")
      onClose()
      alert("¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo pronto.")
    } else {
      alert("Error al enviar la solicitud. Por favor, intenta nuevamente.")
    }
  }

  const handleClose = () => {
    setStep("cart")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === "cart" ? "Carrito de Reservación" : "Información del Cliente"}
          </DialogTitle>
        </DialogHeader>

        {step === "cart" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Productos en el carrito */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Productos en su carrito</h3>
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay productos en el carrito</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.product.idProd}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.product.Imagen ? (
                          <img
                            src={item.product.Imagen || "/placeholder.svg"}
                            alt={item.product.NomProducto}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">IMG</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.NomProducto}</h4>
                        <p className="text-gray-600">{formatPrice(item.product.PrecioUnitario)}</p>
                        <p className="text-xs text-gray-500">Stock: {item.product.Stock}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-300"
                          onClick={() => onUpdateQuantity(item.product.idProd, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-300"
                          onClick={() => onUpdateQuantity(item.product.idProd, item.quantity + 1)}
                          disabled={item.quantity >= item.product.Stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-300 text-red-500 hover:text-red-600"
                          onClick={() => onRemoveItem(item.product.idProd)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Resumen */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Resumen</h3>
                <div className="space-y-2">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">El carrito está vacío</p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.product.idProd} className="flex justify-between text-sm">
                          <span>
                            {item.product.NomProducto} x{item.quantity}
                          </span>
                          <span>{formatPrice(item.product.PrecioUnitario * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={cartItems.length === 0}
                onClick={() => setStep("client")}
              >
                Continuar con la solicitud
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>

                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="nombre"
                      placeholder="Ingrese su nombre completo"
                      value={clienteData.Nombre}
                      onChange={(e) => setClienteData({ ...clienteData, Nombre: e.target.value })}
                      className={`pl-10 ${errors.Nombre ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.Nombre && <p className="text-red-500 text-xs">{errors.Nombre}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ejemplo@correo.com"
                      value={clienteData.Email}
                      onChange={(e) => setClienteData({ ...clienteData, Email: e.target.value })}
                      className={`pl-10 ${errors.Email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.Email && <p className="text-red-500 text-xs">{errors.Email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="telefono"
                      placeholder="Ingrese su teléfono"
                      value={clienteData.Telefono}
                      onChange={(e) => setClienteData({ ...clienteData, Telefono: e.target.value })}
                      className={`pl-10 ${errors.Telefono ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.Telefono && <p className="text-red-500 text-xs">{errors.Telefono}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje adicional (opcional)</Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Agregue cualquier información adicional sobre su solicitud"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Resumen de la solicitud</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.product.idProd} className="flex justify-between text-sm">
                        <span>
                          {item.product.NomProducto} x{item.quantity}
                        </span>
                        <span>{formatPrice(item.product.PrecioUnitario * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total estimado</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep("cart")} className="flex-1" disabled={loading}>
                Volver al carrito
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
