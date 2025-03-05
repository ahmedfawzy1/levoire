import { MetadataRoute } from 'next';
import { getAllProducts } from './lib/product';

interface Product {
  slug: string;
  updatedAt: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products: Product[] = await getAllProducts();

  const productsEntries: MetadataRoute.Sitemap = products.map(
    ({ slug, updatedAt }) => ({
      url: `${process.env.NEXTAUTH_URL}/api/products/${slug}`,
      lastModified: new Date(updatedAt).toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    })
  );

  return [
    {
      url: `${process.env.NEXTAUTH_URL}/api/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...productsEntries,
  ];
}
