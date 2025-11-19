'use client'

import { useEffect, useRef, useState } from 'react'
import { usePayPal } from './PayPalProvider'
import { PayPalButtonProps } from '../../types/paypal'

export default function PayPalButton({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
  onCancel,
  style = {
    layout: 'vertical',
    color: 'gold',
    shape: 'rect',
    label: 'paypal',
    height: 55,
  },
}: PayPalButtonProps) {
  const { paypalLoaded, paypalError } = usePayPal()
  const paypalRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset error state when amount changes (e.g., cart updated)
    setError(null)
    setIsLoading(true)

    console.log('PayPal Button initializing with amount:', amount)

    if (!paypalLoaded || !paypalRef.current || !window.paypal) {
      console.log('PayPal not ready:', { paypalLoaded, hasRef: !!paypalRef.current, hasWindow: !!window.paypal })
      setIsLoading(false)
      return
    }

    // Clear any existing PayPal buttons
    if (paypalRef.current) {
      paypalRef.current.innerHTML = ''
    }

    try {
      window.paypal.Buttons({
        style,
        createOrder: async () => {
          try {
            // Reset error state on new attempt
            setError(null)

            // Call our API to create the order
            const response = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount,
                currency,
              }),
            })

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const order = await response.json()
            console.log('PayPal order created:', order.id)
            return order.id
          } catch (error) {
            console.error('Error creating PayPal order:', error)
            setError('Failed to create payment order')
            throw error
          }
        },
        onApprove: async (data) => {
          try {
            // Call our API to capture the order
            const response = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            })

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const details = await response.json()
            onSuccess(details)
          } catch (error) {
            console.error('Error capturing PayPal order:', error)
            const errorMessage = error instanceof Error ? error : new Error('Payment capture failed')
            if (onError) {
              onError(errorMessage)
            }
            // Don't setError here to allow retry
          }
        },
        onError: (err) => {
          console.error('PayPal Checkout Error:', err)
          if (onError) {
            onError(err instanceof Error ? err : new Error('PayPal checkout error'))
          }
          // Don't setError here to allow retry
        },
        onCancel: () => {
          console.log('Payment cancelled by user')
          if (onCancel) {
            onCancel()
          }
          // Don't setError here - cancellation is not an error
        },
      }).render(paypalRef.current).then(() => {
        console.log('PayPal button rendered successfully')
        setIsLoading(false)
      }).catch((err) => {
        console.error('Failed to render PayPal button:', err)
        setError('Failed to load payment button')
        setIsLoading(false)
      })

    } catch (err) {
      console.error('Error setting up PayPal button:', err)
      setError('Failed to initialize payment')
      setIsLoading(false)
    }
  }, [paypalLoaded, amount, currency])

  // Show error if PayPal failed to load
  if (paypalError) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-600 text-sm">Payment system error: {paypalError}</p>
      </div>
    )
  }

  // Show error if button failed to initialize
  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => {
            setError(null)
            setIsLoading(true)
            // Trigger re-render by clearing and re-adding the button
            if (paypalRef.current) {
              paypalRef.current.innerHTML = ''
            }
          }}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Retry Payment
        </button>
      </div>
    )
  }

  // Show loading state
  if (isLoading || !paypalLoaded) {
    return (
      <div className="w-full h-14 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-gray-500 text-sm">Loading PayPal...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div ref={paypalRef} className="w-full" />
    </div>
  )
}