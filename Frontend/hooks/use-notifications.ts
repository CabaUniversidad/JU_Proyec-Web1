"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import type { Notification, Banner, ProductAlert } from "@/types/notifications"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [newProductAlerts, setNewProductAlerts] = useState<ProductAlert[]>([])
  const [loading, setLoading] = useState(true)

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
          }))
        )
      }
    } catch (error) {
      console.error("Error loading notifications:", getErrorMessage(error))
    }
  }, [])

  // ✅ Mostrar últimos 4 productos agregados según created_at
  const checkForNewProducts = useCallback(async () => {
    try {
      const { data: products, error } = await supabase
        .from("producto")
        .select(`
          idprod,
          nomproducto,
          imagen,
          preciounitario,
          created_at,
          categoria:categoria(nomcategoria)
        `)
        .eq("estado", true)
        .order("created_at", { ascending: false })
        .limit(3)

      if (error) throw error

      const formatted: ProductAlert[] = (products || []).map((product) => ({
        productId: product.idprod,
        productName: product.nomproducto || "",
        productImage: product.imagen,
        addedAt: new Date(product.created_at),
        category: product.categoria?.[0]?.nomcategoria ?? "Sin categoría",
        price: product.preciounitario,
      }))

      const isChanged = JSON.stringify(formatted.map(p => p.productId)) !==
                        JSON.stringify(newProductAlerts.map(p => p.productId))

      if (isChanged && formatted.length > 0) {
        setNewProductAlerts(formatted)
        createNewProductBanner(formatted)
      }

    } catch (error) {
      console.error("Error checking for new products:", getErrorMessage(error))
    }
  }, [newProductAlerts])

  const createNewProductBanner = (products: ProductAlert[]) => {
    const banner: Banner = {
      id: `new_products_${Date.now()}`,
      type: "motd",
      content:
        products.length === 1
          ? `🎉 ¡Nuevo producto disponible! ${products[0].productName}`
          : `🎉 ¡${products.length} nuevos productos disponibles!: ${products
              .map((p) => p.productName)
              .join(", ")}`,
      variant: "success",
      isVisible: true,
      isDismissible: true,
      autoHide: true,
      hideAfter: 10000,
      link: "/catalogo",
      linkText: "Ver productos",
      createdAt: new Date(),
    }

    setBanners((prev) => [banner, ...prev])
  }

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
    []
  )

  const createBanner = useCallback((banner: Omit<Banner, "id" | "createdAt">) => {
    const newBanner: Banner = {
      ...banner,
      id: `banner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    }

    setBanners((prev) => [newBanner, ...prev])
    return newBanner
  }, [])

  const dismissBanner = useCallback((bannerId: string) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerId))
  }, [])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) =>
        notif.id === notificationId ? { ...notif, updatedAt: new Date() } : notif
      )
      localStorage.setItem("officesupply_notifications", JSON.stringify(updated))
      return updated
    })
  }, [])

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

  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewProducts()
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [checkForNewProducts])

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
