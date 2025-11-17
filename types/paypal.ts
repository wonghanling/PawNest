// PayPal related TypeScript types

export interface PayPalOrderResponse {
  id: string
  status: string
  links: Array<{
    href: string
    rel: string
    method: string
  }>
}

export interface PayPalCaptureResponse {
  id: string
  status: string
  purchase_units: Array<{
    payments: {
      captures: Array<{
        id: string
        status: string
        amount: {
          currency_code: string
          value: string
        }
      }>
    }
  }>
}

export interface PayPalButtonProps {
  amount: string
  currency?: string
  onSuccess: (details: PayPalCaptureResponse) => void
  onError?: (error: Error) => void
  onCancel?: () => void
  style?: {
    layout?: 'vertical' | 'horizontal'
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black'
    shape?: 'rect' | 'pill'
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay'
    height?: number
  }
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size?: string
  specId?: number
  image?: string
}

export interface OrderData {
  items: CartItem[]
  total: number
  currency: string
  shippingAddress?: {
    name: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
}