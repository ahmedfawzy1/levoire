import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const colors = await db.color.findMany();
    return NextResponse.json(colors);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch colors: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const color = await db.color.create({
      data: body,
    });
    return NextResponse.json(color);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to create color: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    const color = await db.color.delete({
      where: { id },
    });
    return NextResponse.json(color);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to delete color: ${error.message}` },
      { status: 500 }
    );
  }
}
