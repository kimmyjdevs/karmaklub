import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/db';
import { orders } from '@/db/schema';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      await db.insert(orders).values({
        stripeSessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        items,
        totalAmount: session.amount_total ?? 0,
        status: 'paid',
      });
    } catch (err) {
      console.error('Failed to save order:', err);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
