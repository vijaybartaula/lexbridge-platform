import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import Link from "next/link"
import { LexBridgeMark, DocumentVaultIcon } from "@/components/ui/legal-icons"

export const metadata = {
  title: "Privacy Policy | LexBridge Legal Translation Platform",
  description: "Privacy policy and data protection commitments for asylum documents on LexBridge.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col text-slate-900">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-10 pb-6 border-b border-[#E8DFC8]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C6D3F] mb-2 font-semibold">
            <span>Security &amp; Compliance</span>
            <span>/</span>
            <span>Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Last Updated: March 2025 · Transparent data protection standards for asylum &amp; refugee documentation
          </p>
        </div>

        <article className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-800">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">1. Core Principle: Zero Retention Architecture</h2>
            <p>
              Asylum seekers and refugees frequently handle sensitive accounts of persecution, political opinions, and personal trauma. LexBridge is architected around a strict <strong>Zero-Retention Policy</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>No Document Database:</strong> LexBridge does not maintain any database or disk repository storing translated documents, source text, or case files.</li>
              <li><strong>In-Memory Processing:</strong> Text submitted for translation is processed ephemerally in server RAM solely for the duration required to complete the AI model call.</li>
              <li><strong>No Text Logging:</strong> Server application logs record transaction timestamps, character lengths, and error statuses, but explicitly exclude document contents.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">2. Processing via Google Generative AI</h2>
            <p>
              When a translation request is initiated, document text is dispatched via secure HTTPS/TLS encrypted channels directly to Google&rsquo;s Generative AI API (Gemini models) via our secure server-side infrastructure.
            </p>
            <p>
              The API key is strictly maintained in server-side configuration (<code className="text-xs bg-[#EFE6D2] px-1 py-0.5 rounded font-mono text-slate-900">.env.local</code>) and is never transmitted to, exposed in, or accessible by client-side browser sessions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">3. Local Browser Storage Usage</h2>
            <p>
              LexBridge utilizes your web browser&rsquo;s local storage exclusively for operational convenience:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>UI state preferences (such as previously selected source/target language pairs).</li>
              <li>LexBridge does <strong>not</strong> use tracking cookies, analytics pixels, or commercial surveillance mechanisms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">4. Recommendations for Legal Practitioners</h2>
            <p>
              When handling sensitive asylum client declarations under strict attorney-client privilege or protected witness testimony, legal representatives may choose to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Redact specific personally identifying numbers (such as Alien Registration Numbers or passport numbers) prior to translation.</li>
              <li>Substitute real names of vulnerable individuals with pseudonyms during draft translation, re-inserting official names upon final attorney review.</li>
              <li>Ensure accredited legal counsel conducts line-by-line verification before filing sworn statements in judicial records.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-950">5. Contact &amp; Privacy Inquiries</h2>
            <p>
              For technical inquiries or questions regarding our data architecture, reach our team at{" "}
              <a href="mailto:privacy@lexbridge.com" className="text-slate-950 font-medium underline">
                privacy@lexbridge.com
              </a>
              .
            </p>
          </section>
        </article>

        <div className="mt-12 pt-6 border-t border-[#E8DFC8] flex justify-between items-center text-sm text-slate-600">
          <Link href="/terms" className="hover:text-slate-950 underline underline-offset-2">
            Review Terms of Service
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
