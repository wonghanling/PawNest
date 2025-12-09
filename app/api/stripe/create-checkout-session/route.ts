import { NextRequest, NextResponse } from 'next/server'
import { createStripeCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  // Stripe支付暂时关闭 - 等待身份验证完成
  return NextResponse.json(
    { error: 'Stripe payment is temporarily disabled. Please use PayPal.' },
    { status: 503 }
  )

  /* 暂时注释掉 - 等待Stripe身份验证完成后重新启用
  try {
    const body = await request.json()
    const { amount, customerEmail, metadata } = body

    // Validate required fields
    if (!amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Amount and customer email are required' },
        { status: 400 }
      )
    }

    // Validate amount format
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount format' },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const session = await createStripeCheckoutSession(
      numericAmount,
      customerEmail,
      metadata || {}
    )

    return NextResponse.json({
      id: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error)

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
  */
}
