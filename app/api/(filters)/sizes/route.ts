import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const size = await db.product.findMany({
      select: { size: true },
    });
    return NextResponse.json(size);
  } catch (error: any) {
    console.error('Error fetching sizes', error.message);
    return NextResponse.json(
      { error: `Failed to fetch sizes ${error.message}` },
      { status: 500 }
    );
  }
}
