import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const skip = (page - 1) * limit;

    const brands = await db.brand.findMany({
      skip,
      take: limit,
    });

    const totalCount = await db.brand.count();
    const totalPages = Math.ceil(totalCount / limit);

    if (!url.searchParams.has('page') || !url.searchParams.has('limit')) {
      const brands = await db.brand.findMany();
      return NextResponse.json(brands);
    }

    return NextResponse.json({ brands, totalCount, totalPages });
  } catch (error: any) {
    console.error(`Error fetching brands ${error.message}`);
    return NextResponse.json(
      { message: `Failed to fetch brands ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { name, image, userId } = await req.json();

  if (!name || !image || !userId) {
    return NextResponse.json(
      { message: 'Name and image and userId are required' },
      { status: 400 }
    );
  }

  try {
    const brand = await db.brand.create({
      data: {
        name,
        image: image || null,
        userId,
      },
    });

    return NextResponse.json(
      { message: 'Brand created successfully', brand },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to create brand ${error}`);
    return NextResponse.json(
      { message: `Failed to create brand ${error.message}` },
      { status: 500 }
    );
  }
}
