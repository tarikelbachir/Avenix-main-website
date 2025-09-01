"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Code, Briefcase, Users, Phone, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdvancedNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      hasDropdown: false,
    },
    {
      href: "/diensten",
      label: "Diensten",
      icon: Code,
      hasDropdown: true,
      dropdownItems: [
        { href: "/diensten#websites", label: "Business Websites" },
        { href: "/diensten#ecommerce", label: "E-commerce" },
        { href: "/diensten#maatwerk", label: "Maatwerk Oplossingen" },
        { href: "/diensten#onderhoud", label: "Website Onderhoud" },
      ],
    },
    {
      href: "/portfolio",
      label: "Portfolio",
      icon: Briefcase,
      hasDropdown: false,
    },
    {
      href: "/over-ons",
      label: "Over Ons",
      icon: Users,
      hasDropdown: false,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Phone,
      hasDropdown: false,
    },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 gradient-animated rounded-xl flex items-center justify-center shadow-lg group-hover:pulse-glow transition-all duration-300">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                Avenix Software
              </span>
              <span className="text-xs text-muted-foreground">Digitale Oplossingen</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-200 group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 glass-effect rounded-xl shadow-xl py-2 z-50">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button
              asChild
              className="ml-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow"
            >
              <Link href="/contact" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Gratis Adviesgesprek</span>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="glass-effect">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden glass-effect rounded-b-xl">
            <div className="px-2 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Link href="/contact" className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Gratis Adviesgesprek</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
