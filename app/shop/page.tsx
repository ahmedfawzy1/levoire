import generateSEO from '@/lib/seo';
import Shop from './client';

export async function generateMetadata() {
  return generateSEO({
    title: 'Shop Levoire | Latest Fashion Trends & Timeless Styles',
    description:
      'Browse Levoire’s exclusive fashion collections. Find trendy, high-quality outfits, accessories, and wardrobe essentials for every occasion. Shop now!',
  });
}

export default function page() {
  return <Shop />;
}
