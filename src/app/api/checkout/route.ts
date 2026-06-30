import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

const itemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  price: z.number(),
  qty: z.number().int().min(1),
  size: z.string().optional(),
  image: z.string().optional(),
});

const bodySchema = z.object({
  items: z.array(itemSchema).min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = bodySchema.parse(body);
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    });

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.size ? `${item.name} — ${item.size}` : item.name,
            images: item.image ? [item.image] : [],
            metadata: {
              productId: String(item.productId),
              size: item.size ?? '',
            },
          },
          unit_amount: item.price,
        },
        quantity: item.qty,
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({
            productId: i.productId,
            name: i.name,
            qty: i.qty,
            price: i.price,
            size: i.size,
          }))
        ),
      },
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 });
    }
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
