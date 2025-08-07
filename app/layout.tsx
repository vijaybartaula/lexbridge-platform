import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const inter = Inter({ subsets: ["latin"] })

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LexBridge | Legal Translation Platform",
  description: "AI-powered legal document translation for refugees and asylum seekers",
  keywords: ["legal translation", "asylum", "immigration", "AI translation", "document processing"],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 32x32 favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // 180x180 for Apple devices
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
