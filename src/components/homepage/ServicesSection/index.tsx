'use client'

import { services } from './data'
import ServiceBlock from './ServiceBlock'

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#0a0a0a] text-white border-t border-white/10">
      <div className="max-w-[1800px] w-full mx-auto px-6 md:px-10 py-20 md:py-28 flex flex-col gap-16 md:gap-24">
        {/* Section Label */}
        <div className="shrink-0">
          <span className="ed-eyebrow">// Services</span>
        </div>

        <div className="flex flex-col gap-10 md:gap-16">
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
