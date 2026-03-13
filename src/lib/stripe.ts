import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
})

export async function createCheckoutSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Freelancer Rate Calculator Pro',
              description: 'Smart pricing calculator + 5 professional proposal templates',
              images: [], // TODO: Add product image
            },
            unit_amount: 2900, // $29.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
      metadata: {
        product: 'freelancer_rate_calculator_pro',
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export async function verifyCustomerAccess(sessionId: string): Promise<boolean> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session.payment_status === 'paid'
  } catch (error) {
    console.error('Error verifying customer access:', error)
    return false
  }
}

// Helper function to check if customer has access based on email
export async function checkCustomerByEmail(email: string): Promise<boolean> {
  try {
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })
    
    if (customers.data.length === 0) {
      return false
    }

    // Check if customer has any successful payments
    const payments = await stripe.paymentIntents.list({
      customer: customers.data[0].id,
      limit: 10,
    })

    return payments.data.some(payment => payment.status === 'succeeded')
  } catch (error) {
    console.error('Error checking customer by email:', error)
    return false
  }
}