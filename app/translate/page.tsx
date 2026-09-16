"use client"

import { useState } from "react"
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  LegalScalesIcon,
  LexiconTranslateIcon,
  DocumentVaultIcon,
  AttorneyReviewIcon,
  AsylumSealIcon,
} from "@/components/ui/legal-icons"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish (Español)", flag: "🇪🇸" },
  { code: "ne", name: "Nepali (नेपाली)", flag: "🇳🇵" },
  { code: "uk", name: "Ukrainian (Українська)", flag: "🇺🇦" },
  { code: "ht", name: "Haitian Creole (Kreyòl)", flag: "🇭🇹" },
  { code: "fa", name: "Dari / Persian (دری)", flag: "🇦🇫" },
  { code: "ps", name: "Pashto (پښتو)", flag: "🇦🇫" },
  { code: "ar", name: "Arabic (العربية)", flag: "🇸🇦" },
  { code: "so", name: "Somali (Soomaali)", flag: "🇸🇴" },
  { code: "am", name: "Amharic (አማርኛ)", flag: "🇪🇹" },
  { code: "ti", name: "Tigrinya (ትግርኛ)", flag: "🇪🇷" },
  { code: "fr", name: "French (Français)", flag: "🇫🇷" },
  { code: "sw", name: "Swahili (Kiswahili)", flag: "🇰🇪" },
  { code: "ur", name: "Urdu (اردو)", flag: "🇵🇰" },
  { code: "hi", name: "Hindi (हिन्दी)", flag: "🇮🇳" },
  { code: "ru", name: "Russian (Русский)", flag: "🇷🇺" },
]

