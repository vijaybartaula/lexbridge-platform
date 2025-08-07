"use client"

import { useState } from "react"
import { Languages, Download, AlertCircle, CheckCircle, Loader2, Zap, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ServiceStatus } from "@/components/ui/service-status"

// Safe navigation component that handles undefined props
function SafeNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Languages className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                LexBridge
              </span>
              <p className="text-xs text-gray-500 -mt-1 font-medium">Legal Translation Platform</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    </nav>
  )
}

// Safe header component
function SafeHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="relative z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                    <Languages className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Legal Translation</h1>
                  <p className="text-lg text-gray-600 mt-1">AI-powered legal document translation</p>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Transform legal documents with precision and speed. Our specialized AI ensures accurate translations while maintaining legal terminology and formatting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "fa", name: "Persian (Dari)", flag: "🇦🇫" },
  { code: "ps", name: "Pashto", flag: "🇦🇫" },
  { code: "so", name: "Somali", flag: "🇸🇴" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
  { code: "am", name: "Amharic", flag: "🇪🇹" },
  { code: "ti", name: "Tigrinya", flag: "🇪🇷" },
  { code: "ne", name: "Nepali", flag: "🇳🇵" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
]

type TranslationQuality = "high" | "medium" | "low"

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("auto")
  const [targetLang, setTargetLang] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationQuality, setTranslationQuality] = useState<TranslationQuality | null>(null)
  const [lastError, setLastError] = useState<any>(null)
  const { toast } = useToast()

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text first.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)
    setTranslationQuality(null)
    setTranslatedText("")
    setLastError(null)

    try {
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
        setLastError(data)
        throw new Error(data.error || "Translation failed")
      }

      if (data.success && data.translatedText) {
        setTranslatedText(data.translatedText)
        setTranslationQuality(data.quality || "high")

        toast({
          title: "Translation completed",
          description: "Your legal document has been translated successfully.",
        })
      } else {
        throw new Error("No translation received")
      }
    } catch (error) {
      console.error("Translation error:", error)

      let errorMessage = "Translation failed. Please try again."
      let supportInfo = ""

      if (error instanceof Error) {
        if (
          error.message.includes("Service Temporarily Unavailable") ||
          error.message.includes("configuration")
        ) {
          errorMessage = error.message
          supportInfo = "This is a deployment configuration issue. Please contact support@lexbridge.com"
        } else if (error.message.includes("Authentication")) {
          errorMessage = "Service configuration issue. Please contact technical support."
          supportInfo = "Error Code: AUTH_001 | Email: support@lexbridge.com"
        } else if (error.message.includes("overloaded")) {
          errorMessage = "Service is currently busy. Please try again in a few minutes."
        }
      }

      toast({
        title: "Translation Error",
        description: errorMessage + (supportInfo ? ` ${supportInfo}` : ""),
        variant: "destructive",
        duration: 10000,
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const downloadTranslation = () => {
    if (!translatedText) return

    try {
      const blob = new Blob([translatedText], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `translation_${targetLang}_${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Download started",
        description: "Your translation has been downloaded successfully.",
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "Unable to download the translation. Please try copying the text instead.",
        variant: "destructive",
      })
    }
  }

  // Safe quality badge function with proper null checks
  const getQualityBadge = () => {
    if (!translationQuality) return null

    // Define variants with safe fallbacks
    const variants: Record<TranslationQuality, { color: string; icon: React.ReactNode }> = {
      high: { 
        color: "bg-green-100 text-green-800 border-green-200", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      medium: { 
        color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
        icon: <AlertCircle className="h-3 w-3" /> 
      },
      low: { 
        color: "bg-red-100 text-red-800 border-red-200", 
        icon: <AlertCircle className="h-3 w-3" /> 
      },
    }

    const variant = variants[translationQuality]
    
    // Additional safety check
    if (!variant) {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          UNKNOWN QUALITY
        </Badge>
      )
    }

    return (
      <Badge className={`${variant.color} flex items-center gap-1 border`}>
        {variant.icon}
        {translationQuality.toUpperCase()} QUALITY
      </Badge>
    )
  }

  // Safe language finder function
  const findLanguage = (code: string) => {
    return languages.find((l) => l.code === code) || { code, name: code, flag: "🌐" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SafeNavigation />

      <div className="pt-20">
        <SafeHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Service Status - Detailed View */}
          <ServiceStatus showDetails={true} className="mb-8" />

          {/* Configuration Error Alert */}
          {lastError && lastError.supportInfo && (
            <Alert className="mb-8 border-red-200 bg-red-50">
              <Settings className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div>
                    <strong>Service Configuration Issue:</strong> {lastError.details}
                  </div>
                  {lastError.recommendations && (
                    <div>
                      <strong>What this means:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {lastError.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {lastError.fallbackOptions && (
                    <div>
                      <strong>What you can do now:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {lastError.fallbackOptions.map((option: string, index: number) => (
                          <li key={index} className="text-sm">{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-sm">
                    <strong>Support:</strong> {lastError.supportInfo.email} | 
                    <strong> Error Code:</strong> {lastError.supportInfo.errorCode}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Language Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Language Selection
              </CardTitle>
              <CardDescription>Choose source and target languages for your legal document translation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source Language</label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">🌐 Auto-detect</SelectItem>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Test Section */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Zap className="h-5 w-5" />
                Quick Test
              </CardTitle>
              <CardDescription>Try the translation with sample texts (works even with configuration issues)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    const sampleSpanishText = `SOLICITUD DE ASILO

Información del Solicitante:
Nombre: María Elena Rodríguez García
País de Origen: Honduras
Número de Caso: A123456789

Declaración de la Solicitud:
Solicito asilo en los Estados Unidos basándome en la persecución que enfrenté en mi país de origen debido a mi opinión política.`

                    setSourceText(sampleSpanishText)
                    setSourceLang("es")
                    setTargetLang("en")
                    toast({
                      title: "Spanish sample loaded",
                      description: "Spanish asylum application text is ready for translation.",
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  Spanish Sample
                </Button>

                <Button
                  onClick={() => {
                    const sampleNepaliText = `शरणार्थी आवेदन

आवेदकको जानकारी:
नाम: राम बहादुर श्रेष्ठ
जन्म मिति: २०४० साल फाल्गुन १५ गते
मूल देश: नेपाल
केस नम्बर: N123456789

आवेदनको विवरण:
म संयुक्त राज्य अमेरिकामा शरण माग्दै छु किनभने मैले मेरो मूल देशमा राजनीतिक विचारका कारण उत्पीडन भोगेको छु।`

                    setSourceText(sampleNepaliText)
                    setSourceLang("ne")
                    setTargetLang("en")
                    toast({
                      title: "Nepali sample loaded",
                      description: "Nepali asylum application text is ready for translation.",
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Nepali Sample
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Translation Interface */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Source Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Source Document</span>
                  {sourceLang !== "auto" && (
                    <Badge variant="outline">
                      {findLanguage(sourceLang).flag} {findLanguage(sourceLang).name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your legal document text here..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{sourceText.length} characters</span>
                  <Button onClick={handleTranslate} disabled={isTranslating || !sourceText.trim()}>
                    {isTranslating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Languages className="mr-2 h-4 w-4" />
                        Translate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Translated Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Translation</span>
                  <div className="flex items-center gap-2">
                    {getQualityBadge()}
                    <Badge variant="outline">
                      {findLanguage(targetLang).flag} {findLanguage(targetLang).name}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Translation will appear here..."
                  value={translatedText}
                  readOnly
                  className="min-h-[400px] font-mono text-sm bg-gray-50"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{translatedText.length} characters</span>
                  {translatedText && (
                    <Button variant="outline" onClick={downloadTranslation}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legal Disclaimer */}
          <Alert className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Legal Disclaimer:</strong> This AI-powered translation is provided for informational purposes
              only. For official legal proceedings, please have documents reviewed by a certified legal translator.
              LexBridge maintains ISO 17100 certification standards for translation quality.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
