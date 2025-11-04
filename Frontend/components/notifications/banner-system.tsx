"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Sparkles, AlertTriangle, Info, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Banner } from "@/types/notifications"

interface BannerSystemProps {
  banners: Banner[]
  onDismiss: (bannerId: string) => void
}

export function BannerSystem({ banners, onDismiss }: BannerSystemProps) {
  const [visibleBanners, setVisibleBanners] = useState<Banner[]>([])

  useEffect(() => {
    setVisibleBanners(banners.filter((banner) => banner.isVisible))
  }, [banners])

  const getVariantStyles = (variant: Banner["variant"]) => {
    switch (variant) {
      case "success":
        return "border-green-200 bg-green-50 text-green-800"
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-800"
      case "error":
        return "border-red-200 bg-red-50 text-red-800"
      default:
        return "border-blue-200 bg-blue-50 text-blue-800"
    }
  }

  const getIcon = (variant: Banner["variant"], type: Banner["type"]) => {
    if (type === "motd") return <Sparkles className="h-4 w-4" />

    switch (variant) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  if (visibleBanners.length === 0) return null

  return (
    <div className="space-y-2">
      {visibleBanners.map((banner) => (
        <Alert key={banner.id} className={`${getVariantStyles(banner.variant)} relative`}>
          <div className="flex items-center gap-2">
            {getIcon(banner.variant, banner.type)}
            <AlertDescription className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{banner.content}</span>
                {banner.type === "motd" && (
                  <Badge variant="secondary" className="text-xs">
                    MOTD
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {banner.link && banner.linkText && (
                  <Link href={banner.link}>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      {banner.linkText}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                )}

                {banner.isDismissible && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDismiss(banner.id)}
                    className="h-7 w-7 p-0 hover:bg-black/10"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  )
}
