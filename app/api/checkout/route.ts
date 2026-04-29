import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PRODUCT } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { email, isEarlyBird } = await req.json();
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local' },
        { status: 500 }
      );
    }
    const stripe = getStripe();
    const origin = req.headers.get('origin') ?? 'http://localhost:3000';
    const price = isEarlyBird ? PRODUCT.earlyBirdPriceJpy : PRODUCT.regularPriceJpy;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: PRODUCT.name,
              description: '全6ケース・修了証PDF・永久アクセス。',
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${origin}/purchase?success=1&email=${encodeURIComponent(email)}`,
      cancel_url: `${origin}/purchase?canceled=1`,
      metadata: { email },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
