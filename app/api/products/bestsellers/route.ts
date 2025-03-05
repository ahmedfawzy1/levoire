import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

interface TopSellingProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  style: string;
  store: string;
  size: string;
  color: string;
  price: number;
  image: string;
  userId: number;
  inventory: number;
  slug: string;
  createdAt: string;
  totalsold: bigint;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');

    // Convert limit to number if provided, otherwise set to null (for unlimited)
    const limit = limitParam
      ? Math.max(1, Math.min(parseInt(limitParam, 10), 100))
      : null;

    let topSelling;

    if (limit) {
      topSelling = await db.$queryRaw<TopSellingProduct[]>`
        SELECT p.*, COALESCE(SUM(ci.quantity), 0) as totalSold
        FROM "Product" p
        LEFT JOIN "CartItem" ci ON p.id = ci."productId"
        GROUP BY p.id
        ORDER BY totalSold DESC
        LIMIT ${limit}
        `;
    } else {
      topSelling = await db.$queryRaw<TopSellingProduct[]>`
        SELECT p.*, COALESCE(SUM(ci.quantity), 0) as totalSold
        FROM "Product" p
        LEFT JOIN "CartItem" ci ON p.id = ci."productId"
        GROUP BY p.id
        ORDER BY totalSold DESC
        `;
    }

    // Convert BigInt to Number
    const sanitizedResults = topSelling.map((product: TopSellingProduct) => ({
      ...product,
      totalsold: Number(product.totalsold),
    }));

    return NextResponse.json(sanitizedResults);
  } catch (error: any) {
    console.error('Error fetching topSelling products', error.message);
    return NextResponse.json(
      { error: `Failed to fetch topSelling products ${error.message}` },
      { status: 500 }
    );
  }
}
