import { getBrandsServer } from '@/app/lib/brands';
import Client from './Client';

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Brands({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const limit = 10;

  const { brands, totalPages } = await getBrandsServer(page, limit);

  const formattedBrands = brands.map(brand => ({
    ...brand,
    image: Array.isArray(brand.image) ? brand.image : [],
  }));

  return (
    <Client
      initialBrands={formattedBrands as any}
      initialTotalPages={totalPages}
      initialPage={page}
    />
  );
}
