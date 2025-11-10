import generateSEO from '@/lib/seo';
import Shop from './client';
import { getProductsServer } from '@/app/lib/product';

export const revalidate = 3600;

export async function generateMetadata() {
  return generateSEO({
    title: 'Shop Levoire | Latest Fashion Trends & Timeless Styles',
    description:
      "Browse Levoire's exclusive fashion collections. Find trendy, high-quality outfits, accessories, and wardrobe essentials for every occasion. Shop now!",
  });
}

export default async function page() {
  const { products, totalPages } = await getProductsServer(1, 12);

  return <Shop initialProducts={products} initialTotalPages={totalPages} />;
}
