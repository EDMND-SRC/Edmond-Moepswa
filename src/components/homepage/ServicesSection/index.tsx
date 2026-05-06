'use client'

import { services } from './data'
import ServiceBlock from './ServiceBlock'

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-14 px-6 py-16 md:gap-20 md:px-10 md:py-24">
        {/* Section Label */}
        <div className="shrink-0">
          <span className="ed-eyebrow">// Services</span>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {services
            .filter((service) => service.id !== '07' && service.id !== '08')
            .map((service) => (
              <ServiceBlock
                key={service.id}
                service={service}
                currency="BWP"
                rates={{ BWP: 1 }}
                showPricing={false}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

ServicesSection.displayName = 'ServicesSection'
