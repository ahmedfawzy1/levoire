import axios from 'axios';
import { db } from './db';

export async function getReviews() {
  try {
    const reviews = await axios.get('/api/review');
    return reviews.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function getReviewsByProductId(productId: number) {
  const review = await db.review.findMany({
    where: {
      productId,
    },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });

  return review;
}
