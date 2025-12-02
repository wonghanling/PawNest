// Stripe configuration and utility functions
import Stripe from 'stripe'

export const stripeConfig = {
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  currency: 'USD',
}

// Get Stripe instance (lazy initialization)
export function getStripeInstance() {
  return new Stripe(stripeConfig.secretKey, {
    apiVersion: '2024-12-18.acacia',
  })
}

// Create Stripe Checkout Session
export async function createStripeCheckoutSession(
  amount: number,
  customerEmail: string,
  metadata: Record<string, string>
) {
  try {
    const stripe = getStripeInstance()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: stripeConfig.currency.toLowerCase(),
            product_data: {
              name: 'PawNest Order',
              description: 'Pet products from PawNest',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.pawnesting.com'}/checkout?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.pawnesting.com'}/checkout?canceled=true`,
      customer_email: customerEmail,
      metadata: metadata,
    })

    return session
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error)
    throw error
  }
}

// Retrieve Stripe Checkout Session
export async function getStripeCheckoutSession(sessionId: string) {
  try {
    const stripe = getStripeInstance()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
  } catch (error) {
    console.error('Error retrieving Stripe checkout session:', error)
    throw error
  }
}
