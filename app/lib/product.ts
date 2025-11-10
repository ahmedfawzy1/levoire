import axios from 'axios';

const baseUrl = typeof window === 'undefined' ? process.env.NEXTAUTH_URL : '';

export async function getAllProducts() {
  try {
    const res = await axios.get(`${baseUrl}/api/products`);
    const products = res.data;
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProducts(
  page: number,
  limit: number,
  signal?: AbortSignal,
) {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products?page=${page}&limit=${limit}`,
      { signal },
    );
    const data = res.data;
    return {
      data: data.products,
      totalPage: data.totalPages,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('Error fetching products:', error);
    }
    return { products: [], totalPage: 1 };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const res = await axios.get(`${baseUrl}/api/products/${slug}`);
    const product = res.data;
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return [];
  }
}

export async function getAllLatestProduct() {
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/products/latest`,
    );
    const latestProducts = res.data;
    return latestProducts;
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
}

export async function getLatestProduct() {
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/products/latest?limit=5`,
    );
    const latestProducts = res.data;
    return latestProducts;
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
}

export async function getAllBestSellersProduct() {
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/products/bestsellers`,
    );
    const bestSellersProducts = res.data;
    return bestSellersProducts;
  } catch (error) {
    console.error('Error fetching best-selling products:', error);
    return [];
  }
}

export async function getBestSellersProduct() {
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/products/bestsellers?limit=5`,
    );
    const bestSellersProducts = res.data;
    return bestSellersProducts;
  } catch (error) {
    console.error('Error fetching best-selling products:', error);
    return [];
  }
}

export async function searchProducts(
  query: string,
  limit: number = 5,
  signal?: AbortSignal,
) {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const res = await axios.get(
      `${baseUrl}/api/products?search=${encodeURIComponent(query.trim())}&limit=${limit}`,
      { signal },
    );
    const data = res.data;
    return data.products || [];
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Search request canceled', error.message);
    } else {
      console.error('Error searching products:', error);
    }
    return [];
  }
}
