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
    if (!paypalLoaded) {
      setIsLoading(false)
      return
    }

    if (!window.paypal) {
      setIsLoading(false)
      return
    }

    if (!paypalRef.current) {
      setIsLoading(false)
      return
    }

    const initializePayPal = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 清除现有内容
        paypalRef.current!.innerHTML = ''

        // 创建PayPal按钮
        await window.paypal.Buttons({
          style,
          createOrder: async () => {
            const response = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount, currency }),
            })
            const order = await response.json()
            return order.id
          },
          onApprove: async (data) => {
            const response = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderID: data.orderID }),
            })
            const details = await response.json()
            onSuccess(details)
          },
          onError: (err) => onError && onError(err),
          onCancel: () => onCancel && onCancel(),
        }).render(paypalRef.current)

        setIsLoading(false)
      } catch (err) {
        console.error('PayPal initialization error:', err)
        setError('Failed to load PayPal')
        setIsLoading(false)
      }
    }

    initializePayPal()
  }, [paypalLoaded, amount, currency])

  if (paypalError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600 text-sm">Payment system error: {paypalError}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reload Page
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-14 bg-gray-100 rounded animate-pulse flex items-center justify-center">
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