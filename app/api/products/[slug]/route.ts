import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug?: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: 'Product slug is required' },
      { status: 400 }
    );
  }

  try {
    const product = await db.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product', error.message);
    return NextResponse.json(
      { error: `Failed to fetch product ${error.message}` },
      { status: 500 }
    );
  }
}
