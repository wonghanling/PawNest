export default function TermsOfService() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              PawNest
            </a>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-8">
              <p><strong>Effective Date:</strong> October 2025</p>
              <p><strong>Last Updated:</strong> October 2025</p>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              Welcome to PawNest ("we," "us," or "our"). By accessing our website or purchasing our products,
              you agree to comply with these Terms of Service. Please read them carefully before using our site.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. General Conditions</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• By using this website, you confirm that you are at least 18 years old or have parental consent.</li>
                <li>• We reserve the right to update, modify, or discontinue our services at any time without prior notice.</li>
                <li>• We may refuse service to anyone for any reason, including suspected fraud or misuse.</li>
                <li>• The website, its content, and all transactions are governed by these Terms and applicable laws.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Products and Pricing</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• All product descriptions, images, and specifications are for reference only. Actual product colors or designs may vary slightly.</li>
                <li>• Prices are displayed in USD (or equivalent local currency where supported).</li>
                <li>• We reserve the right to modify prices, promotions, or product availability at any time.</li>
                <li>• In case of typographical or pricing errors, we may cancel orders and refund affected payments.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. Orders and Payments</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• All orders are subject to acceptance and availability.</li>
                <li>• Payment must be completed before an order is processed or shipped.</li>
                <li>• We use secure, PCI-compliant payment gateways (e.g., PayPal, Stripe, and local processors).</li>
                <li>• PawNest does not store any credit card information.</li>
                <li>• You agree to provide accurate and up-to-date billing, shipping, and contact details.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Shipping and Delivery</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Orders are typically processed within 1–3 business days.</li>
                <li>• Delivery times depend on destination, customs clearance, and courier conditions.</li>
                <li>• We are not responsible for delays due to weather, customs, or courier issues.</li>
                <li>• Customers are responsible for providing a correct shipping address. Incorrect addresses may result in additional shipping charges.</li>
                <li>• Risk of loss passes to the customer once the package is handed over to the carrier.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. Returns and Refunds</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Customers have 14 days from the date of delivery to request a return for most unused items.</li>
                <li>• Personalized, hygiene, or perishable products are non-returnable.</li>
                <li>• Refunds will be issued to the original payment method within 5–10 business days after inspection.</li>
                <li>• Return shipping costs are borne by the customer unless the product is defective or incorrect.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Warranty and Liability</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• All products are inspected for quality before shipping.</li>
                <li>• We are not responsible for damages caused by improper use, accidents, or unauthorized modifications.</li>
                <li>• To the maximum extent permitted by law, PawNest shall not be liable for indirect, incidental, or consequential damages (including loss of profits, data, or reputation).</li>
                <li>• Our total liability shall never exceed the amount you paid for the product.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. User Accounts</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• You may create an account to track orders and save preferences.</li>
                <li>• You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>• PawNest is not responsible for losses caused by unauthorized account access.</li>
                <li>• We may terminate accounts that violate our Terms or engage in fraudulent behavior.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">8. Intellectual Property</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• All content on this website, including text, images, graphics, videos, logos, and designs, is the exclusive property of PawNest.</li>
                <li>• You may not copy, distribute, or use our materials for commercial purposes without written permission.</li>
                <li>• Trademarks and brand names used on this site are protected by applicable laws.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">9. Prohibited Uses</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">You agree not to use our website for:</p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Illegal or fraudulent activities</li>
                <li>• Uploading malicious code, spam, or harmful content</li>
                <li>• Infringing upon our intellectual property or that of others</li>
                <li>• Harassing or harming other users</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 mt-3">Violation of these terms may result in immediate account termination.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">10. Privacy and Data Protection</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your data.</li>
                <li>• All personal data is processed in compliance with the EU GDPR, UK DPA, and applicable international data protection standards.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">11. Third-Party Services</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• We may use third-party providers (e.g., logistics, analytics, payment processing).</li>
                <li>• While we choose reputable partners, we are not responsible for their content, actions, or privacy practices.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">12. Force Majeure</h2>
              <p className="text-slate-700 dark:text-slate-300">
                We are not liable for failure to perform due to causes beyond our reasonable control, including natural disasters,
                pandemics, labor disputes, or transportation delays.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">13. Governing Law and Jurisdiction</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• These Terms are governed by and construed under the laws of Hong Kong SAR, without regard to conflict of law principles.</li>
                <li>• Any disputes shall be resolved in the competent courts of Hong Kong.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">14. Contact Information</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                If you have any questions or concerns regarding these Terms, please contact us:
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p>📧 gudj424896@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}