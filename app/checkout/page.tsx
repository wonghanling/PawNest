'use client'

import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const { cart, getTotalPrice, updateQuantity, removeFromCart } = useCart()
  const totalPrice = getTotalPrice()
  const shippingFee = 20

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
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-200 dark:border-slate-600 pb-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
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
                      <div className="ml-4 font-semibold text-gray-800 dark:text-white">
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
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    placeholder="Enter your phone"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">Address</label>
                  <textarea
                    className="w-full border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder="Enter your address"
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
              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition">
                  <input type="radio" name="payment" className="mr-3" defaultChecked />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">Credit/Debit Card (Stripe)</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition">
                  <input type="radio" name="payment" className="mr-3" />
                  <span className="text-gray-700 dark:text-slate-300 font-medium">PayPal</span>
                </label>
              </div>
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

              <button
                disabled={cart.length === 0}
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {cart.length === 0 ? 'Cart is Empty' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
