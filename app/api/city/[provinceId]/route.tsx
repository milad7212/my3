import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const provinceId = parseInt(params.provinceId);

  if (!provinceId) {
    return NextResponse.json({ error: "Invalid provinceId" }, { status: 400 });
  }

  try {
    const cities = await prisma.city.findMany({
      where: {
        provinceId: provinceId,
      },
    });
    return NextResponse.json(cities, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
