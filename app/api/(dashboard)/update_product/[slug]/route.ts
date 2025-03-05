import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const body = await request.json();
  const { slug } = await params;

  try {
    const updateProduct = await db.product.update({
      where: { slug },
      data: body,
    });

    return NextResponse.json(updateProduct);
  } catch (error: any) {
    console.error('Failed to update product', error.message);
    return NextResponse.json(
      { error: `Failed to update product ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await db.product.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete product', error.message);
    return NextResponse.json(
      { error: `Failed to delete product ${error.message}` },
      { status: 500 }
    );
  }
}
