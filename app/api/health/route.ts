import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function GET() {
  const apiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENAI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim()

  if (!apiKey) {
    return NextResponse.json(
      {
        status: "missing_key",
        service: "translation",
        message: "GEMINI_API_KEY is not set in .env.local",
      },
      { status: 200 },
    )
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent("Respond with: OK")
    const text = result.response.text()

    if (text && text.trim().length > 0) {
      return NextResponse.json({
        status: "operational",
        service: "translation",
        message: "Gemini AI connection verified and operational.",
      })
    }

    return NextResponse.json({ status: "degraded", service: "translation", message: "API returned empty response." })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      { status: "api_error", service: "translation", message: msg },
      { status: 400 },
    )
  }
}
