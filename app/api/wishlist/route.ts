import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const productId = searchParams.get('productId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    if (productId) {
      const wishlist = await db.wishlist.findFirst({
        where: { userId: Number(userId), productId: Number(productId) },
      });
      return NextResponse.json(wishlist);
    } else {
      const wishlist = await db.wishlist.findMany({
        where: { userId: Number(userId) },
        include: { product: true },
      });
      return NextResponse.json(wishlist);
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch wishlist ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { productId } = await req.json();
    const userId = Number(session.user.id);

    if (!productId || typeof productId !== 'number') {
      return NextResponse.json({ error: 'Invalid productid' }, { status: 400 });
    }

    const existingWishlist = await db.wishlist.findFirst({
      where: {
        userId: userId,
        productId: Number(productId),
      },
    });

    if (existingWishlist) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 400 }
      );
    }

    const wishlist = await db.wishlist.create({
      data: {
        productId,
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(wishlist);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to add product to wishlist ${error.message}` },
      { status: 500 }
    );
  }
}
