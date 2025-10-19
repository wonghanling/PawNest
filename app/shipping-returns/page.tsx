export default function ShippingReturns() {
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
            Returns & Refund Policy
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Overview</h2>
              <p className="text-slate-700 dark:text-slate-300">
                At PawNest, we want you to be completely satisfied with your purchase.
                We offer a clear, fair return policy that complies with EU, UK, and international consumer protection standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Eligibility for Returns</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                You may request a return within <strong>14 days</strong> of receiving your order, provided that:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                <li>• The item is unused, undamaged, and in its original packaging</li>
                <li>• You can provide a valid proof of purchase (order number or invoice)</li>
                <li>• The product is not a customized, hygiene, or perishable item</li>
              </ul>

              <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 p-4 mb-4">
                <p className="text-orange-800 dark:text-orange-200 font-semibold mb-2">📦 Non-returnable items include:</p>
                <ul className="space-y-1 text-orange-700 dark:text-orange-300">
                  <li>• Personalized or engraved products (e.g., name tags, custom beds)</li>
                  <li>• Opened or used hygiene products (e.g., brushes, shampoo, towels)</li>
                  <li>• Food, treats, or other perishable goods</li>
                </ul>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                These exclusions are consistent with the EU Consumer Rights Directive (2011/83/EU) and UK Consumer Contracts Regulations 2013.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. How to Request a Return</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                To initiate a return, please contact our support team at <strong>gudj424896@gmail.com</strong> within 14 days of receiving your order.
                Our team will provide you with return instructions and the return address.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Return shipping costs are the responsibility of the customer, except in cases where:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-4">
                <li>• The product was damaged or defective on arrival</li>
                <li>• We shipped the wrong item</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300">
                Please ensure all returned items are properly packaged to prevent damage during transit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Refund Process</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                If approved:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Refunds will be processed within <strong>5–10 business days</strong></li>
                <li>• Refunds are issued to the original payment method used at checkout</li>
                <li>• In the EU and UK, initial standard delivery costs will also be refunded (as required by law)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. Damaged or Defective Items</h2>
              <p className="text-slate-700 dark:text-slate-300">
                If you receive a damaged or faulty product, please contact us within <strong>7 days</strong> of delivery with photos of the damage.
                We will arrange for a replacement or full refund at no cost to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Late or Missing Refunds</h2>
              <p className="text-slate-700 dark:text-slate-300">
                If you haven't received a refund after 10 business days, please check with your payment provider first.
                If the issue persists, contact us at <strong>gudj424896@gmail.com</strong> and we'll assist immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. International Returns</h2>
              <p className="text-slate-700 dark:text-slate-300">
                For customers outside the EU/UK, this 14-day policy still applies as part of PawNest's global satisfaction guarantee.
                However, customs duties, international shipping, or taxes paid are non-refundable once the package has been cleared by your local customs authority.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">8. Policy Integrity</h2>
              <p className="text-slate-700 dark:text-slate-300">
                PawNest reserves the right to refuse returns that do not meet the above conditions.
                By placing an order, you acknowledge that you have read and agreed to this Returns & Refund Policy.
              </p>
            </section>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
              <p className="text-blue-800 dark:text-blue-200">
                If you have any questions about returns or refunds, please don't hesitate to contact us at{' '}
                <strong>gudj424896@gmail.com</strong>. We're here to help!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}