// Pre-configured legal affidavits for testing
const sampleAffidavits = [
  {
    id: "spanish-i589",
    label: "Spanish — I-589 Asylum Statement",
    shortTitle: "Spanish (I-589)",
    sourceLang: "es",
    targetLang: "en",
    tag: "Form I-589",
    flag: "🇪🇸",
    text: `[DOCUMENTO DE MUESTRA PARA PRUEBAS — NO CONSTITUYE ASESORAMIENTO LEGAL]
DECLARACIÓN PERSONAL EN APOYO DE LA SOLICITUD DE ASILO (FORMULARIO I-589)

Yo presento esta declaración personal con el fin de exponer con veracidad mis circunstancias, experiencias individuales, observaciones y aspiraciones profesionales:

1. PERFIL PERSONAL Y OBJETIVOS
Soy una persona con un alto nivel de educación y competencias técnicas avanzadas, con un profundo interés en el emprendimiento, la tecnología y la innovación. Deseo construir una vida donde mis capacidades sean reconocidas y donde pueda contribuir de manera significativa a la sociedad y a la economía del país en el que busco establecerme.

2. OBSERVACIONES SOBRE EL MERCADO LABORAL Y EL DESARROLLO DE LA INTELIGENCIA ARTIFICIAL
En los últimos años, el rápido desarrollo de la inteligencia artificial ha modificado de manera sustancial el panorama laboral. He experimentado crecientes dificultades para encontrar un empleo adecuado a pesar de contar con múltiples títulos académicos y cualificaciones técnicas. Muchas oportunidades que tradicionalmente ofrecían vías de acceso para niveles iniciales o primeros pasos profesionales ahora parecen enfatizar de forma predominante una experiencia profesional extensa. Al mismo tiempo, la automatización y los sistemas asistidos por IA están alterando la naturaleza y el número de puestos convencionales disponibles para personas en mi etapa profesional.

3. VISIÓN DEL TRABAJO FUTURO Y EMPRENDIMIENTO
Comprendo que el futuro del trabajo implicará cada vez más que las personas supervisen, dirijan y ejerzan juicio crítico sobre sistemas y agentes de inteligencia artificial, en lugar de limitarse a realizar tareas convencionales. Esta perspectiva ha influido en mi decisión de orientarme hacia el emprendimiento y desarrollar una iniciativa emergente internacional en lugar de depender exclusivamente del empleo tradicional. Mi objetivo es utilizar mi formación académica, habilidades técnicas y ambiciones empresariales para crear iniciativas productivas y contribuir al país donde construya mi futuro.

4. DIFICULTADES SOCIALES Y HOSTILIDAD COMUNITARIA
No obstante, mis circunstancias también se han visto afectadas por dificultades dentro de mi propia comunidad. He experimentado situaciones de acoso, hostigamiento y hostilidad social, las cuales han tenido un impacto significativo en mi seguridad personal y sentido de pertenencia. Estas vivencias, unidas a la carencia de oportunidades significativas para mi desarrollo, han influido decisivamente en mi determinación de buscar un entorno diferente donde pueda vivir con seguridad, potenciar mis capacidades y alcanzar mis metas profesionales.

5. SOLICITUD DE PROTECCIÓN Y COMPROMISO CÍVICO
Solicito asilo porque deseo la oportunidad de vivir en un entorno seguro y estable donde pueda construir mi futuro sin temor a persecución ni a sufrir daños graves. Asimismo, aspiro a contribuir positivamente mediante el emprendimiento, la innovación tecnológica y la creación de empleo. Respeto plenamente las leyes e instituciones del país donde busco protección y tengo la firme intención de aportar valor a su sociedad en lugar de ser únicamente receptor de asistencia.

Comprendo que el asilo es una figura de protección legal sujeta a requisitos específicos y rigurosos, y me encuentro en plena disposición de suministrar información veraz y la evidencia correspondiente en respaldo de mis circunstancias y vivencias personales.`,
  },
  {
    id: "nepali-refugee",
    label: "Nepali — Refugee Declaration",
    shortTitle: "Nepali (Refugee)",
    sourceLang: "ne",
    targetLang: "en",
    tag: "Refugee Protocol",
    flag: "🇳🇵",
    text: `[परीक्षणको लागि नमुना कागजात — कानुनी सल्लाह वा वास्तविक न्यायिक कागजात होइन]
शरणार्थी तथा मानवीय संरक्षणको लागि व्यक्तिगत लिखित बयान

म मेरो वर्तमान अवस्था, व्यक्तिगत भोगाइ, प्रत्यक्ष अवलोकन तथा भविष्यका दृष्टिकोणहरू स्पष्ट रूपमा प्रस्तुत गर्दै यो लिखित बयान पेश गर्दछु:

१. व्यक्तिगत पृष्ठभूमि तथा उद्देश्य:
म उच्च शिक्षा हासिल गरेको र प्राविधिक रूपमा दक्ष व्यक्ति हुँ, जसको उद्यमशीलता, प्रविधि र नवप्रवर्तनमा गहिरो रुचि छ। म यस्तो जीवन निर्माण गर्न चाहन्छु जहाँ मेरो क्षमताको उचित कदर होस् र म आफू स्थापित हुन खोजेको देशको समाज र अर्थतन्त्रमा अर्थपूर्ण योगदान पुर्‍याउन सकूँ।

२. श्रम बजार र कृत्रिम बौद्धिकता सम्बन्धी अवलोकन:
पछिल्ला वर्षहरूमा कृत्रिम बौद्धिकता (AI) को द्रुततर विकासले रोजगारीको परिदृश्यमा उल्लेखनीय परिवर्तन ल्याएको छ। बहु-विषयक शैक्षिक योग्यता र प्राविधिक सीपहरू हुँदाहुँदै पनि मैले उपयुक्त रोजगारी पाउन निरन्तर कठिनाइ भोग्दै आएको छु। विगतमा नयाँ वा प्रारम्भिक तहका लागि खुला रहने अवसरहरूमा पनि अहिले व्यापक पूर्व-अनुभवलाई अत्यधिक प्राथमिकता दिने गरिएको देखिन्छ। यसका साथै स्वचालन र एआई-सहयोगी प्रणालीहरूले मेरो तहका जनशक्तिका लागि उपलब्ध परम्परागत भूमिकाहरूको स्वरूप र संख्या घटाइरहेका छन्।

३. कार्यक्षेत्रको भविष्य र अन्तर्राष्ट्रिय उद्यमशीलता:
मेरो बुझाइमा, भविष्यको कार्यक्षेत्र केवल सामान्य कार्यहरू सम्पादन गर्नुभन्दा पनि एआई प्रणाली र एजेन्टहरूको सुपरिवेक्षण, निर्देशन तथा विवेकपूर्ण निर्णय लिने दिशामा अघि बढ्नेछ। यसै यथार्थले मलाई परम्परागत रोजगारीमा मात्र निर्भर हुनुभन्दा उद्यमशीलता अपनाउन र अन्तर्राष्ट्रिय स्टार्टअप विकास गर्न प्रेरित गरेको छ। म आफ्नो शिक्षा, प्राविधिक सीप र उद्यमशीलताको सोचलाई प्रयोग गरेर उत्पादनशील कार्य गर्न र आफ्नो भविष्य निर्माण गर्ने देशमा सकारात्मक योगदान दिन चाहन्छु।

४. समुदायभित्रका सामाजिक कठिनाइ तथा दुर्व्यवहार:
यद्यपि, मेरो परिस्थिति आफ्नै समुदायभित्रका कठिनाइहरूबाट पनि गम्भीर रूपमा प्रभावित भएको छ। मैले सामाजिक दुर्व्यवहार (Bullying) र शत्रुतापूर्ण व्यवहारको सामना गर्नुपरेको छ, जसले मेरो व्यक्तिगत सुरक्षा र आत्मसम्मानमा गहिरो असर पारेको छ। यी अनुभवहरू र अर्थपूर्ण अवसरहरूको अभावले गर्दा म सुरक्षित वातावरणमा बाँच्न, आफ्नो क्षमता विकास गर्न र आफ्ना व्यावसायिक लक्ष्यहरू पूरा गर्न नयाँ स्थान खोज्न बाध्य भएको छु।

५. शरणको निवेदन तथा कानुनी प्रतिबद्धता:
म उत्पीडन वा गम्भीर क्षतिको डरबिना सुरक्षित र स्थिर वातावरणमा आफ्नो भविष्य निर्माण गर्न अवसर पाऊँ भनी शरण (Asylum) को लागि निवेदन गर्दछु। म उद्यमशीलता, प्रविधि, रोजगारी सिर्जना र नवप्रवर्तनमार्फत सकारात्मक योगदान पुर्‍याउन चाहन्छु। म आफूले संरक्षण खोजेको देशका कानुन र संस्थाहरूको पूर्ण सम्मान गर्दछु र केवल सहयोग लिने मात्र नभई समाजमा योगदान दिने दृढ इच्छा राख्दछु।

मलाई थाहा छ कि शरण एक विशिष्ट कानुनी आवश्यकतामा आधारित संरक्षण हो, र म आफ्ना व्यक्तिगत परिस्थितिहरू र अनुभवहरूबारे सत्यतथ्य जानकारी र आवश्यक प्रमाणहरू उपलब्ध गराउन तयार छु।`,
  },
  {
    id: "ukrainian-humanitarian",
    label: "Ukrainian — Humanitarian Declaration",
    shortTitle: "Ukrainian (Humanitarian)",
    sourceLang: "uk",
    targetLang: "en",
    tag: "Humanitarian Protection",
    flag: "🇺🇦",
    text: `[ЗРАЗОК ДОКУМЕНТА ДЛЯ ТЕСТУВАННЯ — НЕ Є ЮРИДИЧНОЮ КОНСУЛЬТАЦІЄЮ ЧИ ОФІЦІЙНИМ ПОЗОВОМ]
ЗАЯВА-ДЕКЛАРАЦІЯ НА ПІДТРИМКУ КЛОПОТАННЯ ПРО ГУМАНІТАРНИЙ ЗАХИСТ

Цим подається особиста декларація з метою правдивого викладення моїх життєвих обставин, особистого досвіду, спостережень та професійних намірів:

1. ОСВІТА ТА ПРОФЕСІЙНІ ПРАГНЕННЯ
Я є високоосвіченою та технічно кваліфікованою людиною зі стійким інтересом до підприємництва, технологій та інновацій. Я прагну побудувати життя, у якому мої здібності будуть визнані, та де я зможу зробити вагомий внесок у суспільний розвиток та економіку країни, у якій маю намір влаштувати своє майбутнє.

2. СПОСТЕРЕЖЕННЯ ЩОДО РОЗВИТКУ ШІ ТА РИНКУ ПРАЦІ
Останніми роками стрімкий розвиток технологій штучного інтелекту докорінно змінив структуру ринку праці. Я стикаюся з дедалі більшими перешкодами у пошуку належного працевлаштування, попри наявність кількох вищих освіт і підтверджених технічних навичок. Багато вакансій, які традиційно відкривали шлях для фахівців початкового або раннього кар'єрного етапу, наразі вимагають значного попереднього досвіду. Водночас автоматизація та системи на основі ШІ невпинно скорочують кількість традиційних посад, доступних спеціалістам на моєму кар'єрному рівні.

3. МАЙБУТНЄ РОБОТИ ТА СТАРТАП-ІНІЦІАТИВИ
Я усвідомлюю, що майбутнє праці дедалі більше вимагатиме не механічного виконання стандартних завдань, а нагляду, спрямування та винесення відповідальних суджень щодо дій агентів і систем штучного інтелекту. Це суттєво вплинуло на моє рішення займатися міжнародним підприємництвом і розвивати власний стартап замість виняткової залежності від традиційного найму. Я маю намір спрямувати свою освіту, технічний потенціал та енергію на створення корисного продукту та розвиток країни, де я прагну жити.

4. СОЦІАЛЬНІ СКЛАДНОЩІ ТА ВОРОЖІСТЬ У ГРОМАДІ
Водночас на мої обставини суттєво вплинули складнощі всередині моєї місцевої спільноти. Я зазнав(ла) цькування (булінгу) та соціальної ворожості, що завдало значного удару по моєму почуттю безпеки та приналежності. Цей травматичний досвід у поєднанні з відсутністю реальних перспектив для розвитку спонукав мене до рішення шукати інше, безпечне середовище, де я зможу вільно жити, розкривати свій потенціал і досягати професійних цілей.

5. КЛОПОТАННЯ ПРО ЗАХИСТ ТА ПОВАГА ДО ЗАКОНУ
Я звертаюся за притулком, оскільки потребую можливості жити в безпечному та стабільному суспільстві, будуючи майбутнє без страху переслідування або серйозної шкоди. Я щиро сподіваюся робити позитивний внесок через підприємництво, технології, створення нових робочих місць та інновації. Я глибоко поважаю закони та державні інституції країни, де прошу захисту, і маю твердий намір бути корисним членом її суспільства, а не просто отримувачем підтримки.

Я усвідомлюю, що надання притулку є правовим механізмом із чіткими законодавчими вимогами, і я готовий(а) надати повну, правдиву інформацію та відповідні докази щодо моїх особистих обставин.`,
  },
]

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("auto")
  const [targetLang, setTargetLang] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [quality, setQuality] = useState<"high" | "medium" | "low" | null>(null)
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()

  // Load a pre-configured legal affidavit for testing
  const loadSample = (sample: (typeof sampleAffidavits)[0]) => {
    setSourceText(sample.text)
    setSourceLang(sample.sourceLang)
    setTargetLang(sample.targetLang)
    setTranslatedText("")
    setQuality(null)
    setErrorMessage(null)
    setActiveSampleId(sample.id)

    toast({
      title: "Sample Affidavit Loaded",
      description: `Loaded ${sample.label} for translation testing.`,
    })
  }

  // Handle live translation through the secure backend API
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter or select a sample legal document to translate.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)
    setTranslatedText("")
    setQuality(null)
    setErrorMessage(null)

    try {
      // Backend translation call - server-side authentication
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang: sourceLang === "auto" ? undefined : sourceLang,
          targetLang,
          isLegal: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorDesc = data.details || data.error || "Translation request failed."
        setErrorMessage(errorDesc)
        throw new Error(errorDesc)
      }

      if (data.success && data.translatedText) {
        setTranslatedText(data.translatedText)
        setQuality(data.quality || "high")
        toast({
          title: "Translation Complete",
          description: `Document successfully translated into ${
            languages.find((l) => l.code === targetLang)?.name || targetLang
          }.`,
        })
      }
    } catch (err) {
      const desc = err instanceof Error ? err.message : "Translation request failed."
      toast({
        title: "Translation Error",
        description: desc,
        variant: "destructive",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = () => {
    if (!translatedText) return
    const textWithNotice = `${translatedText}\n\n[Notice: AI-assisted legal translation via LexBridge. Certification for official proceedings requires accredited verification per 8 CFR § 1003.33.]`
    navigator.clipboard.writeText(textWithNotice)
    toast({
      title: "Copied to Clipboard",
      description: "Translation copied with judicial verification notice.",
    })
  }

  const handleDownload = () => {
    if (!translatedText) return
    const blob = new Blob(
      [
        `${translatedText}\n\n========================================\nLexBridge Evidentiary Translation Platform\nDate: ${new Date().toISOString()}\nTarget Language: ${targetLang}\nNotice: AI translation; review by accredited representative recommended for judicial records.\n========================================`,
      ],
      { type: "text/plain;charset=utf-8" },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `LexBridge_Translation_${targetLang}_${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setSourceText("")
    setTranslatedText("")
    setQuality(null)
    setActiveSampleId(null)
    setErrorMessage(null)
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col text-slate-900">
      <Navigation />

      <main className="flex-1 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Workbench Header - Clean, without any engine active indicator */}
        <div className="py-6 border-b border-[#E8DFC8] mb-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-600 mb-1">
            <span className="text-[#8C6D3F] font-semibold">Casework Workbench</span>
            <span>/</span>
            <span>Asylum &amp; Evidentiary Translator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
            Legal Document Translation
          </h1>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Specialized neural translation engineered for asylum statements, affidavits, and humanitarian declarations.
          </p>
        </div>

        {/* ─── TESTING SECTION: PRE-CONFIGURED LEGAL AFFIDAVITS ────────────── */}
        <section className="mb-8 p-5 sm:p-6 bg-[#FAF5E6] border border-[#E2D6BC] rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pb-3 border-b border-[#E8DFC8]">
            <div className="flex items-center gap-2.5">
              <LegalScalesIcon size={18} className="text-[#8C6D3F]" />
              <h2 className="text-sm sm:text-base font-bold font-serif text-slate-950 uppercase tracking-wide">
                Load Pre-Configured Legal Affidavits for Testing
              </h2>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#EFE6D2] text-[#785B30] border border-[#DFCFAA]">
              Sample / Demo Documents Only
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Select a sample affidavit below to populate the workbench and test live translation. These documents are fictionalized test scenarios distinguishing personal experiences, observations, and opinions, and do <strong>not</strong> constitute real legal filings or legal advice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sampleAffidavits.map((sample) => {
              const isSelected = activeSampleId === sample.id
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => loadSample(sample)}
                  className={`text-left p-4 rounded-md border transition-all ${
                    isSelected
                      ? "bg-white border-[#8C6D3F] shadow-sm ring-1 ring-[#8C6D3F]"
                      : "bg-[#FFF8E7] border-[#E2D6BC] hover:bg-white hover:border-[#D0BF9C]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base" role="img" aria-label={sample.label}>
                        {sample.flag}
                      </span>
                      <span className="text-xs font-semibold text-slate-950 font-serif">
                        {sample.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EFE6D2] text-slate-700">
                      {sample.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    Personal statement on tech automation, experience barriers, and community dynamics.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 text-[11px] text-[#8C6D3F] font-medium">
                    <span>Click to load</span>
                    <span aria-hidden="true">&rarr;</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* ─── ERROR ADVISORY (IF ANY) ────────────────────────────────────── */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-900 rounded-md flex items-start justify-between gap-3 text-sm">
            <div className="space-y-1">
              <div className="font-semibold text-red-950">Translation Notice</div>
              <p className="text-xs text-red-800">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-700 hover:text-red-950 text-xs font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ─── WORKBENCH TRANSLATION CONTROLS ─────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#FAF5E6] border border-[#E2D6BC] rounded-t-lg">
          <div className="flex flex-wrap items-center gap-3">
            {/* Source Language */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600">Source:</span>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger className="w-[180px] h-9 text-xs bg-white border-[#E2D6BC] text-slate-900">
                  <SelectValue placeholder="Auto-detect" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#E2D6BC]">
                  <SelectItem value="auto">Auto-detect Language</SelectItem>
                  {languages.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      <span className="mr-1.5">{l.flag}</span>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span className="text-slate-400">&rarr;</span>

            {/* Target Language */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600">Target:</span>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-[180px] h-9 text-xs bg-white border-[#E2D6BC] text-slate-900 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#E2D6BC]">
                  {languages.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      <span className="mr-1.5">{l.flag}</span>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(sourceText || translatedText) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-slate-600 hover:text-slate-950 hover:bg-[#EFE6D2]"
              >
                Clear All
              </Button>
            )}

            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-5 h-9 gap-2 shadow-sm"
            >
              <LexiconTranslateIcon size={14} />
              {isTranslating ? "Translating Document..." : "Translate Document"}
            </Button>
          </div>
        </div>

        {/* ─── WORKBENCH DUAL COLUMNS (SOURCE & TRANSLATION) ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-x border-b border-[#E2D6BC] bg-white rounded-b-lg shadow-sm overflow-hidden">
          {/* Source Column */}
          <div className="p-5 flex flex-col border-b lg:border-b-0 lg:border-r border-[#E2D6BC] min-h-[440px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0E8D6] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono uppercase text-slate-600 tracking-wider">Source Document</span>
                {activeSampleId && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FAF5E6] border border-[#E2D6BC] text-[#8C6D3F]">
                    Sample Loaded
                  </span>
                )}
              </div>
              <span className="text-slate-500 font-mono text-[11px]">
                {sourceText.length} characters
              </span>
            </div>

            <Textarea
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value)
                setActiveSampleId(null)
              }}
              placeholder="Enter or paste legal declaration, affidavit, or witness testimony here, or choose a pre-configured sample above..."
              className="flex-1 resize-none border-0 p-0 text-sm sm:text-[15px] font-mono leading-relaxed focus-visible:ring-0 shadow-none text-slate-900 placeholder:text-slate-400 min-h-[360px]"
            />
          </div>

          {/* Translation Column */}
          <div className="p-5 flex flex-col bg-[#FFFDF9] min-h-[440px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8DFC8] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono uppercase text-slate-600 tracking-wider">
                  Target Translation
                </span>
                {quality && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold">
                    {quality.toUpperCase()} QUALITY
                  </span>
                )}
              </div>

              {translatedText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-xs text-slate-600 hover:text-slate-950 font-medium px-2 py-1 rounded hover:bg-[#FAF5E6] transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="text-xs text-slate-600 hover:text-slate-950 font-medium px-2 py-1 rounded hover:bg-[#FAF5E6] transition-colors"
                  >
                    Download .txt
                  </button>
                </div>
              )}
            </div>

            {isTranslating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-8 h-8 border-2 border-[#8C6D3F] border-t-transparent rounded-full animate-spin" />
                <div className="space-y-1">
                  <p className="font-serif text-sm font-semibold text-slate-900">
                    Executing Neural Legal Translation
                  </p>
                  <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                    Analyzing evidentiary statements and applying international refugee law terminology...
                  </p>
                </div>
              </div>
            ) : translatedText ? (
              <div className="flex-1 flex flex-col justify-between">
                <div className="text-sm sm:text-[15px] font-mono leading-relaxed text-slate-900 whitespace-pre-wrap space-y-3">
                  {translatedText}
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8DFC8] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Standard 8 CFR § 1003.33 certification disclaimer attached</span>
                  <span className="font-mono">{translatedText.length} characters</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <LexiconTranslateIcon size={36} className="text-slate-300 mb-3" />
                <p className="font-serif text-sm font-medium text-slate-600">
                  Awaiting Translation
                </p>
                <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                  Select a sample affidavit above or paste a foreign-language legal statement, then click &ldquo;Translate Document&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ─── PROCEDURAL & EVIDENTIARY NOTES ─────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-md bg-[#FAF5E6] border border-[#E2D6BC]">
            <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
              <DocumentVaultIcon size={14} className="text-[#8C6D3F]" />
              <span>Zero Document Retention</span>
            </div>
            <p className="leading-relaxed">
              Submissions are handled strictly in-memory by the backend without persistent database storage or training data capture.
            </p>
          </div>

          <div className="p-4 rounded-md bg-[#FAF5E6] border border-[#E2D6BC]">
            <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
              <AttorneyReviewIcon size={14} className="text-[#8C6D3F]" />
              <span>Counsel Cross-Verification</span>
            </div>
            <p className="leading-relaxed">
              Designed for parallel-column review so accredited attorneys and court interpreters can audit terminology against original testimonies.
            </p>
          </div>

          <div className="p-4 rounded-md bg-[#FAF5E6] border border-[#E2D6BC]">
            <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
              <AsylumSealIcon size={14} className="text-[#8C6D3F]" />
              <span>Judicial Certification Notice</span>
            </div>
            <p className="leading-relaxed">
              Official filings before immigration courts require a signed Certificate of Translation pursuant to 8 CFR § 1003.33.
            </p>
          </div>
        </div>
      </main>

      {/* ─── SHARED FOOTER (WITH /terms AND /privacy) ───────────────────── */}
      <Footer />
    </div>
  )
}
