"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Code, Zap, Shield, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export function SophisticatedHero() {
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const texts = [
    "Digitale Oplossingen Die Uw Bedrijf Laten Groeien",
    "Moderne Websites Die Converteren",
    "E-commerce Platforms Die Verkopen",
  ]

  useEffect(() => {
    const currentFullText = texts[textIndex]

    if (isTyping) {
      if (currentText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setTextIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }
  }, [currentText, textIndex, isTyping, texts])

  const features = [
    { icon: Code, text: "Moderne Tech Stack" },
    { icon: Zap, text: "Snelle Laadtijden" },
    { icon: Shield, text: "Veilig & Betrouwbaar" },
    { icon: TrendingUp, text: "SEO Geoptimaliseerd" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-animated opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl float-animation"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl float-animation"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl float-animation"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nederlandse Software Experts</span>
            </div>

            {/* Typewriter Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                <span className="block">{currentText}</span>
                <span className="inline-block w-1 h-12 bg-primary ml-1 animate-pulse"></span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Van moderne websites tot complexe e-commerce platforms - wij transformeren uw digitale aanwezigheid met
                cutting-edge technologie en Nederlandse kwaliteit.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transition-all duration-300 pulse-glow group"
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <span>Start Uw Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="glass-effect border-primary/30 hover:bg-primary/10 group bg-transparent"
                asChild
              >
                <Link href="/portfolio" className="flex items-center space-x-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Bekijk Portfolio</span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Tevreden Klanten</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Jaar Ervaring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10 glass-effect rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Moderne Technologie</h3>
                  <p className="text-muted-foreground">Next.js, React, TypeScript</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 glass-effect rounded-xl p-4 shadow-lg float-animation">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Live & Actief</span>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 glass-effect rounded-xl p-4 shadow-lg float-animation"
              style={{ animationDelay: "3s" }}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">+300% Groei</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
