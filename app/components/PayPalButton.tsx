'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
  const [isInitialized, setIsInitialized] = useState(false)
  const initializingRef = useRef(false)
  const currentAmountRef = useRef<string>(amount)

  // Memoize the PayPal button initialization to prevent excessive re-renders
  const initializePayPalButton = useCallback(async () => {
    if (initializingRef.current || !paypalLoaded || !window.paypal || !paypalRef.current) {
      return
    }

    initializingRef.current = true
    setError(null)
    setIsLoading(true)

    console.log('Initializing PayPal button with amount:', amount)

    try {
      // Clear any existing PayPal buttons
      paypalRef.current.innerHTML = ''

      await window.paypal.Buttons({
        style,
        createOrder: async () => {
          try {
            setError(null)
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
          }
        },
        onError: (err) => {
          console.error('PayPal Checkout Error:', err)
          if (onError) {
            onError(err instanceof Error ? err : new Error('PayPal checkout error'))
          }
        },
        onCancel: () => {
          console.log('Payment cancelled by user')
          if (onCancel) {
            onCancel()
          }
        },
      }).render(paypalRef.current)

      console.log('PayPal button rendered successfully')
      setIsInitialized(true)
      setIsLoading(false)
      currentAmountRef.current = amount
    } catch (err) {
      console.error('Error setting up PayPal button:', err)
      setError('Failed to initialize payment')
      setIsLoading(false)
    } finally {
      initializingRef.current = false
    }
  }, [amount, currency, paypalLoaded, style, onSuccess, onError, onCancel])

  // Only re-initialize when amount changes significantly or PayPal loads
  useEffect(() => {
    if (!paypalLoaded) {
      console.log('PayPal not loaded yet')
      setIsLoading(false)
      return
    }

    if (!paypalRef.current) {
      console.log('PayPal ref not ready yet')
      setIsLoading(false)
      return
    }

    // Only re-initialize if amount has actually changed
    if (currentAmountRef.current !== amount || !isInitialized) {
      console.log(`Amount changed from ${currentAmountRef.current} to ${amount}, reinitializing...`)
      setIsInitialized(false)
      initializePayPalButton()
    } else {
      console.log('Amount unchanged, skipping reinitialization')
      setIsLoading(false)
    }
  }, [paypalLoaded, amount, isInitialized, initializePayPalButton])

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
            setIsInitialized(false)
            initializePayPalButton()
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