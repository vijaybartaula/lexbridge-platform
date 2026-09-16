import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// This route executes strictly on the server.
// The Gemini API key is accessed exclusively via server-side environment variables (.env.local)
// and is NEVER exposed to the frontend or via any client-side NEXT_PUBLIC_* variable.
export async function POST(request: NextRequest) {
  // Resolve API key strictly from server environment
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_API_KEY

  if (!apiKey || apiKey.trim() === "") {
    console.error("[LexBridge API] GEMINI_API_KEY is not configured in .env.local")
    return NextResponse.json(
      {
        error: "Translation service unavailable",
        details: "GEMINI_API_KEY is missing on the server. Please check .env.local.",
      },
      { status: 503 },
    )
  }

  let requestData: { text?: string; sourceLang?: string; targetLang?: string; isLegal?: boolean } = {}
  try {
    requestData = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
  }

  const { text, sourceLang, targetLang, isLegal = true } = requestData

  if (!text || !text.trim() || !targetLang) {
    return NextResponse.json(
      { error: "Missing required parameters", details: "Both 'text' and 'targetLang' are required." },
      { status: 400 },
    )
  }

  if (text.length > 50000) {
    return NextResponse.json(
      { error: "Payload limit exceeded", details: "Document text must not exceed 50,000 characters." },
      { status: 400 },
    )
  }

  let genAI: GoogleGenerativeAI
  try {
    genAI = new GoogleGenerativeAI(apiKey.trim())
  } catch (err) {
    console.error("[LexBridge API] GoogleGenerativeAI initialization error:", err)
    return NextResponse.json({ error: "Failed to initialize translation engine" }, { status: 500 })
  }

  const sourceName = sourceLang && sourceLang !== "auto" ? getLanguageName(sourceLang) : "the detected source language"
  const targetName = getLanguageName(targetLang)

  const prompt = isLegal
    ? `You are an accredited legal translator specializing in asylum affidavits, refugee declarations, and human rights evidentiary documentation.

Translate the following legal affidavit/statement from ${sourceName} into ${targetName}.

Strict Translation Guidelines:
1. Maintain exact legal and judicial terminology fidelity (e.g. well-founded fear, persecution, particular social group, political opinion, evidentiary documentation).
2. Clearly preserve the author's distinction between personal experiences, direct observations, and personal opinions or beliefs.
3. Preserve all paragraph numbering, structure, and formal legal formatting verbatim.
4. Do not embellish, summarize, interpret, or omit any text.
5. Provide ONLY the translated document text. Do not include markdown preamble, translator notes, or conversational intros/outros.

Document to translate:
${text}`
    : `Translate the following text faithfully from ${sourceName} into ${targetName}. Maintain professional register and sentence structure. Provide only the translated content:

${text}`

  // Supported models in priority order
  const modelCandidates = [
    "gemini-3.6-flash",
    "gemini-3.7-flash",
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash",
  ]

  let translatedText = ""
  let modelUsed = ""
  let lastError: unknown = null

  for (const modelName of modelCandidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      const rawOutput = result.response.text()
      if (rawOutput && rawOutput.trim().length > 0) {
        translatedText = rawOutput.trim()
        modelUsed = modelName
        break
      }
    } catch (err) {
      lastError = err
      console.warn(`[LexBridge API] Model candidate ${modelName} encountered error:`, err)
    }
  }

  if (!translatedText) {
    const errorMsg = lastError instanceof Error ? lastError.message.toLowerCase() : ""

    if (
      errorMsg.includes("api_key") ||
      errorMsg.includes("api key") ||
      errorMsg.includes("401") ||
      errorMsg.includes("unauthenticated")
    ) {
      return NextResponse.json(
        { error: "Invalid API key", details: "The server's GEMINI_API_KEY is invalid or unauthorized." },
        { status: 401 },
      )
    }

    if (errorMsg.includes("quota") || errorMsg.includes("429") || errorMsg.includes("resource_exhausted")) {
      return NextResponse.json(
        { error: "Rate limit reached", details: "Gemini API rate limit reached. Please retry in a few moments." },
        { status: 429 },
      )
    }

    console.error("[LexBridge API] All Gemini translation models failed. Last error:", lastError)
    return NextResponse.json(
      {
        error: "Translation failed",
        details: lastError instanceof Error ? lastError.message : "All Gemini model candidates failed to return output.",
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    success: true,
    translatedText,
    quality: assessTranslationQuality(text, translatedText),
    sourceLang: sourceLang || "auto",
    targetLang,
    modelUsed,
    metadata: {
      timestamp: new Date().toISOString(),
      sourceLength: text.length,
      translatedLength: translatedText.length,
      isLegal,
    },
  })
}

function getLanguageName(code: string): string {
  const map: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    ar: "Arabic",
    fa: "Persian (Dari)",
    ps: "Pashto",
    so: "Somali",
    sw: "Swahili",
    am: "Amharic",
    ti: "Tigrinya",
    uk: "Ukrainian",
    ht: "Haitian Creole",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ne: "Nepali",
    hi: "Hindi",
    ur: "Urdu",
  }
  return map[code] || code
}

function assessTranslationQuality(source: string, target: string): "high" | "medium" | "low" {
  if (!target || target.length < 10) return "low"
  const ratio = target.length / Math.max(source.length, 1)
  if (ratio > 0.35 && ratio < 2.5) return "high"
  if (ratio > 0.2 && ratio < 3.5) return "medium"
  return "low"
}
