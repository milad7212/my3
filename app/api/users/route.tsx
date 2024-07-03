import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("data", data);
    const newUser = await prisma.user.create(data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log("error", error);
    // "Error creating user"
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
