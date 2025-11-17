'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { PAYPAL_CLIENT_ID } from '../config/paypal'

// PayPal SDK type definitions
declare global {
  interface Window {
    paypal?: {
      Buttons: (options: PayPalButtonOptions) => {
        render: (container: string | Element) => Promise<void>
      }
      FUNDING: {
        PAYPAL: string
        CREDIT: string
        CARD: string
      }
    }
  }
}

interface PayPalButtonOptions {
  createOrder: () => Promise<string>
  onApprove: (data: { orderID: string }) => Promise<void>
  onError?: (err: Error) => void
  onCancel?: () => void
  style?: {
    layout?: 'vertical' | 'horizontal'
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black'
    shape?: 'rect' | 'pill'
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay'
    height?: number
  }
}

interface PayPalContextType {
  paypalLoaded: boolean
  paypalError: string | null
}

const PayPalContext = createContext<PayPalContextType>({
  paypalLoaded: false,
  paypalError: null,
})

export const usePayPal = () => useContext(PayPalContext)

interface PayPalProviderProps {
  children: React.ReactNode
}

export default function PayPalProvider({ children }: PayPalProviderProps) {
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [paypalError, setPaypalError] = useState<string | null>(null)

  useEffect(() => {
    // Check if PayPal SDK is already loaded
    if (window.paypal) {
      setPaypalLoaded(true)
      return
    }

    // Get client ID from config
    const clientId = PAYPAL_CLIENT_ID

    console.log('PayPal Client ID:', clientId ? 'Found' : 'Not found', clientId?.substring(0, 10))

    if (!clientId) {
      setPaypalError('PayPal Client ID not configured')
      console.error('NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable is missing')
      return
    }

    // Load PayPal SDK
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&components=buttons`
    script.async = true

    script.onload = () => {
      if (window.paypal) {
        setPaypalLoaded(true)
      } else {
        setPaypalError('PayPal SDK failed to load properly')
      }
    }

    script.onerror = () => {
      setPaypalError('Failed to load PayPal SDK')
    }

    document.head.appendChild(script)

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <PayPalContext.Provider value={{ paypalLoaded, paypalError }}>
      {children}
    </PayPalContext.Provider>
  )
}