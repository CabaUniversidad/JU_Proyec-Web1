"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import type { CartItem, Product, Cliente } from "@/types/product"
import type { PostgrestError } from "@supabase/supabase-js"

export function useSupabaseCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  const addToCart = (product: Product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.product.idProd === product.idProd)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.idProd === product.idProd ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setCartItems([...cartItems, { product, quantity }])
    }
  }

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(
      cartItems.map((item) => (item.product.idProd === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.idProd !== productId))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.PrecioUnitario * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const processError = (error: PostgrestError | null, context: string) => {
    if (error) {
      const message = `${context}: ${error.message} (code: ${error.code}, details: ${error.details || "N/A"})`
      console.error(message)
      throw new Error(message)
    }
  }

  const createCliente = async (clienteData: Omit<Cliente, "idCliente">): Promise<string> => {
    const clienteId = `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const { error } = await supabase.from("cliente").insert({
      idcliente: clienteId,
      nombre: clienteData.Nombre,
      telefono: clienteData.Telefono,
      email: clienteData.Email,
    })

    processError(error, "error al crear cliente")
    return clienteId
  }

  const createSolicitud = async (clienteId: string, mensaje: string): Promise<string> => {
    const solicitudId = `sol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const { error } = await supabase.from("solicitud").insert({
      idsolicitud: solicitudId,
      idcliente: clienteId,
      mensaje: mensaje,
    })

    processError(error, "error al crear solicitud")
    return solicitudId
  }

  const createListaSolicitud = async (solicitudId: string, cartItems: CartItem[]): Promise<void> => {
    const listaItems = cartItems.map((item) => ({
      idsolicitud: solicitudId,
      idproducto: item.product.idProd,
      cantidad: item.quantity,
      precioselect: item.product.PrecioUnitario,
    }))

    const { error } = await supabase.from("listasolicitud").insert(listaItems)

    processError(error, "error al crear lista de solicitud")
  }

  const submitOrder = async (clienteData: Omit<Cliente, "idCliente">, mensaje: string): Promise<boolean> => {
    try {
      setLoading(true)

      const clienteId = await createCliente(clienteData)
      const solicitudId = await createSolicitud(clienteId, mensaje)
      await createListaSolicitud(solicitudId, cartItems)

      clearCart()
      return true
    } catch (error: any) {
      console.error("error al enviar pedido:", error.message || error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
    submitOrder,
    loading,
  }
}
