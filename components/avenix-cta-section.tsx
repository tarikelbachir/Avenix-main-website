import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AvenixCTASection() {
  return (
    <section className="text-center text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">Klaar om Online te Groeien?</h2>
        <p className="text-xl mb-8 text-white/90">
          Laten we samen uw digitale ambities waarmaken. Start vandaag nog met uw nieuwe website.
        </p>
        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
          <Link href="/contact">Start Uw Project</Link>
        </Button>
      </div>
    </section>
  )
}
