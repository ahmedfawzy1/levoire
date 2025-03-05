import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const deleted = await db.wishlist.deleteMany({
      where: {
        productId: parseInt(productId),
        userId: Number(userId),
      },
    });
    return NextResponse.json(deleted);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to remove product from wishlist ${error.message}` },
      { status: 500 }
    );
  }
}
