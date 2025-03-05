import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    description,
    category,
    style,
    store,
    size,
    inventory,
    color,
    maxPrice,
    minPrice,
    image,
    userId,
    slug,
  } = body;

  try {
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required to create a product' },
        { status: 400 }
      );
    }

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        title,
        description,
        category,
        style,
        store,
        size,
        inventory,
        color,
        maxPrice,
        minPrice,
        image,
        userId,
        slug,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error creating product:', error.message);
    return NextResponse.json(
      { error: `Failed to create product ${error.message}` },
      { status: 500 }
    );
  }
}
