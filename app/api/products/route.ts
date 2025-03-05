import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const skip = (page - 1) * limit;

    const products = await db.product.findMany({
      skip,
      take: limit,
    });

    const totalCount = await db.product.count();
    const totalPages = Math.ceil(totalCount / limit);

    if (!url.searchParams.has('page') || !url.searchParams.has('limit')) {
      const products = await db.product.findMany();
      return NextResponse.json(products);
    }

    return NextResponse.json({ products, totalCount, totalPages });
  } catch (error: any) {
    console.error('Error fetching products', error.message);
    return NextResponse.json(
      { error: `Failed to fetch products ${error.message}` },
      { status: 500 }
    );
  }
}
