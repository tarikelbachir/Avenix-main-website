import { AvenixNavigation } from "@/components/avenix-navigation"
import { AvenixFooter } from "@/components/avenix-footer"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactFAQ } from "@/components/contact-faq"
import { AnimatedSection } from "@/components/animated-section"

export const metadata = {
  title: "Contact - Avenix Software",
  description: "Neem contact op voor een gratis adviesgesprek. We reageren binnen 24 uur op werkdagen.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <AvenixNavigation />

      <main>
        <ContactHero />

        <AnimatedSection className="py-16" delay={0.1}>
          <ContactForm />
        </AnimatedSection>

        <AnimatedSection className="py-16 bg-muted/30" delay={0.2}>
          <ContactFAQ />
        </AnimatedSection>
      </main>

      <AvenixFooter />
    </div>
  )
}
