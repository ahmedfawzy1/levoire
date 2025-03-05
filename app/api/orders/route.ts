import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await db.cart.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
