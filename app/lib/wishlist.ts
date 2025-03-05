import axios from 'axios';

const baseUrl = typeof window === 'undefined' ? process.env.NEXTAUTH_URL : '';

export async function getWishlist(userId: number) {
  try {
    const res = await axios.get(`${baseUrl}/api/wishlist`, {
      params: {
        userId,
      },
    });
    const wishlist = res.data;
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist', error);
    return [];
  }
}

export async function getWishlistByProduct(userId: number, productId: number) {
  try {
    const res = await axios.get(`${baseUrl}/api/wishlist`, {
      params: {
        userId,
        productId,
      },
    });
    const wishlist = res.data;
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist by product', error);
    return [];
  }
}

export async function addToWishlist(productId: number) {
  try {
    const res = await axios.post(`${baseUrl}/api/wishlist`, {
      productId,
    });
    const wishlist = res.data;
    return wishlist;
  } catch (error) {
    console.error('Error adding to wishlist', error);
    return [];
  }
}

export async function removeFromWishlist(productId: number) {
  try {
    const res = await axios.delete(`${baseUrl}/api/wishlist/${productId}`);
    const wishlist = res.data;
    return wishlist;
  } catch (error) {
    console.error('Error removing from wishlist', error);
    return [];
  }
}
