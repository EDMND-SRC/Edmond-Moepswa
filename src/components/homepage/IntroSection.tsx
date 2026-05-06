import Link from 'next/link'
export default function IntroSection() {
  return (
    <section id="intro" className="ed-shell px-6 py-24 md:px-10 md:py-32">
      <div className="ed-wide-container grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3 lg:col-span-2">
          <span className="ed-eyebrow">// Intro</span>
        </div>

        <div className="md:col-span-9 lg:col-span-10 flex flex-col gap-10">
          <h2 className="ed-section-title max-w-5xl">
            I’ve been on <span className="text-[#FF4D2E]">both sides of the desk</span>. Now I
            design and build <span className="text-[#FF4D2E]">systems that hold up</span>.
          </h2>

          <div className="flex max-w-4xl flex-col gap-6 text-lg leading-relaxed text-[#b0b0b0] md:text-xl">
            <p>
              I spent a decade on the other side of the desk before I wrote my first line of
              production code. I ran hospitality operations in Canberra, gave financial advice in
              Sydney, and built risk and insurance functions from zero for a construction project
              management company in Gaborone.
            </p>
            <p>
              Each role required the same thing: understand how the business actually makes
              decisions, then build the systems and tools to help it make better ones. That club
              work recently culminated in a Botswana Premier League promotion. The lesson was the
              same every time: the best technology is grounded in operations, not novelty.
            </p>
            <p>
              Today I build websites, web apps, and workflow automations for businesses that need
              things that work properly and keep working. Every project ships with documentation and
              complete ownership.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#FF4D2E] transition-colors hover:text-[#ff6b52]"
          >
            Read my full story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

IntroSection.displayName = 'IntroSection'
