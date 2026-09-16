import type React from "react"
import type { Metadata, Viewport } from "next"
import { Merriweather, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const serifFont = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "LexBridge | Legal Translation Platform for Asylum & Human Rights",
  description:
    "AI-powered legal document translation platform designed for refugees, asylum applicants, and legal aid attorneys.",
  keywords: [
    "legal translation",
    "asylum documentation",
    "refugee legal aid",
    "immigration law",
    "evidentiary translation",
  ],
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="font-sans antialiased bg-[#FFF8E7] text-slate-900 min-h-screen selection:bg-[#EFE6D2]">
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
