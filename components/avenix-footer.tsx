import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function AvenixFooter() {
  const services = [
    { name: "Website Development", href: "/diensten#websites" },
    { name: "E-commerce", href: "/diensten#ecommerce" },
    { name: "Maintenance", href: "/diensten#onderhoud" },
    { name: "SEO", href: "/diensten#seo" },
  ]

  const company = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Over Ons", href: "/over-ons" },
    { name: "Contact", href: "/contact" },
  ]

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Algemene Voorwaarden", href: "/voorwaarden" },
    { name: "Cookie Policy", href: "/cookies" },
  ]

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-montserrat font-bold text-xl">Avenix Software</span>
            </div>
            <p className="text-background/70 mb-6">
              Moderne websites die uw bedrijf laten groeien. Van concept tot conversie in 2-4 weken.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@avenixsoftware.nl</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+31 6 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Nederland</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Diensten</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-background/70 hover:text-background transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Bedrijf</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/70 hover:text-background transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Juridisch</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/70 hover:text-background transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/70">
            © 2024 Avenix Software | Alle rechten voorbehouden | Made with ❤️ in Nederland
          </p>
        </div>
      </div>
    </footer>
  )
}
