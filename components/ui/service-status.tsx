"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle, Loader2, Settings, ExternalLink } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ServiceStatusProps {
  className?: string
  showDetails?: boolean
}

type ServiceStatus = "checking" | "operational" | "degraded" | "down" | "configuration_error" | "api_error" | "system_error"

interface HealthResponse {
  status: ServiceStatus
  service: string
  message: string
  timestamp: string
  testResponse?: string
  error?: string
  debug?: any
  recommendations?: string[]
  apiKeyLength?: number
}

interface ConfigResponse {
  status: "configured" | "missing_keys" | "error"
  config?: any
  message: string
  recommendations?: string[]
}

export function ServiceStatus({ className = "", showDetails = false }: ServiceStatusProps) {
  const [status, setStatus] = useState<ServiceStatus>("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [message, setMessage] = useState<string>("")
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [configStatus, setConfigStatus] = useState<ConfigResponse | null>(null)
  const [showDebugInfo, setShowDebugInfo] = useState(false)

  const checkServiceStatus = async () => {
    setStatus("checking")
    try {
      // First check configuration
      const configResponse = await fetch("/api/config")
      const configData: ConfigResponse = await configResponse.json()
      setConfigStatus(configData)

      // Then check health
      const healthResponse = await fetch("/api/health")
      const healthData: HealthResponse = await healthResponse.json()

      setStatus(healthData.status)
      setMessage(healthData.message)
      setRecommendations(healthData.recommendations || [])
      setLastChecked(new Date())

      console.log("Service status check:", { config: configData, health: healthData })
    } catch (error) {
      console.error("Service status check failed:", error)
      setStatus("system_error")
      setMessage("Unable to check service status")
      setRecommendations([
        "Check internet connection",
        "Try refreshing the page",
        "Contact support if issue persists"
      ])
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkServiceStatus()
    // Check status every 2 minutes
    const interval = setInterval(checkServiceStatus, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = () => {
    switch (status) {
      case "checking":
        return {
          icon: <Loader2 className="h-3 w-3 animate-spin" />,
          text: "Checking...",
          color: "bg-gray-100 text-gray-800",
          severity: "info"
        }
      case "operational":
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          text: "Operational",
          color: "bg-green-100 text-green-800",
          severity: "success"
        }
      case "degraded":
        return {
          icon: <AlertCircle className="h-3 w-3" />,
          text: "Degraded",
          color: "bg-yellow-100 text-yellow-800",
          severity: "warning"
        }
      case "configuration_error":
        return {
          icon: <Settings className="h-3 w-3" />,
          text: "Configuration Issue",
          color: "bg-orange-100 text-orange-800",
          severity: "error"
        }
      case "api_error":
        return {
          icon: <XCircle className="h-3 w-3" />,
          text: "API Error",
          color: "bg-red-100 text-red-800",
          severity: "error"
        }
      case "system_error":
      case "down":
      default:
        return {
          icon: <XCircle className="h-3 w-3" />,
          text: "Service Issue",
          color: "bg-red-100 text-red-800",
          severity: "error"
        }
    }
  }

  const statusConfig = getStatusConfig()

  if (!showDetails) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center space-x-3">
          <Badge className={`${statusConfig.color} flex items-center gap-1`}>
            {statusConfig.icon}
            Translation Service: {statusConfig.text}
          </Badge>
          {lastChecked && (
            <span className="text-xs text-gray-500">
              Last checked: {lastChecked.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {status !== "operational" && (
            <span className="text-xs text-red-600">Contact: support@lexbridge.com</span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={checkServiceStatus}
            className="text-xs px-2 py-1 h-6 bg-transparent"
            disabled={status === "checking"}
          >
            {status === "checking" ? "Checking..." : "Refresh"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {statusConfig.icon}
            Service Status
          </span>
          <Badge className={statusConfig.color}>
            {statusConfig.text}
          </Badge>
        </CardTitle>
        <CardDescription>
          Current status of the translation service and configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Message */}
        <Alert className={statusConfig.severity === "error" ? "border-red-200 bg-red-50" : ""}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Status:</strong> {message}
            {lastChecked && (
              <span className="block text-xs text-gray-500 mt-1">
                Last checked: {lastChecked.toLocaleString()}
              </span>
            )}
          </AlertDescription>
        </Alert>

        {/* Configuration Status */}
        {configStatus && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Configuration Status</span>
              <Badge variant={configStatus.status === "configured" ? "default" : "destructive"}>
                {configStatus.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{configStatus.message}</p>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Recommendations:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Debug Information */}
        {configStatus?.config && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDebugInfo(!showDebugInfo)}
              className="text-xs"
            >
              {showDebugInfo ? "Hide" : "Show"} Debug Info
            </Button>
            
            {showDebugInfo && (
              <div className="p-3 bg-gray-100 rounded-lg">
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(configStatus.config, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={checkServiceStatus}
            disabled={status === "checking"}
          >
            {status === "checking" ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Checking...
              </>
            ) : (
              "Refresh Status"
            )}
          </Button>

          {status === "configuration_error" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open("https://makersuite.google.com/app/apikey", "_blank")}
            >
              <ExternalLink className="mr-2 h-3 w-3" />
              Get API Key
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open("mailto:support@lexbridge.com", "_blank")}
          >
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
