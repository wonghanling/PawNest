export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-8">
              <p><strong>Effective Date:</strong> October 2025</p>
              <p><strong>Last Updated:</strong> October 2025</p>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              At PawNest, we respect and protect your privacy. This Privacy Policy explains how we collect, use,
              and safeguard your personal information when you visit our website or make a purchase from us.
            </p>

            <p className="text-slate-700 dark:text-slate-300 mb-8">
              By using our website, you agree to this policy.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We collect only the data necessary to provide our services, including:
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">a. Personal Information</h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-4">
                <li>• Name</li>
                <li>• Email address</li>
                <li>• Shipping and billing address</li>
                <li>• Phone number</li>
                <li>• Payment information (processed securely by third-party gateways; we do not store full card details)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">b. Automatically Collected Data</h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• IP address, browser type, device information</li>
                <li>• Pages visited and time spent on the site</li>
                <li>• Cookies and analytics data (for improving user experience)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">We use your data for the following purposes:</p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• To process and deliver your orders</li>
                <li>• To send order updates, confirmations, and support messages</li>
                <li>• To improve our website and customer experience</li>
                <li>• To comply with legal obligations (tax, anti-fraud, etc.)</li>
                <li>• To send promotional or marketing emails (only with your consent)</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 mt-4">
                You can unsubscribe from marketing communications anytime by clicking "Unsubscribe" at the bottom of our emails.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. Cookies</h2>
              <p className="text-slate-700 dark:text-slate-300">
                We use cookies to personalize your experience, analyze traffic, and improve performance.
                You can choose to disable cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Data Protection and Security</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• We follow industry-standard security measures to protect your data, including encryption and secure HTTPS communication.</li>
                <li>• All payment transactions are processed via PCI-DSS compliant providers such as Stripe or PayPal.</li>
                <li>• PawNest staff never have direct access to your full payment information.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. Data Retention</h2>
              <p className="text-slate-700 dark:text-slate-300">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected,
                or as required by law (for example, tax or accounting obligations).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Sharing Your Information</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                We only share data with trusted third parties necessary for business operations, such as:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-4">
                <li>• Payment processors (PayPal, Stripe, etc.)</li>
                <li>• Shipping carriers (e.g., DHL, UPS)</li>
                <li>• Analytics and email tools (e.g., Google Analytics, Mailchimp)</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300">
                These partners are contractually required to protect your data and comply with privacy laws.
                We never sell or rent your personal data to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. Your Rights</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Depending on your location, you have the following rights under privacy laws (e.g., GDPR, CCPA):
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-4">
                <li>• Right to access your personal data</li>
                <li>• Right to correct inaccurate data</li>
                <li>• Right to request deletion ("Right to be forgotten")</li>
                <li>• Right to withdraw consent</li>
                <li>• Right to data portability</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300">
                To exercise your rights, contact us at: <strong>📧 gudj424896@gmail.com</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">8. International Data Transfers</h2>
              <p className="text-slate-700 dark:text-slate-300">
                Your information may be transferred to and processed in other countries where our partners operate (e.g., Hong Kong, US, EU).
                We ensure that such transfers are conducted with appropriate safeguards, following GDPR Standard Contractual Clauses and
                equivalent protections.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">9. Children's Privacy</h2>
              <p className="text-slate-700 dark:text-slate-300">
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children.
                If we discover that we have collected such information, we will delete it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-slate-700 dark:text-slate-300">
                We may update this Privacy Policy periodically to reflect changes in our practices or for legal compliance.
                The updated version will always be available on our website, with the "Last Updated" date clearly shown at the top.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">11. Contact Us</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                If you have any questions or concerns about our Privacy Policy or data practices, please contact:
              </p>
              <div className="text-slate-700 dark:text-slate-300">
                <p>📧 gudj424896@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}