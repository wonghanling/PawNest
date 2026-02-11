export default function AboutPage() {
  return (
    <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-40 py-8 md:py-12">
      <div className="mx-auto max-w-[960px]">
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <img src="/optimized/2061.webp" alt="About Us Hero" className="w-full h-full object-cover" />
        </div>

        <section className="py-12 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 px-4">Our Philosophy</h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-700 dark:text-slate-300 px-4">
            At Pet Haven, we believe in creating products that are not only beautiful but also kind to our planet. Our commitment to eco-friendly practices, exceptional craftsmanship, and sustainable materials ensures that every item we offer is a testament to quality and responsibility.
          </p>
        </section>

        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-8 md:mb-12 px-4">Materials &amp; Processes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <img src="/optimized/2062.webp" alt="Organic Cotton" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Organic Cotton</h3>
                <p className="text-slate-700 dark:text-slate-300">Sourced from sustainable farms, our organic cotton is gentle on your pet and the environment.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <img src="/optimized/2063.webp" alt="Recycled Polyester" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Recycled Polyester</h3>
                <p className="text-slate-700 dark:text-slate-300">Through innovative regeneration technology, we convert selected materials into ultra-soft, high-performance fibers — elevating both quality and sustainability.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <img src="/optimized/2064.webp" alt="Natural Dyes" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Natural Dyes</h3>
                <p className="text-slate-700 dark:text-slate-300">Proprietary coloration technology ensures brilliant, long-lasting shades with superior color fastness — combining visual excellence with material integrity.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-8 md:mb-12 px-4">Our Story</h2>
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-primary/30"></div>

            <div className="relative mb-12">
              <div className="absolute -left-[2.1rem] top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-background-light dark:ring-background-dark">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                </svg>
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2018: The Beginning</h3>
                <p className="text-slate-700 dark:text-slate-300">Founded with a vision to create stylish and sustainable pet products that enrich the lives of pets and their owners, setting a new standard for design and quality in the industry.</p>
              </div>
            </div>

            <div className="relative mb-12">
              <div className="absolute -left-[2.1rem] top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-background-light dark:ring-background-dark">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                </svg>
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2020: First Collection</h3>
                <p className="text-slate-700 dark:text-slate-300">Launched our first collection of eco-friendly pet accessories, meticulously crafted from sustainable materials. This collection quickly gained popularity for its minimalist aesthetic and superior durability.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[2.1rem] top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-background-light dark:ring-background-dark">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 21h10v-2H7v2zm0-8h10v-2H7v2zm0-6v2h10V7H7zm8-4l-4 4h3v2h2v-2h3l-4-4z"/>
                </svg>
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2023: Sustainability Award</h3>
                <p className="text-slate-700 dark:text-slate-300">Recognized with the &quot;Eco-Excellence Award&quot; for our unwavering commitment to environmental responsibility and innovative use of recycled materials in our product line.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
