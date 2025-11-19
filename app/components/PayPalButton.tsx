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
    let isMounted = true

    const initializeButton = async () => {
      if (!isMounted) return

      setIsLoading(true)
      setError(null)

      console.log('PayPal Button initializing with amount:', amount, 'PayPal loaded:', paypalLoaded)

      if (!paypalLoaded) {
        console.log('PayPal not loaded yet')
        setIsLoading(false)
        return
      }

      if (!window.paypal) {
        console.log('PayPal window object not available')
        setIsLoading(false)
        return
      }

      if (!paypalRef.current) {
        console.log('PayPal ref not ready')
        setIsLoading(false)
        return
      }

      try {
        console.log('Clearing existing PayPal buttons')
        paypalRef.current.innerHTML = ''

        console.log('Creating PayPal buttons')
        const buttons = window.paypal.Buttons({
          style,
          createOrder: async () => {
            try {
              console.log('Creating PayPal order for amount:', amount)
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
              if (isMounted) setError('Failed to create payment order')
              throw error
            }
          },
          onApprove: async (data) => {
            try {
              console.log('PayPal payment approved, capturing order:', data.orderID)
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
              console.log('PayPal order captured successfully:', details)
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
        })

        console.log('Rendering PayPal buttons to DOM')
        await buttons.render(paypalRef.current)

        if (isMounted) {
          console.log('PayPal button rendered successfully')
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error setting up PayPal button:', err)
        if (isMounted) {
          setError('Failed to initialize payment button')
          setIsLoading(false)
        }
      }
    }

    initializeButton()

    return () => {
      isMounted = false
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
          }}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Retry Payment
        </button>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full h-14 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-gray-500 text-sm">Loading PayPal...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div ref={paypalRef} className="w-full min-h-[55px]" />
    </div>
  )
}