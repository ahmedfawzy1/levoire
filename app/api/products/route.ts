import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('search');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    // If search query is provided, return search results
    if (searchQuery) {
      const searchTerm = searchQuery.trim();

      if (searchTerm.length === 0) {
        return NextResponse.json({
          products: [],
          totalCount: 0,
          totalPages: 0,
        });
      }

      const products = await db.product.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } },
            { store: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take: limit,
      });

      const totalCount = products.length;
      const totalPages = Math.ceil(totalCount / limit);

      return NextResponse.json({ products, totalCount, totalPages });
    }

    // pagination logic
    const skip = (page - 1) * limit;

    const products = await db.product.findMany({
      skip,
      take: limit,
    });

    const totalCount = await db.product.count();
    const totalPages = Math.ceil(totalCount / limit);

    if (!url.searchParams.has('page') || !url.searchParams.has('limit')) {
      const products = await db.product.findMany();
      return NextResponse.json(products);
    }

    return NextResponse.json({ products, totalCount, totalPages });
  } catch (error: any) {
    console.error('Error fetching products', error.message);
    return NextResponse.json(
      { error: `Failed to fetch products ${error.message}` },
      { status: 500 },
    );
  }
}
