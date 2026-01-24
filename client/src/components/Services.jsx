const servicesData = [
  {
    id: 1,
    title: "Guided Tours",
    subtitle: "Local guides & curated itineraries",
    description:
      "Small-group guided tours led by local experts. Hand-picked routes, cultural insights and flexible pacing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3 7 7 .5-5.5 4 2 7L12 17l-6.5 3.5 2-7L2 9.5 9 9 12 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Custom Packages",
    subtitle: "Tailor-made routes & hotels",
    description:
      "We design itineraries around your interests, budget and travel style — from luxury escapes to backpacking adventures.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 7V5a3 3 0 016 0v2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Transfers & Logistics",
    subtitle: "Airport, rail, private transfers",
    description:
      "Reliable transfers and on-ground logistics so you can relax from the moment you touch down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h2l1 3h11l1-3h2M7 13V6a4 4 0 018 0v7" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Travel Insurance",
    subtitle: "Safety-first coverage",
    description:
      "Optional travel insurance and 24/7 emergency support so you can travel confidentally.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M5 3v4a2 2 0 002 2h10a2 2 0 002-2V3" />
      </svg>
    ),
  },
];

const Services = ({ services = servicesData }) => {
  return (
    <div className="space-y-16 px-4 sm:px-6 lg:px-12 py-12">
      {/* Travel Hero */}
      <section className="max-w-6xl mx-auto bg-gradient-to-r from-sky-50 to-white rounded-2xl p-8 shadow-sm">
        <div className="md:flex md:items-center md:gap-8">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Travel made simple — memories made lasting
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
              We craft thoughtful journeys that match your curiosity. From weekend escapes to month-long
              expeditions, our team handles the planning so you can focus on the experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/service"
                className="inline-flex items-center justify-center rounded-md bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                Explore services
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md"
              >
                Contact us
              </a>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:w-96">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-slate-100 flex items-center justify-center">
              {/* Placeholder graphic — replace with image if you have one */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 3v4M8 3v4M3 11h18" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Tour of Services */}
      <section id="tour-of-services" className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Tour of Services</h3>
            <p className="mt-2 text-slate-600 max-w-xl">
              A quick look at what we offer. Tap any card to see more or start a booking.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a className="text-sm font-medium text-sky-600 hover:underline" href="/package">
              View all packages
            </a>
            <a
              className="inline-flex items-center justify-center rounded-md bg-slate-800 px-3 py-2 text-sm text-white"
              href="#contact"
            >
              Book a consultation
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <article
              key={s.id}
              className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-sky-50 p-3 ring-1 ring-sky-100">{s.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{s.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{s.subtitle}</p>
                </div>
              </div>

              <p className="mt-4 text-slate-600 text-sm">{s.description}</p>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:underline"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <button
                  className="rounded-full bg-sky-600 hover:bg-sky-700 text-white py-2 px-3 text-sm font-medium shadow-sm"
                  onClick={() => alert(`Book: ${s.title}`)}
                >
                  Book now
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Small footer / note */}
        <div className="mt-8 text-sm text-slate-500">
          <p>
            Not sure what to choose? Start with a 15-minute free consultation and we'll recommend a
            plan that fits your schedule and budget.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="max-w-6xl mx-auto">
        <div className="rounded-2xl bg-slate-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Ready to plan your trip?</h4>
            <p className="mt-1 text-slate-600">Send us your dates and interests — we’ll do the rest.</p>
          </div>

          <div className="flex items-center gap-3">
            <a href="#" className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white font-medium">
              Start planning
            </a>
            <a href="/contact" className="text-sm text-slate-600 hover:underline">
              Call us: 01143501378, +91 9871047857
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
 
export default Services;
