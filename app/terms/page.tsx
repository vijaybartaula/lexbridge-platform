import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import Link from "next/link"
import { LexBridgeMark, LegalScalesIcon } from "@/components/ui/legal-icons"

export const metadata = {
  title: "Terms of Service | LexBridge Legal Translation Platform",
  description: "Terms of Service governing the use of the LexBridge legal translation platform.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col text-slate-900">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-10 pb-6 border-b border-[#E8DFC8]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C6D3F] mb-2 font-semibold">
            <span>Governance</span>
            <span>/</span>
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Last Updated: March 2025 · Effective immediately for all platform users
          </p>
        </div>

        <article className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-800">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">1. Nature of the Service</h2>
            <p>
              LexBridge provides specialized neural language translation engineered specifically for asylum applications, persecution affidavits, and immigration documentation. The platform utilizes advanced natural language models, including Google Gemini, to facilitate cross-lingual understanding for refugees, accredited representatives, and human rights advocates.
            </p>
            <div className="p-4 bg-[#FAF5E6] border border-[#E2D6BC] rounded-md text-sm text-slate-800">
              <strong className="text-slate-950">Crucial Advisory:</strong> LexBridge is a translation and language-access utility. Use of LexBridge does not constitute legal representation, legal advice, or the creation of an attorney-client relationship.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">2. Certification in Official Proceedings</h2>
            <p>
              While LexBridge aims for high contextual and terminological fidelity, official immigration tribunals (including the Executive Office for Immigration Review (EOIR), USCIS, and international refugee bodies) typically require submitted foreign-language evidence to be accompanied by a formal Certificate of Translation executed by a competent human translator (in accordance with 8 CFR § 1003.33).
            </p>
            <p>
              Users are solely responsible for having AI-generated translations reviewed, cross-referenced, and formally certified by qualified legal counsel or certified translators prior to submission into official judicial records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">3. Document Ownership &amp; Attorney Work Product</h2>
            <p>
              Users retain full, unencumbered ownership and copyright over all source documents, personal statements, declarations, and resulting translations processed through LexBridge.
            </p>
            <p>
              LexBridge claims no intellectual property rights or ownership interest in any case materials or asylum affidavits submitted by users.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">4. Permissible Use &amp; Prohibited Conduct</h2>
            <p>
              The platform is provided free of charge for humanitarian assistance, refugee casework, pro bono legal representation, and academic research. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Submit knowingly fraudulent evidence or fabricated declarations into legal proceedings.</li>
              <li>Attempt to reverse-engineer, disrupt, or exploit the platform infrastructure.</li>
              <li>Transmit materials containing malicious software, automated scraping bots, or network denial tools.</li>
              <li>Circumvent API quota limits or unauthorizedly harvest platform resources.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">5. Limitation of Liability</h2>
            <p>
              LexBridge is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the maximum extent permitted by applicable law, LexBridge and its contributors disclaim all warranties, express or implied, regarding translation completeness, judicial acceptance, or outcomes of asylum and immigration petitions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">6. Modifications &amp; Inquiries</h2>
            <p>
              These terms may be updated periodically to reflect evolving regulatory and technological standards. Direct inquiries regarding service terms to{" "}
              <a href="mailto:support@lexbridge.com" className="text-slate-950 font-medium underline">
                support@lexbridge.com
              </a>
              .
            </p>
          </section>
        </article>

        <div className="mt-12 pt-6 border-t border-[#E8DFC8] flex justify-between items-center text-sm text-slate-600">
          <Link href="/privacy" className="hover:text-slate-950 underline underline-offset-2">
            Review Privacy Policy
          </Link>
          <Link href="/translate" className="font-medium text-slate-950 hover:underline">
            Proceed to Translator &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
