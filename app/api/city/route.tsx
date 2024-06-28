import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const cities = await prisma.city.findMany();

    return NextResponse.json(cities, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
