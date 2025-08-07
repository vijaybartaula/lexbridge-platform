import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check for API keys with multiple fallbacks
    const apiKey = process.env.GOOGLE_GENAI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    console.log("Health check - API key status:", {
      hasGoogleGenAI: !!(process.env.GOOGLE_GENAI_API_KEY),
      hasGoogleAPI: !!(process.env.GOOGLE_API_KEY),
      hasPublicAPI: !!(process.env.NEXT_PUBLIC_GOOGLE_API_KEY),
      keyLength: apiKey ? apiKey.length : 0,
      nodeEnv: process.env.NODE_ENV
    })

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        {
          status: "configuration_error",
          service: "translation",
          message: "API key not configured in deployment environment",
          timestamp: new Date().toISOString(),
          debug: {
            hasGoogleGenAI: !!(process.env.GOOGLE_GENAI_API_KEY),
            hasGoogleAPI: !!(process.env.GOOGLE_API_KEY),
            hasPublicAPI: !!(process.env.NEXT_PUBLIC_GOOGLE_API_KEY),
            nodeEnv: process.env.NODE_ENV,
          },
          recommendations: [
            "Configure GOOGLE_GENAI_API_KEY environment variable",
            "Ensure API key has proper permissions",
            "Check deployment platform environment settings",
            "Contact support@lexbridge.com for assistance"
          ]
        },
        { status: 503 },
      )
    }

    // Test the API with a simple request
    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const testResult = await model.generateContent("Say 'API test successful'")
      const response = await testResult.response
      const text = response.text()

      if (text && text.trim().length > 0) {
        return NextResponse.json({
          status: "operational",
          service: "translation",
          message: "Service is working correctly",
          timestamp: new Date().toISOString(),
          testResponse: text.trim(),
          apiKeyLength: apiKey.length,
        })
      } else {
        return NextResponse.json(
          {
            status: "degraded",
            service: "translation",
            message: "API responding but with empty results",
            timestamp: new Date().toISOString(),
            apiKeyLength: apiKey.length,
          },
          { status: 503 },
        )
      }
    } catch (apiError) {
      console.error("Google AI API error during health check:", apiError)
      
      return NextResponse.json(
        {
          status: "api_error",
          service: "translation",
          message: "Google AI API error",
          timestamp: new Date().toISOString(),
          error: apiError instanceof Error ? apiError.message : "Unknown API error",
          apiKeyLength: apiKey.length,
          recommendations: [
            "Verify API key is valid and active",
            "Check Google AI API quotas and billing",
            "Ensure API key has Generative AI permissions",
            "Try regenerating the API key"
          ]
        },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "system_error",
        service: "translation",
        message: "System error during health check",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown system error",
      },
      { status: 500 },
    )
  }
}
