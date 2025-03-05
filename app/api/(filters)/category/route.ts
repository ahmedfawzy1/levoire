import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const category = await db.category.findMany();
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch categories: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const category = await db.category.create({
      data: body,
    });
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to create category: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    const category = await db.category.delete({
      where: { id },
    });
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to delete category: ${error.message}` },
      { status: 500 }
    );
  }
}
