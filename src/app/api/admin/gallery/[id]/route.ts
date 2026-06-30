import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { gallery } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await db.delete(gallery).where(eq(gallery.id, Number(params.id)));
  return NextResponse.json({ ok: true });
}
