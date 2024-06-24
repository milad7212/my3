"use client";

import React from "react";
import { registerEjdevag } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";
import prisma from "@/prisma/client";

const wichOstan = (value) => {
  const os = ostan.filter((item) => (item.value = value));
  return os[0].text;
};
const data = [
  {
    status: "1",
    name: "",
    codeMeli: "",
    dayTavalod: "",
    monthTavalod: "",
    yearTavalod: "",
    dayEjdevag: "",
    monthEjdevag: "",
    yearEjdevag: "",
    phoneNumber: "",
    ostan: "",
    explain: "",
  },
  {
    status: "0",
    name: "HD SHFZDH",
    codeMeli: "6579671955",
    dayTavalod: "13",
    monthTavalod: "06",
    yearTavalod: "1358",
    dayEjdevag: "20",
    monthEjdevag: "04",
    yearEjdevag: "1402",
    phoneNumber: "09302982839",
    zipCode: "7444138798",
    phoneStatic: "07152780000",
    address:
      "استان فارس، شهرستان لامرد، بخش علامرودشت، شهر علامرودشت، روگيرا، كوچه 1امامحسن مجتبي(ع)[2امام رضاع]، كوچه 8 اتحاد، پلاك 0، طبقه همكف",
    ostan: "08",
    explain: "با کافی نتی در ارتباطم - لامرد شعبه هم باشه علامرودشت",
  },
  {
    status: "0",
    name: "SABZ -فاطمه رضایی",
    codeMeli: "5150240801",
    dayTavalod: "15",
    monthTavalod: "08",
    yearTavalod: "1383",
    dayEjdevag: "01",
    monthEjdevag: "08",
    yearEjdevag: "1401",
    phoneNumber: "09302328369",
    ostan: "08",
    zipCode: "7444133780",
    phoneStatic: "07152782350",
    address:
      "استان فارس، شهرستان لامرد، بخش علامرودشت، شهر علامرودشت، مركز شهر، كوچه 1 صراف، خيابان 22بهمن، پلاك 0، طبقه همكف",

    explain:
      "کافی نت  اپل _به دختره پیام دادم قرار شد اسم بانک را بفرستم اگه خواست بگه بانک مورد نظرش ملی  شعبه علامرودشت شهرستان لامرد . امتیاز ایثارگری داره",
  },

  {
    status: "1",
    name: "همسر عباد",
    codeMeli: "3040665499",
    dayTavalod: "29",
    monthTavalod: "09",
    yearTavalod: "1382",
    dayEjdevag: "01",
    monthEjdevag: "02",
    yearEjdevag: "1403",
    phoneNumber: "09916968750",
    ostan: "09",
    explain: "",
    zipCode: "7714653561",
    phoneStatic: "03434182867",
    address:
      "استان كرمان، شهرستان رفسنجان، بخش مركزي، شهر رفسنجان، مومن آباد، بلوار شهيد خالوئي ، بن بست شهيد  خالوئي 2، پلاك 2، ساختمان مسكوني بانك، طبقه همكف",
  },
];
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

const ScrapPage = () => {
  async function register(data) {
    registerEjdevag(data);
  }

  return (
    <>
      {/* <Modal /> */}
      <div className=" bg-gray-200 p-4 min-h-screen">
        <SearchInput />
        {/* cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-4 grid-cols-1 ">
          {data.map((item, index) => (
            <>
              {item.status == "0" && (
                <Card
                  onRegister={() => register(item)}
                  data={item}
                  key={index}
                />
              )}
            </>
          ))}
        </div>

        {/* cards */}
      </div>
    </>
  );
};

export default ScrapPage;
