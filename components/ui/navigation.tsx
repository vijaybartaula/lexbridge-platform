"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LexBridgeMark, LexiconTranslateIcon } from "@/components/ui/legal-icons"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Asylum Workflow", href: "/#workflow" },
    { name: "Architecture", href: "/#whitepaper" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#FFF8E7]/95 backdrop-blur-md border-b border-[#E8DFC8] shadow-sm"
            : "bg-[#FFF8E7] border-b border-[#E8DFC8]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3">
              <LexBridgeMark size={32} />
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-tight text-slate-950 font-serif">
                  LexBridge
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-sans font-medium mt-0.5">
                  Legal Translation Platform
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    pathname === link.href
                      ? "text-slate-950 font-semibold bg-[#EFE6D2]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-[#F4ECE0]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/translate"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-colors"
              >
                <LexiconTranslateIcon size={16} />
                Launch Translator
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md hover:bg-[#EFE6D2] transition-colors group"
            >
              <span
                className={`block w-5 h-[1.5px] bg-slate-800 rounded-full transition-all duration-300 ${
                  isOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-slate-800 rounded-full mt-[4px] transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-slate-800 rounded-full mt-[4px] transition-all duration-300 ${
                  isOpen ? "-translate-y-[10px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer — slides in smoothly from the RIGHT */}
      <div
        ref={drawerRef}
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#FFF8E7] border-l border-[#E8DFC8] shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E8DFC8]">
          <div className="flex items-center gap-2.5">
            <LexBridgeMark size={28} />
            <span className="font-serif font-bold text-slate-950 text-sm">LexBridge</span>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#EFE6D2] text-slate-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-colors ${
                pathname === link.href
                  ? "bg-[#EFE6D2] text-slate-950 font-semibold"
                  : "text-slate-700 hover:bg-[#F4ECE0] hover:text-slate-950"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="px-4 py-5 border-t border-[#E8DFC8]">
          <Link
            href="/translate"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <LexiconTranslateIcon size={16} />
            Launch Translator
          </Link>
        </div>
      </div>
    </>
  )
}
