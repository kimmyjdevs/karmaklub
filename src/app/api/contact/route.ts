import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Karma Club Contact <contact@karmaclub.com.au>',
      to: process.env.CONTACT_EMAIL ?? 'hello@karmaclub.com.au',
      reply_to: data.email,
      subject: `[Karma Club] ${data.subject} — from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
