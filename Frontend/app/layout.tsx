import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OfficeSupply - Sistema de Distribución de Material de Escritorio",
  description: "Sistema integral para la distribución eficiente de material de escritorio y oficina para empresas.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
