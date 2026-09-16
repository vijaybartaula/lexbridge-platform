import Link from "next/link"
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import {
  LexBridgeMark,
  LegalScalesIcon,
  LexiconTranslateIcon,
  DocumentVaultIcon,
  AsylumSealIcon,
  DossierIcon,
  AttorneyReviewIcon,
} from "@/components/ui/legal-icons"

export const metadata = {
  title: "LexBridge | Legal Translation Platform for Asylum & Human Rights",
  description:
    "Specialized neural language translation for refugee declarations, asylum documentation, and humanitarian casework.",
}

export default function HomePage() {
  const workflowStages = [
    {
      step: "01",
      title: "Document Ingestion & Dialect Identification",
      description:
        "Processes narrative testimonies, police reports, and official notices across 16+ languages — including low-resource dialects such as Dari, Pashto, Haitian Creole, Ukrainian, and Nepali.",
      icon: <DossierIcon size={22} className="text-slate-800" />,
    },
    {
      step: "02",
      title: "Legal Terminology & Context Preservation",
      description:
        "Instructs the translation engine on international refugee law conventions to preserve critical criteria — 'well-founded fear', 'particular social group', and official jurisdictional citations.",
      icon: <LexiconTranslateIcon size={22} className="text-slate-800" />,
    },
    {
      step: "03",
      title: "Side-by-Side Counsel Verification",
      description:
        "Generates structured parallel-column outputs allowing accredited representatives, pro bono attorneys, and interpreters to cross-reference statements prior to client signature.",
      icon: <AttorneyReviewIcon size={22} className="text-slate-800" />,
    },
    {
      step: "04",
      title: "Evidentiary Export & Certification Disclaimers",
      description:
        "Outputs clean plain text bundled with standardized judicial disclaimers per 8 CFR § 1003.33 for certification by legal counsel.",
      icon: <AsylumSealIcon size={22} className="text-slate-800" />,
    },
  ]

  const technicalSpecs = [
    { label: "AI Engine", value: "Neural Evidentiary Translation Pipeline" },
    { label: "Data Retention", value: "Zero storage; ephemeral in-memory processing" },
    { label: "Max Segment Capacity", value: "50,000 characters per pass" },
    { label: "Target Jurisdictions", value: "USCIS, EOIR, UNHCR, regional tribunals" },
    { label: "License", value: "Open humanitarian access — MIT" },
  ]

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col text-slate-900">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* ─── HERO SECTION (COSMIC LATTE THEME) ────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8E7] via-[#FAF5E6] to-[#F5EEDC] border-b border-[#E8DFC8]">
          {/* Subtle cosmic paper texture lines */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 29px, #785B30 29px, #785B30 30px)",
            }}
          />

          {/* Warm left accent border */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#B89668]" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-18 lg:py-20">
            <div className="max-w-4xl">
              {/* Category label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE6D2] border border-[#DFCFA] text-xs font-mono uppercase tracking-[0.16em] text-slate-800 mb-6">
                <LegalScalesIcon size={13} className="text-[#8C6D3F]" />
                Humanitarian Legal Technology
              </div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-slate-950 leading-[1.12] tracking-tight mb-6">
                High-Fidelity Legal Translation for Asylum &amp; Human&nbsp;Rights Filings
              </h1>

              {/* Supporting copy */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed max-w-3xl mb-8">
                LexBridge provides specialized neural language translation for refugees, immigration advocates, and legal aid clinics — preserving legal precision, official case references, and persecution testimonies across complex judicial language pairs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/translate"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 shadow-sm transition-colors"
                >
                  <LexiconTranslateIcon size={17} />
                  Launch Document Translator
                </Link>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-[#D8CDAF] bg-[#FFF8E7]/80 hover:bg-[#FFF8E7] text-slate-800 font-medium text-sm transition-colors"
                >
                  Review Asylum Workflow
                </a>
              </div>

              {/* Language chip row */}
              <div className="flex flex-wrap items-center gap-2 mt-10">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mr-1">
                  Supported Languages:
                </span>
                {[
                  "Spanish", "Nepali", "Ukrainian", "Dari", "Pashto",
                  "Arabic", "Haitian Creole", "Amharic", "Somali", "French",
                ].map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono text-slate-800 border border-[#E2D6BC] bg-[#F8F1DE]"
                  >
                    {lang}
                  </span>
                ))}
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#8C6D3F] border border-[#D5C29E] bg-[#EFE6D2] font-semibold">
                  +6 more
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SAMPLE AFFIDAVIT SHOWCASE ─────────────────────────────────── */}
        <section className="py-14 sm:py-16 border-b border-[#E8DFC8] bg-[#FAF5E6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3F] font-semibold">
                  Functional Demonstration
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 mt-1">
                  Context-Aware Translation of Asylum Affidavits
                </h2>
                <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
                  Legal terminology and evidentiary structure are preserved from the original testimony into the official English filing standard.
                </p>
              </div>
              <Link
                href="/translate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-[#8C6D3F] transition-colors underline underline-offset-4 shrink-0"
              >
                <span>Try live with sample affidavits</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-[#E2D6BC] rounded-md shadow-sm overflow-hidden">
              {/* Spanish Source */}
              <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-r border-[#E8DFC8]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    Source · Spanish (Sample Statement)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4ECE0] text-slate-800 font-mono font-medium">
                    I-589 Format
                  </span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3">
                  <p className="font-semibold text-slate-950">
                    DECLARACIÓN PERSONAL EN APOYO DE LA SOLICITUD DE ASILO
                  </p>
                  <p>
                    &ldquo;A pesar de contar con múltiples títulos académicos y competencias técnicas, he experimentado dificultades continuas para acceder al empleo convencional. En mi observación, algunos empleadores utilizan progresivamente la automatización para reducir puestos de nivel inicial. Asimismo, en mi comunidad he experimentado situaciones de acoso y marginación social.&rdquo;
                  </p>
                  <p className="text-slate-400 text-xs font-sans italic">
                    Nota: Documento de prueba pre-configurado para traducción asistida por IA.
                  </p>
                </div>
              </div>

              {/* English Output */}
              <div className="p-6 sm:p-7 bg-[#FFFDF9]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8DFC8]">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    Output · English (Legal Register)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-semibold">
                    High Fidelity
                  </span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-900 leading-relaxed space-y-3">
                  <p className="font-semibold text-slate-950">
                    PERSONAL STATEMENT IN SUPPORT OF APPLICATION FOR ASYLUM
                  </p>
                  <p>
                    &ldquo;Despite possessing multiple academic degrees and technical competencies, I have experienced continuous difficulties obtaining conventional employment. In my observation, some employers increasingly utilize automation to reduce entry-level positions. Furthermore, within my community, I have experienced instances of harassment and social marginalization.&rdquo;
                  </p>
                  <p className="text-emerald-700 text-xs font-sans">
                    ✓ Preserves clear distinction between personal experiences, observations, and opinions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WORKFLOW SECTION ───────────────────────────────────────────── */}
        <section id="workflow" className="py-16 sm:py-20 border-b border-[#E8DFC8] bg-[#FFF8E7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3F] font-semibold">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 mt-1">
                The Four-Stage Evidentiary Pipeline
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Designed to bridge language barriers while preserving procedural safeguards required in asylum and immigration tribunals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowStages.map((stage) => (
                <div
                  key={stage.step}
                  className="bg-white border border-[#E2D6BC] p-6 rounded-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#8C6D3F]">
                        STAGE {stage.step}
                      </span>
                      <div className="p-2 bg-[#FAF5E6] rounded-md">
                        {stage.icon}
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-950 mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ARCHITECTURE & TECHNICAL SPECS ─────────────────────────────── */}
        <section id="whitepaper" className="py-16 sm:py-20 border-b border-[#E8DFC8] bg-[#FAF5E6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3F] font-semibold">
                  Technical Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                  Built for Ethical Legal AI &amp; Evidentiary Integrity
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Asylum cases involve individuals facing severe persecution, violence, and displacement. LexBridge enforces zero persistent server-side document retention, processing all translation requests ephemerally in-memory.
                </p>
                <div className="p-4 rounded-md bg-[#FFF8E7] border border-[#E2D6BC] space-y-2 text-xs text-slate-700">
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    <DocumentVaultIcon size={16} className="text-[#8C6D3F]" />
                    <span>Confidentiality Safeguards</span>
                  </div>
                  <p>
                    All API communications are encrypted in transit. Source text is never stored in persistent databases or used for secondary training without explicit authorization.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white border border-[#E2D6BC] rounded-md p-6 sm:p-7 shadow-sm">
                  <h3 className="font-serif font-bold text-base text-slate-950 pb-4 border-b border-[#E8DFC8] mb-4">
                    System Specifications
                  </h3>
                  <dl className="space-y-4">
                    {technicalSpecs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center text-xs sm:text-sm gap-4">
                        <dt className="text-slate-500 font-mono">{spec.label}</dt>
                        <dd className="font-semibold text-slate-900 text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── READY TO TRANSLATE CTA ─────────────────────────────────────── */}
        <section className="py-16 bg-gradient-to-r from-[#F5EEDC] via-[#FAF5E6] to-[#FFF8E7] border-b border-[#E8DFC8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950 mb-3">
              Begin Translating Legal Casework
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Accessible to legal aid organizations, pro bono advocates, community interpreters, and asylum applicants worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/translate"
                className="px-6 py-3.5 rounded-md bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 shadow-sm transition-colors inline-flex items-center justify-center gap-2"
              >
                <LexiconTranslateIcon size={16} />
                Launch Document Translator
              </Link>
              <Link
                href="/terms"
                className="px-6 py-3.5 rounded-md border border-[#D8CDAF] bg-white text-slate-800 font-medium text-sm hover:bg-[#FFF8E7] transition-colors"
              >
                View Terms of Service
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── SHARED FOOTER (WITH /terms AND /privacy) ───────────────────── */}
      <Footer />
    </div>
  )
}
