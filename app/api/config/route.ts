import { NextResponse } from "next/server"

export async function GET() {
  // Server-side only: checks if the API key is configured without exposing it
  const hasKey = !!(
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_GENAI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim()
  )

  return NextResponse.json({
    status: hasKey ? "configured" : "missing_key",
    configuredInEnv: hasKey,
    message: hasKey
      ? "Gemini API key is configured."
      : "Set GEMINI_API_KEY in .env.local and restart the server.",
  })
}
