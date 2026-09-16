"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiKeyIcon, LegalScalesIcon } from "@/components/ui/legal-icons"

const STORAGE_KEY = "lexbridge_gemini_api_key"

export function getStoredGeminiKey(): string {
  if (typeof window === "undefined") return ""
  return localStorage.getItem(STORAGE_KEY) || ""
}

export function setStoredGeminiKey(key: string): void {
  if (typeof window === "undefined") return
  if (key.trim()) {
    localStorage.setItem(STORAGE_KEY, key.trim())
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
  window.dispatchEvent(new Event("lexbridge-key-updated"))
}

export function GeminiKeyModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ status: "success" | "error" | null; message: string }>({
    status: null,
    message: "",
  })
  const [envConfigured, setEnvConfigured] = useState(false)

  useEffect(() => {
    if (open) {
      setApiKey(getStoredGeminiKey())
      setTestResult({ status: null, message: "" })

      // Check if env key is available
      fetch("/api/config")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "configured") {
            setEnvConfigured(true)
          } else {
            setEnvConfigured(false)
          }
        })
        .catch(() => setEnvConfigured(false))
    }
  }, [open])

  const handleSave = () => {
    setStoredGeminiKey(apiKey)
    onOpenChange(false)
  }

  const handleClear = () => {
    setStoredGeminiKey("")
    setApiKey("")
    setTestResult({ status: null, message: "" })
  }

  const handleTestConnection = async () => {
    const keyToTest = apiKey.trim()
    setIsTesting(true)
    setTestResult({ status: null, message: "" })

    try {
      const headers: Record<string, string> = {}
      if (keyToTest) {
        headers["x-gemini-api-key"] = keyToTest
      }

      const res = await fetch("/api/health", { headers })
      const data = await res.json()

      if (res.ok && data.status === "operational") {
        setTestResult({
          status: "success",
          message: "Connection verified: Gemini 1.5 Flash is responsive and active.",
        })
      } else {
        setTestResult({
          status: "error",
          message: data.message || data.error || "Failed to verify key. Check the key and try again.",
        })
      }
    } catch {
      setTestResult({
        status: "error",
        message: "Network error while connecting to Google AI service.",
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 p-6 rounded-lg shadow-xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-900">
            <div className="p-1.5 bg-slate-100 rounded text-slate-800">
              <ApiKeyIcon size={20} />
            </div>
            <DialogTitle className="text-lg font-semibold text-slate-900 font-serif">
              Gemini API Key Configuration
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-slate-600 leading-relaxed">
            LexBridge uses Google Generative AI to translate legal and asylum documents. Your key is stored solely in your local browser storage and sent directly to Google AI.
          </DialogDescription>
        </DialogHeader>

        {envConfigured && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
            <span className="font-semibold text-slate-900">Server Key Active:</span> A default Gemini API key is configured in the environment. You may optionally provide a personal key below to override it.
          </div>
        )}

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="gemini-key" className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                Google Gemini API Key
              </Label>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                {showKey ? "Hide" : "Reveal"}
              </button>
            </div>
            <Input
              id="gemini-key"
              type={showKey ? "text" : "password"}
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono text-sm border-slate-300 rounded-md focus-visible:ring-slate-900"
            />
            <p className="text-xs text-slate-500">
              Need a key? Obtain one for free at{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 font-medium underline underline-offset-2 hover:text-blue-700"
              >
                Google AI Studio
              </a>
              .
            </p>
          </div>

          {testResult.status && (
            <div
              className={`p-3 text-xs rounded border ${
                testResult.status === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-900"
              }`}
            >
              {testResult.message}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isTesting || (!apiKey.trim() && !envConfigured)}
              className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {isTesting ? "Testing..." : "Test Connection"}
            </Button>
            {apiKey && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs text-slate-500 hover:text-rose-700"
              >
                Clear
              </Button>
            )}
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs border-slate-300 text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-white"
            >
              Save Key
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
