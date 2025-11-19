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
  const currentAmountRef = useRef<string>('')
  const paypalButtonInstance = useRef<any>(null)

  // 只在PayPal加载后初始化一次，之后只更新金额
  useEffect(() => {
    if (!paypalLoaded || !paypalRef.current || !window.paypal) {
      return
    }

    console.log('PayPal loaded, initializing button once')

    const initializeOnce = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 清除已有内容
        if (paypalRef.current) {
          paypalRef.current.innerHTML = ''
        }

        // 创建PayPal按钮
        const buttons = window.paypal.Buttons({
          style,
          createOrder: async () => {
            try {
              // 使用当前的amount值
              const currentAmount = currentAmountRef.current || amount
              console.log('Creating order with amount:', currentAmount)

              const response = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: currentAmount,
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
        })

        await buttons.render(paypalRef.current)
        paypalButtonInstance.current = buttons
        console.log('PayPal button initialized successfully')
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to initialize PayPal button:', err)
        setError('Failed to initialize payment')
        setIsLoading(false)
      }
    }

    initializeOnce()
  }, [paypalLoaded]) // 只依赖paypalLoaded

  // 单独的effect来更新amount，不重新初始化按钮
  useEffect(() => {
    currentAmountRef.current = amount
    console.log('Amount updated to:', amount)
  }, [amount])

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
            // Force re-initialization
            window.location.reload()
          }}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Reload Page
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