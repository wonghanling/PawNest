'use client'

import { useState, useCallback, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { PaypalCheckoutButton } from '../components/PaypalCheckoutButton'
import StripeCheckoutButton from '../components/StripeCheckoutButton'

export default function CheckoutPage() {
  const { cart, getTotalPrice, updateQuantity, removeFromCart } = useCart()
  const totalPrice = getTotalPrice()
  const shippingFee = 20
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('paypal')
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  // 表单状态
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  // 检查Stripe支付成功返回
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const isSuccess = urlParams.get('success')
    const sessionId = urlParams.get('session_id')

    if (isSuccess === 'true' && sessionId) {
      // 从localStorage读取保存的订单数据
      const savedOrderData = localStorage.getItem('stripe_pending_order')

      if (savedOrderData) {
        const orderData = JSON.parse(savedOrderData)

        // 保存订单到Supabase
        handleStripeSuccess(sessionId, orderData)

        // 清除localStorage
        localStorage.removeItem('stripe_pending_order')
      }
    } else if (urlParams.get('canceled') === 'true') {
      alert('Payment was canceled.')
      // 清理URL参数
      window.history.replaceState({}, '', '/checkout')
    }
  }, [])

  // 处理Stripe支付成功
  const handleStripeSuccess = async (sessionId: string, orderData: any) => {
    setPaymentStatus('processing')

    try {
      const finalOrderData = {
        ...orderData,
        stripeSessionId: sessionId,
        paymentMethod: 'stripe',
        paymentStatus: 'completed',
      }

      console.log('Saving Stripe order:', finalOrderData)

      // 保存订单到 Supabase
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalOrderData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Stripe order saved successfully:', result)

        setPaymentStatus('success')

        // 显示成功消息
        alert(`Payment successful! 🎉\nOrder Number: ${result.order.order_number}\nPayment Method: Stripe`)

        // 清空购物车
        orderData.items.forEach((item: any) => removeFromCart(item.id))

        // 清理URL参数
        window.history.replaceState({}, '', '/checkout')
      } else {
        console.error('Failed to save Stripe order')
        setPaymentStatus('error')
        alert('Payment successful but failed to save order. Please contact support.')
      }
    } catch (error) {
      console.error('Error handling Stripe payment success:', error)
      setPaymentStatus('error')
      alert('Payment successful but there was an issue processing your order.')
    }
  }

  // 检查表单是否填写完整
  const isFormValid = () => {
    return (
      customerName.trim() !== '' &&
      customerEmail.trim() !== '' &&
      customerPhone.trim() !== '' &&
      customerAddress.trim() !== '' &&
      cart.length > 0
    )
  }

  const handlePaymentSuccess = useCallback(async (details: any, method: 'paypal' | 'stripe' = 'paypal') => {
    setPaymentStatus('success')

    try {
      // 准备订单数据 - 支持PayPal和Stripe
      const orderData = {
        customerName: customerName || 'Guest Customer',
        customerEmail: customerEmail || 'guest@example.com',
        customerPhone: customerPhone || '',
        customerAddress: customerAddress || 'Address not provided',
        totalAmount: (totalPrice + shippingFee),
        shippingFee: shippingFee,
        paymentMethod: method,
        paymentStatus: 'completed',
        // 根据支付方式保存不同的交易ID字段
        ...(method === 'paypal'
          ? { paypalTransactionId: details.id }
          : { stripeTransactionId: details.id }
        ),
        items: cart.map((item) => ({
          itemPosition: item.pageNumber && item.itemPosition
            ? `第${item.pageNumber}页第${item.itemPosition}个`
            : '位置未知',
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant
        }))
      }

      console.log('Saving order:', orderData)

      // 保存订单到 Supabase
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Order saved successfully:', result)

        // 清空购物车
        cart.forEach(item => removeFromCart(item.id))

        // 显示成功消息，包含订单号
        alert(`Payment successful! 🎉\nOrder Number: ${result.order.order_number}\nTransaction ID: ${details.id}`)
      } else {
        console.error('Failed to save order')
        alert('Payment successful but failed to save order. Please contact support.')
      }

    } catch (error) {
      console.error('Error handling payment success:', error)
      alert('Payment successful but there was an issue processing your order.')
    }
  }, [customerName, customerEmail, customerPhone, customerAddress, totalPrice, shippingFee, cart, removeFromCart])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-12">
      <div className="container mx-auto px-6">
        {/* 返回按钮 */}
        <div className="mb-6">
          <a
            href="/product"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>继续购物</span>
          </a>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：购物车和收货信息 */}
          <div className="space-y-6">
            {/* 购物车 / 订单详情 */}
            <div className="bg-white dark:bg-slate-800 border-4 border-gray-300 dark:border-slate-700 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Shopping Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-slate-400">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-200 dark:border-slate-600 pb-4 flex-wrap gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                      <div className="w-full sm:w-auto sm:ml-4 font-semibold text-gray-800 dark:text-white text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 收货信息 */}
            <div className="bg-white dark:bg-slate-800 border-4 border-gray-300 dark:border-slate-700 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Shipping Address</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    placeholder="Enter your phone"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          {/* 右侧：支付方式 */}
          <div className="space-y-6">
            {/* 支付方式选择 */}
            <div className="bg-white dark:bg-slate-800 border-4 border-gray-300 dark:border-slate-700 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Payment Method</h2>

              {paymentStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-800 text-center">Payment successful! 🎉</p>
                </div>
              )}

              {paymentStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-800 text-center">Payment failed. Please try again.</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <label className="flex items-center p-4 border-2 border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="payment"
                    className="mr-3"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">PayPal</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="payment"
                    className="mr-3"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                  />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">Credit/Debit Card</span>
                </label>
              </div>

              {/* PayPal Payment Button */}
              {paymentMethod === 'paypal' && (
                <div className="mt-6 relative">
                  {/* PayPal按钮 - 只根据总金额变化重新渲染 */}
                  <div className={!isFormValid() ? 'pointer-events-none opacity-50' : ''}>
                    <PaypalCheckoutButton
                      total={totalPrice + shippingFee}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => {
                        setPaymentStatus('error')
                        console.error('Payment error:', err)
                        alert('Payment failed. Please try again.')
                      }}
                    />
                  </div>

                  {/* Overlay message when form is incomplete */}
                  {!isFormValid() && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-slate-800/95 rounded-lg p-4 z-10">
                      <div className="text-center">
                        <p className="text-gray-800 dark:text-white font-medium mb-2">
                          Please complete all required fields
                        </p>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {!customerName.trim() && <div>• Full Name</div>}
                          {!customerEmail.trim() && <div>• Email</div>}
                          {!customerPhone.trim() && <div>• Phone Number</div>}
                          {!customerAddress.trim() && <div>• Address</div>}
                          {cart.length === 0 && <div>• Cart is empty</div>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Stripe Payment */}
              {paymentMethod === 'stripe' && (
                <div className="mt-6 relative">
                  <div className={!isFormValid() ? 'pointer-events-none opacity-50' : ''}>
                    <StripeCheckoutButton
                      amount={totalPrice + shippingFee}
                      customerEmail={customerEmail}
                      customerName={customerName}
                      customerPhone={customerPhone}
                      customerAddress={customerAddress}
                      items={cart.map((item) => ({
                        itemPosition: item.pageNumber && item.itemPosition
                          ? `第${item.pageNumber}页第${item.itemPosition}个`
                          : '位置未知',
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        variant: item.variant
                      }))}
                      disabled={!isFormValid()}
                    />
                  </div>

                  {/* Overlay message when form is incomplete */}
                  {!isFormValid() && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-slate-800/95 rounded-lg p-4 z-10">
                      <div className="text-center">
                        <p className="text-gray-800 dark:text-white font-medium mb-2">
                          Please complete all required fields
                        </p>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {!customerName.trim() && <div>• Full Name</div>}
                          {!customerEmail.trim() && <div>• Email</div>}
                          {!customerPhone.trim() && <div>• Phone Number</div>}
                          {!customerAddress.trim() && <div>• Address</div>}
                          {cart.length === 0 && <div>• Cart is empty</div>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 订单汇总 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-4 border-blue-300 dark:border-blue-800 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3 text-gray-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-300 dark:border-slate-600 pt-3 flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">${(totalPrice + shippingFee).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
