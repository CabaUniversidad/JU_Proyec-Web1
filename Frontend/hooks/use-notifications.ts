"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import type { Notification, Banner, ProductAlert } from "@/types/notifications"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [newProductAlerts, setNewProductAlerts] = useState<ProductAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [lastProductCheck, setLastProductCheck] = useState<Date>(new Date())

  // Función para obtener mensaje legible de error
  function getErrorMessage(error: unknown): string {
    if (!error) return "Error desconocido"
    if (typeof error === "string") return error
    if (error instanceof Error) return error.message
    try {
      return JSON.stringify(error)
    } catch {
      return "Error desconocido"
    }
  }

  // Cargar notificaciones activas
  const fetchNotifications = useCallback(async () => {
    try {
      const stored = localStorage.getItem("officesupply_notifications")
      if (stored) {
        const parsed = JSON.parse(stored)
        setNotifications(
          parsed.map((n: any) => ({
            ...n,
            startDate: new Date(n.startDate),
            endDate: n.endDate ? new Date(n.endDate) : undefined,
            createdAt: new Date(n.createdAt),
            updatedAt: new Date(n.updatedAt),
          })),
        )
      }
    } catch (error) {
      console.error("Error loading notifications:", getErrorMessage(error))
    }
  }, [])

  // Verificar nuevos productos
  const checkForNewProducts = useCallback(async () => {
    try {
      const { data: products, error } = await supabase
        .from("producto")
        .select(`
        idprod,
        nomproducto,
        imagen,
        preciounitario,
        categoria:categoria(nomcategoria)
      `)
        .eq("estado", true)
        .order("idprod", { ascending: false })
        .limit(5)

      if (error) throw error

      const now = new Date()

      const newProducts =
        products?.slice(0, 2).map((product) => ({
          productId: product.idprod,
          productName: product.nomproducto || "",
          productImage: product.imagen,
          addedAt: now,
          category: product.categoria?.[0]?.nomcategoria ?? "Sin categoría",
          price: product.preciounitario,
        })) || []

      if (newProducts.length > 0) {
        setNewProductAlerts(newProducts)
        createNewProductBanner(newProducts)
      }

      setLastProductCheck(now)
    } catch (error) {
      console.error("Error checking for new products:", getErrorMessage(error))
    }
  }, [])


  // Crear banner para nuevos productos
  const createNewProductBanner = (products: ProductAlert[]) => {
    const banner: Banner = {
      id: `new_products_${Date.now()}`,
      type: "motd",
      content:
        products.length === 1
          ? `🎉 ¡Nuevo producto disponible! ${products[0].productName}`
          : `🎉 ¡${products.length} nuevos productos disponibles!`,
      variant: "success",
      isVisible: true,
      isDismissible: true,
      autoHide: true,
      hideAfter: 10000, // 10 segundos
      link: "/catalogo",
      linkText: "Ver productos",
      createdAt: new Date(),
    }

    setBanners((prev) => [banner, ...prev])
  }

  // Crear notificación personalizada
  const createNotification = useCallback(
    (notification: Omit<Notification, "id" | "createdAt" | "updatedAt">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setNotifications((prev) => {
        const updated = [newNotification, ...prev]
        localStorage.setItem("officesupply_notifications", JSON.stringify(updated))
        return updated
      })

      return newNotification
    },
    [],
  )

  // Crear banner personalizado
  const createBanner = useCallback((banner: Omit<Banner, "id" | "createdAt">) => {
    const newBanner: Banner = {
      ...banner,
      id: `banner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    }

    setBanners((prev) => [newBanner, ...prev])
    return newBanner
  }, [])

  // Dismissar banner
  const dismissBanner = useCallback((bannerId: string) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerId))
  }, [])

  // Marcar notificación como leída
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) =>
        notif.id === notificationId ? { ...notif, updatedAt: new Date() } : notif,
      )
      localStorage.setItem("officesupply_notifications", JSON.stringify(updated))
      return updated
    })
  }, [])

  // Auto-hide banners
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    banners.forEach((banner) => {
      if (banner.autoHide && banner.hideAfter && banner.isVisible) {
        const timer = setTimeout(() => {
          dismissBanner(banner.id)
        }, banner.hideAfter)
        timers.push(timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [banners, dismissBanner])

  // Verificar nuevos productos periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewProducts()
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [checkForNewProducts])

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchNotifications(), checkForNewProducts()])
      setLoading(false)
    }

    loadData()
  }, [fetchNotifications, checkForNewProducts])

  return {
    notifications,
    banners,
    newProductAlerts,
    loading,
    createNotification,
    createBanner,
    dismissBanner,
    markAsRead,
    checkForNewProducts,
  }
}
