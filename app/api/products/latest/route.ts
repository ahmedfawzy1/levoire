import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');

    const limit = limitParam
      ? Math.max(1, Math.min(parseInt(limitParam, 10), 100))
      : null;

    const newArrivals = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit || undefined,
    });

    return NextResponse.json(newArrivals);
  } catch (error: any) {
    console.error('Error fetching new arrivals', error.message);
    return NextResponse.json(
      { error: `Failed to fetch new arrivals ${error.message}` },
      { status: 500 }
    );
  }
}
