import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check environment variables
    const googleGenAIKey = process.env.GOOGLE_GENAI_API_KEY
    const googleAPIKey = process.env.GOOGLE_API_KEY
    const nodeEnv = process.env.NODE_ENV

    const config = {
      hasGoogleGenAIKey: !!(googleGenAIKey && googleGenAIKey.trim() !== ""),
      hasGoogleAPIKey: !!(googleAPIKey && googleAPIKey.trim() !== ""),
      nodeEnv: nodeEnv || "unknown",
      timestamp: new Date().toISOString(),
    }

    // Determine if we have a valid API key
    const hasValidKey = config.hasGoogleGenAIKey || config.hasGoogleAPIKey

    return NextResponse.json({
      status: hasValidKey ? "configured" : "missing_keys",
      config: {
        ...config,
        // Don't expose actual keys, just their presence
        googleGenAIKeyLength: googleGenAIKey ? googleGenAIKey.length : 0,
        googleAPIKeyLength: googleAPIKey ? googleAPIKey.length : 0,
      },
      message: hasValidKey 
        ? "API keys are properly configured" 
        : "Missing required Google AI API keys",
      recommendations: hasValidKey ? [] : [
        "Set GOOGLE_GENAI_API_KEY environment variable",
        "Or set GOOGLE_API_KEY as fallback",
        "Ensure keys are valid and have proper permissions",
        "Check deployment environment configuration"
      ]
    })
  } catch (error) {
    console.error("Configuration check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Unable to check configuration",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
