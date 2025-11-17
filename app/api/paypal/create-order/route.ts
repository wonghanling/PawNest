import { NextRequest, NextResponse } from 'next/server'
import { createPayPalOrder } from '../../../../lib/paypal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'USD' } = body

    // Validate required fields
    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
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

    // Create PayPal order
    const order = await createPayPalOrder(amount.toString(), currency)

    return NextResponse.json({
      id: order.id,
      status: order.status,
      links: order.links,
    })
  } catch (error) {
    console.error('Error creating PayPal order:', error)

    return NextResponse.json(
      {
        error: 'Failed to create payment order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}