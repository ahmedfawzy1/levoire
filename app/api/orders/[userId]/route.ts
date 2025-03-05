import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId?: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'user ID is required' }, { status: 400 });
  }

  try {
    const orders = await db.cart.findMany({
      where: { userId: Number(userId) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orders.length) {
      return NextResponse.json(
        { error: 'No orders found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
