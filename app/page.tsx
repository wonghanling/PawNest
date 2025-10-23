export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Hero Banner */}
      <section
        className="relative rounded-xl overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[600px] flex items-center justify-center mx-4 sm:mx-6 lg:mx-16 mt-6 sm:mt-8 md:mt-12"
      >
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <img
            src="/1.jpg"
            alt="Happy pets"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* 内容 */}
        <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-6 text-left text-white max-w-4xl w-full px-4 sm:px-6 md:px-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'}}>Elevate Your Pet&apos;s Lifestyle</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light" style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'}}>Discover premium pet products designed for comfort, style, and well-being.</p>
          <a href="/category" className="bg-blue-600 text-white rounded-lg h-10 sm:h-12 px-6 sm:px-8 text-sm md:text-base font-bold hover:bg-blue-700 transition-colors w-fit flex items-center justify-center" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>Shop Now</a>
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Shop by Category */}
          <section className="py-12 sm:py-16 md:py-24">
            <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 max-w-4xl mx-auto">
              <div className="group cursor-pointer">
                <div className="w-full bg-slate-200 dark:bg-slate-800 aspect-square rounded-xl overflow-hidden">
                  <img src="/optimized/02.webp" alt="Dog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-base md:text-lg font-semibold mt-4 text-center text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Dog</p>
              </div>
              <div className="group cursor-pointer">
                <div className="w-full bg-slate-200 dark:bg-slate-800 aspect-square rounded-xl overflow-hidden">
                  <img src="/optimized/03.webp" alt="Cat" className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-base md:text-lg font-semibold mt-4 text-center text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Cat</p>
              </div>
            </div>
          </section>

          {/* Product Categories */}
          <section className="py-12 sm:py-16 md:py-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-900 dark:text-white px-4">Product Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 px-4">
              {/* Comfort Living */}
              <a href="/category" className="group cursor-pointer">
                <div className="w-full bg-white dark:bg-slate-800 aspect-square rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <img src="/optimized/04.webp" alt="Comfort Living" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Comfort Living</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">舒适生活</p>
                </div>
              </a>

              {/* Travel & Safety */}
              <a href="/category" className="group cursor-pointer">
                <div className="w-full bg-white dark:bg-slate-800 aspect-square rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <img src="/optimized/05.webp" alt="Travel & Safety" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Travel & Safety</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">出行与安全</p>
                </div>
              </a>

              {/* Care & Hygiene */}
              <a href="/category" className="group cursor-pointer">
                <div className="w-full bg-white dark:bg-slate-800 aspect-square rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <img src="/optimized/06.webp" alt="Care & Hygiene" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Care & Hygiene</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">清洁与护理</p>
                </div>
              </a>

              {/* Toys & Play */}
              <a href="/category" className="group cursor-pointer">
                <div className="w-full bg-white dark:bg-slate-800 aspect-square rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <img src="/optimized/07.webp" alt="Toys & Play" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Toys & Play</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">玩具与互动</p>
                </div>
              </a>

              {/* Smart & Home */}
              <a href="/category" className="group cursor-pointer">
                <div className="w-full bg-white dark:bg-slate-800 aspect-square rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <img src="/optimized/08.webp" alt="Smart & Home" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Smart & Home</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">智能与家居</p>
                </div>
              </a>

              {/* Style & Wear */}
              <a href="/category" className="group cursor-pointer">
                <div className="w-full bg-white dark:bg-slate-800 aspect-square rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <img src="/optimized/09.webp" alt="Style & Wear" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Style & Wear</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">时尚穿搭</p>
                </div>
              </a>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-12 md:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Title */}
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-2xl md:text-5xl font-light text-slate-900 dark:text-white tracking-wide mb-3 md:mb-4">Our Story</h2>
                <div className="w-12 md:w-16 h-px bg-slate-300 dark:bg-slate-600 mx-auto"></div>
              </div>

              {/* Timeline Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-16">
                {/* Row 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 dark:bg-white rounded-full mb-3 md:mb-6 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="text-2xl md:text-5xl font-extralight text-slate-900 dark:text-white mb-1 md:mb-2">2018</div>
                  <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-slate-500 dark:text-slate-400 font-light">Founded</div>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 dark:bg-white rounded-full mb-3 md:mb-6 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="text-2xl md:text-5xl font-extralight text-slate-900 dark:text-white mb-1 md:mb-2">2019</div>
                  <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-slate-500 dark:text-slate-400 font-light">Product Launch</div>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 dark:bg-white rounded-full mb-3 md:mb-6 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="text-2xl md:text-5xl font-extralight text-slate-900 dark:text-white mb-1 md:mb-2">2021</div>
                  <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-slate-500 dark:text-slate-400 font-light">Design Team</div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 dark:bg-white rounded-full mb-3 md:mb-6 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="text-2xl md:text-5xl font-extralight text-slate-900 dark:text-white mb-1 md:mb-2">2022</div>
                  <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-slate-500 dark:text-slate-400 font-light">Production</div>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 dark:bg-white rounded-full mb-3 md:mb-6 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="text-2xl md:text-5xl font-extralight text-slate-900 dark:text-white mb-1 md:mb-2">2023</div>
                  <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-slate-500 dark:text-slate-400 font-light">Brand Upgrade</div>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-900 dark:bg-white rounded-full mb-3 md:mb-6 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="text-2xl md:text-5xl font-extralight text-slate-900 dark:text-white mb-1 md:mb-2">2025</div>
                  <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-slate-500 dark:text-slate-400 font-light">Global Expansion</div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="text-center max-w-3xl mx-auto">
                <div className="w-16 md:w-24 h-px bg-slate-300 dark:bg-slate-600 mx-auto mb-4 md:mb-8"></div>
                <p className="text-sm md:text-xl font-light text-slate-600 dark:text-slate-400 leading-relaxed tracking-wide">
                  At PawNest, we believe pets deserve the best. Our journey has been about creating premium quality products that enhance the bond between pets and their families.
                </p>
              </div>
            </div>
          </section>

          {/* Customer Testimonials */}
          <section className="py-12 sm:py-16 md:py-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-900 dark:text-white px-4">Customer Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
              <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900/50 p-6 rounded-xl">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    src="/optimized/010.webp"
                    alt="Sarah M."
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-center text-slate-600 dark:text-slate-300">
                  <p>&quot;My dog absolutely loves the new bed! It&apos;s so soft and cozy, and it looks great in my living room.&quot;</p>
                </blockquote>
                <cite className="text-center font-bold not-italic text-slate-800 dark:text-slate-200">Sarah M.</cite>
              </div>
              <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900/50 p-6 rounded-xl">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    src="/optimized/011.webp"
                    alt="David L."
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-center text-slate-600 dark:text-slate-300">
                  <p>&quot;The interactive cat toy keeps my cat entertained for hours. It&apos;s a lifesaver!&quot;</p>
                </blockquote>
                <cite className="text-center font-bold not-italic text-slate-800 dark:text-slate-200">David L.</cite>
              </div>
              <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900/50 p-6 rounded-xl">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    src="/optimized/012.webp"
                    alt="Emily R."
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-center text-slate-600 dark:text-slate-300">
                  <p>&quot;I&apos;m so impressed with the quality of the leather collar. It&apos;s stylish and durable, and my dog looks so handsome in it.&quot;</p>
                </blockquote>
                <cite className="text-center font-bold not-italic text-slate-800 dark:text-slate-200">Emily R.</cite>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-16 md:py-24" style={{backgroundColor: '#F4D03F'}}>
            <div className="max-w-4xl mx-auto text-center px-4">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Pet Family</h2>
                <p className="text-lg md:text-xl text-yellow-100 font-light">Get exclusive deals, pet care tips, and be the first to know about our latest products.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-1">
                    <input
                      className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all"
                      placeholder="Your email address"
                      type="email"
                    />
                  </div>
                  <button
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                    type="submit"
                  >
                    Join Now
                  </button>
                </form>

                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-yellow-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Exclusive Offers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Special Discounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>New Product Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-8">
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">FAQ</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="/shipping-returns">Shipping &amp; Returns</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="/privacy">Privacy Policy</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="/terms">Terms of Service</a>
            </div>
            <div className="flex space-x-6 mb-8">
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.735 9.492.245.044.335-.106.335-.235 0-.116-.004-1.04-.007-1.88-2.782.602-3.369-1.21-3.369-1.21-.223-.568-.544-.72-.544-.72-.445-.304.034-.298.034-.298.492.035.751.505.751.505.437.748 1.146.532 1.425.407.044-.316.17-.532.31-.655-1.086-.123-2.228-.543-2.228-2.42 0-.535.19-.973.502-1.315-.05-.123-.217-.622.048-1.297 0 0 .41-.131 1.343.5.388-.107.803-.16 1.216-.162.413.002.828.055 1.216.162.933-.631 1.342-.5 1.342-.5.265.675.1.1.173.048 1.297.313.342.503.78.503 1.315 0 1.883-1.144 2.296-2.234 2.417.175.15.33.448.33.899 0 .65-.006 1.175-.006 1.335 0 .13.09.282.34.235C19.135 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" fillRule="evenodd"></path>
                </svg>
              </a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
            <p className="text-center text-base text-slate-500 dark:text-slate-400">© 2024 Pet Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
