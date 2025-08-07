import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get API key with multiple fallbacks
    const apiKey = process.env.GOOGLE_GENAI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    console.log("Translation request - API key check:", {
      hasGoogleGenAI: !!(process.env.GOOGLE_GENAI_API_KEY),
      hasGoogleAPI: !!(process.env.GOOGLE_API_KEY),
      hasPublicAPI: !!(process.env.NEXT_PUBLIC_GOOGLE_API_KEY),
      keyLength: apiKey ? apiKey.length : 0,
      nodeEnv: process.env.NODE_ENV
    })

    // Validate API key exists
    if (!apiKey || apiKey.trim() === "") {
      console.error("Translation failed: Missing API key")
      
      return NextResponse.json(
        {
          error: "Service Temporarily Unavailable",
          details: "The translation service is not properly configured in the deployment environment.",
          supportInfo: {
            email: "support@lexbridge.com",
            errorCode: "CONFIG_001",
            timestamp: new Date().toISOString()
          },
          recommendations: [
            "This is a deployment configuration issue",
            "The service works in development but needs API keys in production",
            "Please contact support for immediate assistance",
            "Expected resolution time: 24-48 hours"
          ],
          fallbackOptions: [
            "Use the sample text feature to test functionality",
            "Copy and paste text for manual translation",
            "Contact support for urgent translation needs"
          ]
        },
        { status: 503 },
      )
    }

    // Parse request body
    let requestData
    try {
      requestData = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid request format", details: "Unable to parse request body" },
        { status: 400 }
      )
    }

    const { text, sourceLang, targetLang, isLegal } = requestData

    if (!text || !targetLang) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        details: "Both 'text' and 'targetLang' are required" 
      }, { status: 400 })
    }

    // Validate text length
    if (text.length > 50000) {
      return NextResponse.json({ 
        error: "Text too long", 
        details: "Please limit to 50,000 characters.",
        currentLength: text.length,
        maxLength: 50000
      }, { status: 400 })
    }

    // Initialize Google AI client
    let genAI, model
    try {
      genAI = new GoogleGenerativeAI(apiKey)
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    } catch (initError) {
      console.error("Failed to initialize Google AI:", initError)
      return NextResponse.json(
        {
          error: "Service initialization failed",
          details: "Unable to initialize translation service",
          supportInfo: {
            email: "support@lexbridge.com",
            errorCode: "INIT_001"
          }
        },
        { status: 503 }
      )
    }

    const legalPrompt = `You are a professional legal translator specializing in asylum and immigration law. Translate the following document from ${sourceLang ? getLanguageName(sourceLang) : "the detected language"} into ${getLanguageName(targetLang)}, preserving all legal terminology and formatting. Do not simplify or omit any phrases. Maintain accuracy for named entities, dates, case numbers, and official titles. Use the tone and structure typical in official government or legal filings.

IMPORTANT: Provide ONLY the translation. Do not include any explanations, notes, or additional commentary.

Document to translate:
${text}`

    const standardPrompt = `Translate the following text from ${sourceLang ? getLanguageName(sourceLang) : "the detected language"} to ${getLanguageName(targetLang)}. Provide only the translation without any additional commentary:

${text}`

    const prompt = isLegal ? legalPrompt : standardPrompt

    try {
      console.log("Attempting translation with API key length:", apiKey.length)

      const result = await model.generateContent(prompt)
      const response = await result.response
      const translatedText = response.text()

      if (!translatedText || translatedText.trim().length === 0) {
        throw new Error("Empty response from AI model")
      }

      console.log("Translation successful, response length:", translatedText.length)

      // Assess translation quality
      const quality = assessTranslationQuality(text, translatedText)

      return NextResponse.json({
        translatedText: translatedText.trim(),
        quality,
        sourceLang: sourceLang || "auto",
        targetLang,
        success: true,
        metadata: {
          timestamp: new Date().toISOString(),
          textLength: text.length,
          translationLength: translatedText.length,
          isLegal
        }
      })
    } catch (aiError) {
      console.error("Google AI API error:", aiError)

      // Handle specific Google AI errors
      if (aiError instanceof Error) {
        const errorMessage = aiError.message.toLowerCase()

        if (
          errorMessage.includes("api key") ||
          errorMessage.includes("api_key") ||
          errorMessage.includes("authentication") ||
          errorMessage.includes("401")
        ) {
          return NextResponse.json(
            {
              error: "Authentication Error",
              details: "The API key is invalid or has insufficient permissions.",
              supportInfo: {
                email: "support@lexbridge.com",
                errorCode: "AUTH_001",
                timestamp: new Date().toISOString()
              },
              recommendations: [
                "API key may be invalid or expired",
                "Check Google AI API permissions",
                "Verify billing is enabled for the API key",
                "Contact support for immediate assistance"
              ]
            },
            { status: 401 },
          )
        }

        if (errorMessage.includes("quota") || errorMessage.includes("rate limit") || errorMessage.includes("429")) {
          return NextResponse.json(
            {
              error: "Service Temporarily Overloaded",
              details: "The translation service is currently at capacity. Please try again in a few minutes.",
              retryAfter: 60,
              supportInfo: {
                errorCode: "RATE_LIMIT_001",
                timestamp: new Date().toISOString()
              },
              recommendations: [
                "Wait 1-2 minutes before trying again",
                "Try translating smaller text segments",
                "Contact support for priority access"
              ]
            },
            { status: 429 },
          )
        }

        if (errorMessage.includes("model") || errorMessage.includes("not found") || errorMessage.includes("404")) {
          return NextResponse.json(
            {
              error: "Translation Model Unavailable",
              details: "The AI translation model is temporarily unavailable.",
              supportInfo: {
                email: "support@lexbridge.com",
                errorCode: "MODEL_001",
                timestamp: new Date().toISOString()
              },
              recommendations: [
                "This is a temporary service issue",
                "Try again in 5-10 minutes",
                "Contact support if issue persists"
              ]
            },
            { status: 503 },
          )
        }

        if (errorMessage.includes("blocked") || errorMessage.includes("safety")) {
          return NextResponse.json(
            {
              error: "Content Safety Filter",
              details: "The content could not be translated due to safety filters.",
              supportInfo: {
                errorCode: "CONTENT_001",
                timestamp: new Date().toISOString()
              },
              recommendations: [
                "Try rephrasing the content",
                "Remove any potentially sensitive information",
                "Contact support for assistance with legal documents"
              ]
            },
            { status: 400 },
          )
        }
      }

      return NextResponse.json(
        {
          error: "Translation Service Error",
          details: "An unexpected error occurred during translation.",
          supportInfo: {
            email: "support@lexbridge.com",
            errorCode: "AI_SERVICE_001",
            timestamp: new Date().toISOString()
          },
          debugInfo: process.env.NODE_ENV === "development" ? {
            error: aiError.message,
            apiKeyLength: apiKey.length
          } : undefined,
          recommendations: [
            "Try again in a few minutes",
            "Check your internet connection",
            "Contact support if the problem persists"
          ]
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("General translation error:", error)

    return NextResponse.json(
      {
        error: "System Error",
        details: "An unexpected system error occurred.",
        supportInfo: {
          email: "support@lexbridge.com",
          errorCode: "SYSTEM_001",
          timestamp: new Date().toISOString()
        },
        debugInfo: process.env.NODE_ENV === "development" ? {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined
        } : undefined,
        recommendations: [
          "Refresh the page and try again",
          "Check your internet connection",
          "Contact technical support for assistance"
        ]
      },
      { status: 500 },
    )
  }
}

function getLanguageName(code: string): string {
  const languages: { [key: string]: string } = {
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
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ne: "Nepali",
    hi: "Hindi",
    ur: "Urdu",
    auto: "Auto-detect",
  }
  return languages[code] || code
}

function assessTranslationQuality(source: string, translation: string): "high" | "medium" | "low" {
  if (!translation || translation.length === 0) return "low"

  const lengthRatio = translation.length / source.length
  const hasContent = translation.trim().length > 10

  // Check for legal terminology preservation
  const legalTerms = [
    "asylum",
    "persecution",
    "refugee",
    "application",
    "case",
    "court",
    "evidence",
    "solicitud",
    "asilo",
    "persecución",
    "शरण", // Nepali for asylum
    "उत्पीडन", // Nepali for persecution
  ]
  const sourceLower = source.toLowerCase()
  const translationLower = translation.toLowerCase()

  const hasLegalTerms = legalTerms.some((term) => sourceLower.includes(term) || translationLower.includes(term))

  if (lengthRatio > 0.5 && lengthRatio < 2.0 && hasContent && hasLegalTerms) {
    return "high"
  } else if (lengthRatio > 0.3 && lengthRatio < 3.0 && hasContent) {
    return "medium"
  } else {
    return "low"
  }
}
