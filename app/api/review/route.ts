import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { star, comment, productId, userId } = body;

  try {
    // Check if the user has already reviewed the product
    const existingReview = await db.review.findFirst({
      where: { userId, productId },
    });
    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    // Check if the user has purchased the product
    const hasPurchased = await db.cart.findFirst({
      where: {
        userId,
        status: 'COMPLETED',
        items: { some: { productId } },
      },
    });
    if (!hasPurchased) {
      return NextResponse.json(
        { error: 'You must purchase this product before reviewing' },
        { status: 400 }
      );
    }

    // Create the new review
    await db.review.create({
      data: {
        rating: star,
        comment,
        productId,
        userId,
      },
    });

    // Recalculate average rating for the product
    const reviews = await db.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    // Update the product's averageRating field
    await db.product.update({
      where: { id: productId },
      data: { averageRating: Number(averageRating.toFixed(1)) },
    });

    return NextResponse.json({ message: 'Review posted successfully!' });
  } catch (error: any) {
    console.error('Error creating review:', error.message);
    return NextResponse.json(
      { error: `Failed to create review ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get('userId') || '0');
  const productId = parseInt(searchParams.get('productId') || '0');

  try {
    if (userId && productId) {
      // Existing review check
      const review = await db.review.findFirst({
        where: {
          userId,
          productId,
        },
      });

      // Purchase check
      const hasPurchased = await db.cart.findFirst({
        where: {
          userId,
          status: 'COMPLETED',
          items: { some: { productId } },
        },
      });

      return NextResponse.json({
        review: review || null,
        hasPurchased: !!hasPurchased,
      });
    }

    // If no query parameters, return all reviews, also exclude null or empty string comments
    const reviews = await db.review.findMany({
      where: {
        comment: {
          not: null,
          notIn: [''],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['userId'], // Ensures unique reviews per user
      include: {
        User: {
          select: { id: true, username: true, email: true },
        },
        Product: {
          select: { id: true, description: true },
        },
      },
    });

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('Error fetching reviews:', error.message);
    return NextResponse.json(
      { error: `Failed to fetch reviews ${error.message}` },
      { status: 500 }
    );
  }
}
