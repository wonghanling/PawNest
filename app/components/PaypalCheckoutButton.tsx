import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

interface PaypalCheckoutButtonProps {
  total: number
  onSuccess: (details: any, data: any) => void
  onError?: (err: any) => void
}

export function PaypalCheckoutButton({ total, onSuccess, onError }: PaypalCheckoutButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className="w-full h-14 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-gray-500 text-sm">Loading PayPal...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'checkout',
          height: 55,
        }}
        forceReRender={[total]} // 只根据金额重渲染按钮
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order!.capture()
            onSuccess(details, data)
          } catch (err) {
            onError?.(err)
          }
        }}
        onError={(err) => {
          console.error('PayPal error', err)
          onError?.(err)
        }}
        onCancel={() => {
          console.log('Payment cancelled by user')
        }}
      />
    </div>
  )
}