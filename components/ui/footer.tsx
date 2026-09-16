import Link from "next/link"
import { LexBridgeMark } from "@/components/ui/legal-icons"

export function Footer() {
  return (
    <footer className="border-t border-[#E8DFC8] bg-[#FAF5E6] py-12 text-sm text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#E8DFC8]/60">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <LexBridgeMark size={26} />
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-slate-950 text-base">LexBridge</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-600 font-sans mt-0.5">
                  Legal Translation Platform
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Specialized neural translation for asylum seekers, refugee declarations, and human rights evidentiary casework. Engineered with zero server-side retention.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-900 font-semibold">
              Platform
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/translate" className="text-slate-600 hover:text-slate-950 transition-colors">
                  Document Translator
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="text-slate-600 hover:text-slate-950 transition-colors">
                  Asylum Workflow
                </Link>
              </li>
              <li>
                <Link href="/#whitepaper" className="text-slate-600 hover:text-slate-950 transition-colors">
                  System Architecture
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-900 font-semibold">
              Legal &amp; Compliance
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 hover:text-slate-950 font-medium transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 hover:text-slate-950 font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-[11px] block mt-1">
                  8 CFR § 1003.33 Verification Advisory
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} LexBridge. Public legal technology initiative.</p>
          <p className="text-center sm:text-right">
            Non-legal-advice utility. Official judicial proceedings require accredited certification.
          </p>
        </div>
      </div>
    </footer>
  )
}
