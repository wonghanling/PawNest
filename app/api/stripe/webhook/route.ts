import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  try {
    // Initialize Stripe lazily
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-12-18.acacia',
    })

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any

      // Extract metadata from session
      const metadata = session.metadata
      const customerEmail = session.customer_details?.email || session.customer_email

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

      // Prepare order data for Supabase
      const orderData = {
        order_number: orderNumber,
        customer_name: metadata.customerName,
        customer_email: customerEmail,
        customer_phone: metadata.customerPhone,
        customer_address: metadata.customerAddress,
        total_amount: session.amount_total / 100, // Convert from cents
        shipping_fee: 4, // Default shipping fee
        payment_method: 'stripe',
        payment_status: 'completed',
        stripe_transaction_id: session.payment_intent,
        items: JSON.parse(metadata.items || '[]'),
      }

      console.log('Saving Stripe order to Supabase:', orderData)

      // Save order to Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()

      if (error) {
        console.error('Error saving Stripe order:', error)
        return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
      }

      console.log('Stripe order saved successfully:', data)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook error' },
      { status: 400 }
    )
  }
}
