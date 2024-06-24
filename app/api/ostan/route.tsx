import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
const ostan = [
  { value: "0", text: "-- انتخاب کنيد --" },
  { value: "04", text: "آذربايجان شرقي" },
  { value: "05", text: "آذربايجان غربي" },
  { value: "25", text: "اردبيل" },
  { value: "11", text: "اصفهان" },
  { value: "32", text: "البرز" },
  { value: "23", text: "ايلام" },
  { value: "16", text: "بوشهر" },
  { value: "24", text: "تهران" },
  { value: "20", text: "چهارمحال و بختياري" },
  { value: "31", text: "خراسان جنوبي" },
  { value: "30", text: "خراسان رضوي" },
  { value: "29", text: "خراسان شمالي" },
  { value: "07", text: "خوزستان" },
  { value: "19", text: "زنجان" },
  { value: "21", text: "سمنان" },
  { value: "12", text: "سيستان و بلوچستان" },
  { value: "08", text: "فارس" },
  { value: "28", text: "قزوين" },
  { value: "26", text: "قم" },
  { value: "13", text: "كردستان" },
  { value: "09", text: "كرمان" },
  { value: "06", text: "كرمانشاه" },
  { value: "22", text: "كهكيلويه و بويراحمد" },
  { value: "27", text: "گلستان" },
  { value: "02", text: "گيلان" },
  { value: "15", text: "لرستان" },
  { value: "03", text: "مازندران" },
  { value: "01", text: "مركزي" },
  { value: "17", text: "هرمزگان" },
  { value: "14", text: "همدان" },
  { value: "18", text: "يزد" },
];
export async function GET(request: NextRequest) {
  // for (const provinceData of ostan) {
  //   await prisma.province.create({
  //     name: provinceData.text,
  //     code: provinceData.value,
  //   });
  // }
  const province = await prisma.province.findMany();
  return NextResponse.json(province);
}
