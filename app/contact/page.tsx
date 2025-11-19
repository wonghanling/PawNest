'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const { user, loading, isConfigured } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // 自动填充已登录用户的信息
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        name: user.user_metadata?.first_name ?
          `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim() :
          prev.name
      }))
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConfigured) {
      setSubmitMessage('Supabase is not configured. Please see SUPABASE_SETUP.md for setup instructions.')
      return
    }

    if (!user) {
      // 如果用户未登录，跳转到登录页面
      router.push('/login')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            user_id: user.id,
            name: formData.name,
            email: formData.email,
            message: formData.message
            // created_at 将由 Supabase 自动设置为当前服务器时间
          }
        ])

      if (error) throw error

      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.')
      setFormData(prev => ({ ...prev, message: '' })) // 清空消息字段
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit. Please try again.'
      setSubmitMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex-grow">
      {/* Hero Banner */}
      <section className="relative bg-cover bg-center py-32 flex items-center justify-center" style={{ backgroundImage: 'url(/optimized/01.jpg)' }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Customer Support</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">We&apos;re here to help. Reach out with any questions or concerns.</p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Send us a message</h2>
                {!user && !loading && (
                  <a
                    href="/login"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in to continue
                  </a>
                )}
              </div>

              {!user && !loading && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Please <a href="/login" className="font-medium underline hover:no-underline">sign in</a> to submit a message. New to PawNest? <a href="/login" className="font-medium underline hover:no-underline">Create an account</a> to get started.
                  </p>
                </div>
              )}

              {!isConfigured && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ <strong>Setup Required:</strong> Supabase is not configured. Please see <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">SUPABASE_SETUP.md</code> for configuration instructions.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      disabled={!user}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your Email"
                      disabled={!user}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your Message"
                      disabled={!user}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {submitMessage && (
                  <div className={`p-3 rounded ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={!user || isSubmitting}
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : user ? 'Send Message' : 'Sign In to Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">Contact Information</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Visit Us</h3>
                      <p className="text-slate-600 dark:text-slate-400">123 Pet Street, Animal City, 12345</p>
                    </div>
                  </div>
                  <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src="/details/2065.webp" alt="Location Map" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Call Us</h3>
                      <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Email Us</h3>
                      <p className="text-slate-600 dark:text-slate-400">support@pethaven.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Can&apos;t find the answer you&apos;re looking for? We&apos;re always here to help.</p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="group rounded-lg bg-background-light dark:bg-background-dark p-6 transition-all duration-300">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-slate-900 dark:text-white">Delivery Information</span>
                  <span className="text-slate-500 dark:text-slate-400 group-open:rotate-180 transition-transform">
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-slate-600 dark:text-slate-400">
                  We offer standard and express delivery options. Delivery times vary based on your location. Please see our Shipping Policy for more details.
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group rounded-lg bg-background-light dark:bg-background-dark p-6 transition-all duration-300">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-slate-900 dark:text-white">Returns &amp; Exchanges</span>
                  <span className="text-slate-500 dark:text-slate-400 group-open:rotate-180 transition-transform">
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-slate-600 dark:text-slate-400">
                  Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can&apos;t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it.
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group rounded-lg bg-background-light dark:bg-background-dark p-6 transition-all duration-300">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-slate-900 dark:text-white">Payment Security</span>
                  <span className="text-slate-500 dark:text-slate-400 group-open:rotate-180 transition-transform">
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-slate-600 dark:text-slate-400">
                  We use a secure SSL connection to protect your personal and payment information. All major credit cards are accepted, and we ensure the highest level of security for all transactions.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
