import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { gallery } from '@/db/schema';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const [photo] = await db.insert(gallery).values(data).returning();
    return NextResponse.json(photo, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
  }
}
