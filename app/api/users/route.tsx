import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const {
    status,
    name,
    codeMeli,
    dayTavalod,
    monthTavalod,
    yearTavalod,
    dayEjdevag,
    monthEjdevag,
    yearEjdevag,
    phoneNumber,
    ostan,
    city,
    zipCode,
    phoneStatic,
    address,
    explain,
  } = await request.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        status,
        name,
        codeMeli,
        dayTavalod,
        monthTavalod,
        yearTavalod,
        dayEjdevag,
        monthEjdevag,
        yearEjdevag,
        phoneNumber,
        zipCode,
        phoneStatic,
        address,
        explain,
        ostanId: parseInt(ostan), // Assuming `ostan` is an ID
        cityId: parseInt(city), // Assuming `city` is an ID
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    // "Error creating user"
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
