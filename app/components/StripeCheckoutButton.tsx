'use client'

import { useState } from 'react'

interface StripeCheckoutButtonProps {
  amount: number
  customerEmail: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: any[]
  disabled?: boolean
}

export default function StripeCheckoutButton({
  amount,
  customerEmail,
  customerName,
  customerPhone,
  customerAddress,
  items,
  disabled = false
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // Create checkout session with order metadata
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerEmail,
          metadata: {
            customerName,
            customerPhone,
            customerAddress,
            items: JSON.stringify(items),
          },
        }),
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Stripe checkout error:', error)
      alert(error instanceof Error ? error.message : 'Payment failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
        disabled || isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </span>
      ) : (
        `Pay $${amount.toFixed(2)} with Credit Card`
      )}
    </button>
  )
}
