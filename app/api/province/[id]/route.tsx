import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params:  Record<string, string> }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  try {
    const item = await prisma.province.findUnique({
      where: {
        id: id,
      },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
