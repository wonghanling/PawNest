import { NextRequest, NextResponse } from 'next/server'
import { capturePayPalOrder } from '../../../../lib/paypal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderID } = body

    // Validate required fields
    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Capture PayPal order
    const captureData = await capturePayPalOrder(orderID)

    // Check if payment was successful
    const captureStatus = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.status

    if (captureStatus !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment was not completed' },
        { status: 400 }
      )
    }

    // TODO: Here you would typically:
    // 1. Save the order to your database
    // 2. Update inventory
    // 3. Send confirmation email
    // 4. Clear user's cart

    return NextResponse.json({
      id: captureData.id,
      status: captureData.status,
      purchase_units: captureData.purchase_units,
      message: 'Payment completed successfully',
    })
  } catch (error) {
    console.error('Error capturing PayPal order:', error)

    return NextResponse.json(
      {
        error: 'Failed to process payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}