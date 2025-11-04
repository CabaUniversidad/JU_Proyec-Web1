export interface Notification {
  id: string
  type: "new_product" | "promotion" | "maintenance" | "announcement"
  title: string
  message: string
  productId?: string
  productName?: string
  productImage?: string
  priority: "low" | "medium" | "high"
  isActive: boolean
  startDate: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Banner {
  id: string
  type: "motd" | "alert" | "promotion"
  content: string
  variant: "info" | "success" | "warning" | "error"
  isVisible: boolean
  isDismissible: boolean
  autoHide?: boolean
  hideAfter?: number // milliseconds
  link?: string
  linkText?: string
  createdAt: Date
}

export interface ProductAlert {
  productId: string
  productName: string
  productImage?: string
  addedAt: Date
  category?: string
  price?: number
}
