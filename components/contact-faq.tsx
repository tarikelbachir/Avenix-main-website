import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ContactFAQ() {
  const faqs = [
    {
      question: "Hoe lang duurt een project?",
      answer:
        "De meeste projecten worden binnen 2-4 weken opgeleverd. Dit hangt af van de complexiteit en uw feedback tijdens het proces. Eenvoudige websites kunnen sneller, complexe e-commerce projecten kunnen iets langer duren.",
    },
    {
      question: "Wat kost een website?",
      answer:
        "Onze prijzen beginnen bij €1.750 voor een professionele business website. E-commerce websites starten vanaf €3.500. De exacte prijs hangt af van uw specifieke wensen en functionaliteiten. We maken altijd eerst een vrijblijvende offerte.",
    },
    {
      question: "Doen jullie ook hosting?",
      answer:
        "Ja, wij bieden complete hosting oplossingen aan via betrouwbare partners. Dit omvat snelle servers, automatische backups, SSL certificaten en 24/7 monitoring. Hosting is optioneel en kan ook bij uw eigen provider.",
    },
    {
      question: "Kan ik zelf content aanpassen?",
      answer:
        "Absoluut! We bouwen websites met gebruiksvriendelijke content management systemen. U krijgt een uitgebreide instructie en we bieden altijd nazorg en training. Voor complexere aanpassingen staan we natuurlijk klaar om te helpen.",
    },
    {
      question: "Wat gebeurt er na de oplevering?",
      answer:
        "Na oplevering krijgt u 30 dagen gratis support voor kleine aanpassingen. Daarnaast bieden we onderhoudscontracten aan vanaf €75/maand voor updates, backups en technische support. U bent echter nooit verplicht om dit af te nemen.",
    },
    {
      question: "Werken jullie ook met bestaande websites?",
      answer:
        "Ja, we kunnen bestaande websites redesignen, migreren of uitbreiden met nieuwe functionaliteiten. We analyseren eerst uw huidige situatie en adviseren over de beste aanpak voor uw specifieke situatie.",
    },
  ]

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Veelgestelde Vragen</h2>
        <p className="text-xl text-muted-foreground">
          Heeft u nog vragen? Hier vindt u antwoorden op de meest gestelde vragen
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pt-2">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
        <h3 className="font-montserrat font-bold text-xl mb-4">Nog Andere Vragen?</h3>
        <p className="text-muted-foreground mb-6">
          Staat uw vraag er niet bij? Neem gerust contact met ons op voor een persoonlijk gesprek.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@avenixsoftware.nl"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Stuur Een Email
          </a>
          <a
            href="tel:+31612345678"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Bel Direct
          </a>
        </div>
      </div>
    </section>
  )
}
