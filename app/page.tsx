"use client"
import { motion } from "framer-motion"
import { Shield, Globe, Users, FileText, Zap, Heart, Scale, Languages, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Legal Translation Engine",
      description: "AI-powered translations specialized in asylum and immigration law",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Encrypted Document Vault",
      description: "Secure, GDPR-compliant storage for sensitive legal documents",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Assisted Legal Prep",
      description: "Auto-fill asylum forms and jurisdiction-specific templates",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Advocate Portal",
      description: "Collaborative workspace for legal professionals and interpreters",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "NGO Collaboration",
      description: "Secure document sharing and translation queues for organizations",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">LexBridge</span>
                <br />
                <span className="text-3xl md:text-4xl text-gray-600">Bridging Languages, Empowering Lives</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                A cutting-edge digital platform transforming legal translation for refugees and asylum seekers
                worldwide. Advanced AI-powered tools ensure every word is accurately preserved, empowering vulnerable
                individuals to navigate complex legal systems with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-lg px-8 py-3">
                  <Link href="/translate">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Translating
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Mission</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                To provide instant, high-fidelity, legally-accurate translations of asylum and immigration documents,
                empowering refugees, aid organizations, and legal professionals to access justice and human rights.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-blue-100 hover:border-blue-200 transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Scale className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Legal Precision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      Specialized AI models fine-tuned on legal terminology and asylum documentation ensure accurate
                      preservation of critical legal language.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-green-100 hover:border-green-200 transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Security First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      End-to-end encryption, GDPR compliance, and secure document management protect sensitive
                      information throughout the translation process.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-purple-100 hover:border-purple-200 transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Human-Centered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      Designed for vulnerable populations with intuitive interfaces, offline capabilities, and support
                      for low-resource environments.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive tools designed specifically for legal translation and asylum case management
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Bridge Language Barriers?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of legal professionals, NGOs, and advocates using LexBridge to provide accurate
                translations and access to justice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
                  <Link href="/translate">Start Free Translation</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Scale className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">LexBridge</span>
                    <p className="text-sm text-gray-400">Legal Translation Platform</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                  Bridging languages, empowering lives through AI-powered legal translation. Specialized for asylum
                  seekers and immigration cases worldwide.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-6 text-lg">Platform</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/translate"
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <Languages className="h-4 w-4 mr-2 group-hover:text-blue-400" />
                      Translation Tool
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-6 text-lg">Support</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <FileText className="h-4 w-4 mr-2 group-hover:text-blue-400" />
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <Heart className="h-4 w-4 mr-2 group-hover:text-blue-400" />
                      Community Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                      <Globe className="h-4 w-4 mr-2 group-hover:text-blue-400" />
                      Language Resources
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">AI Translation Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">ISO 17100 Certified</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  &copy; 2024-25 LexBridge. Empowering refugees through technology.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
