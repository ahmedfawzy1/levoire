import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const idNumber = Number(id);
  if (!idNumber) {
    return NextResponse.json({ message: 'id is required' }, { status: 400 });
  }

  try {
    const brand = await db.brand.findUnique({
      where: { id: idNumber },
    });
    if (!brand) {
      return NextResponse.json({ message: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (error: any) {
    console.error(`Failed to fetch brand ${error}`);
    return NextResponse.json(
      { message: `Failed to fetch brand: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { id, name, image } = await req.json();

  if (!id || !name || !image) {
    return NextResponse.json(
      { message: 'id, name and image are required' },
      { status: 400 }
    );
  }

  try {
    const brand = await db.brand.update({
      where: { id },
      data: { name, image: image || null },
    });

    return NextResponse.json(
      { message: 'Brand updated successfully', brand },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to update brand ${error}`);
    return NextResponse.json(
      { message: `Failed to update brand ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const idNumber = Number(id);

  if (!idNumber) {
    return NextResponse.json({ message: 'id is required' }, { status: 400 });
  }

  try {
    await db.brand.delete({
      where: { id: idNumber },
    });

    return NextResponse.json(
      { message: 'Brand deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to delete brand ${error}`);
    return NextResponse.json(
      { message: `Failed to delete brand ${error.message}` },
      { status: 500 }
    );
  }
}
