"use client"

import { motion } from "framer-motion"
import { Scale, Globe, Shield, Users, Zap, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EnhancedHeaderProps {
  title: string
  subtitle: string
  description?: string
  showStats?: boolean
  className?: string
}

export function EnhancedHeader({
  title,
  subtitle,
  description,
  showStats = false,
  className = "",
}: EnhancedHeaderProps) {
  const stats = [
    { icon: <Globe className="h-4 w-4" />, label: "10+ Languages", value: "Supported" },
    { icon: <Shield className="h-4 w-4" />, label: "GDPR", value: "Compliant" },
    { icon: <Users className="h-4 w-4" />, label: "1000+", value: "Users Helped" },
    { icon: <Zap className="h-4 w-4" />, label: "< 3 sec", value: "Translation Time" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Main Header Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 mb-4"
              >
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h1>
                  <p className="text-lg text-gray-600 mt-1">{subtitle}</p>
                </div>
              </motion.div>

              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 max-w-2xl leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Stats Section */}
            {showStats && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 lg:mt-0 lg:ml-8"
              >
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{stat.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-200"
          >
            <Badge
              variant="outline"
              className="flex items-center space-x-2 bg-green-50 text-green-700 border-green-200"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>AI Translation Active</span>
            </Badge>

            <Badge variant="outline" className="flex items-center space-x-2 bg-blue-50 text-blue-700 border-blue-200">
              <Shield className="h-3 w-3" />
              <span>GDPR Compliant</span>
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center space-x-2 bg-purple-50 text-purple-700 border-purple-200"
            >
              <CheckCircle className="h-3 w-3" />
              <span>ISO 17100 Certified</span>
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center space-x-2 bg-orange-50 text-orange-700 border-orange-200"
            >
              <Globe className="h-3 w-3" />
              <span>Global Access</span>
            </Badge>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
