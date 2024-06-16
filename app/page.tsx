"use client";

import React from "react";
import { registerEjdevag } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";
const ostan = [
  { value: 0, text: "-- انتخاب کنيد --" },
  { value: 4, text: "آذربايجان شرقي" },
  { value: 5, text: "آذربايجان غربي" },
  { value: 25, text: "اردبيل" },
  { value: 11, text: "اصفهان" },
  { value: 32, text: "البرز" },
  { value: 23, text: "ايلام" },
  { value: 16, text: "بوشهر" },
  { value: 24, text: "تهران" },
  { value: 20, text: "چهارمحال و بختياري" },
  { value: 31, text: "خراسان جنوبي" },
  { value: 30, text: "خراسان رضوي" },
  { value: 29, text: "خراسان شمالي" },
  { value: 7, text: "خوزستان" },
  { value: 19, text: "زنجان" },
  { value: 21, text: "سمنان" },
  { value: 12, text: "سيستان و بلوچستان" },
  { value: 8, text: "فارس" },
  { value: 28, text: "قزوين" },
  { value: 26, text: "قم" },
  { value: 13, text: "كردستان" },
  { value: 9, text: "كرمان" },
  { value: 6, text: "كرمانشاه" },
  { value: 22, text: "كهكيلويه و بويراحمد" },
  { value: 27, text: "گلستان" },
  { value: 2, text: "گيلان" },
  { value: 15, text: "لرستان" },
  { value: 3, text: "مازندران" },
  { value: 1, text: "مركزي" },
  { value: 17, text: "هرمزگان" },
  { value: 14, text: "همدان" },
  { value: 18, text: "يزد" },
];
const wichOstan = (value) => {
  const os = ostan.filter((item) => (item.value = value));
  return os[0].text;
};
const data = [
  {
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
    name: "HD SHFZDH",
    codeMeli: "6579671955",
    dayTavalod: "13",
    monthTavalod: "06",
    yearTavalod: "1358",
    dayEjdevag: "20",
    monthEjdevag: "04",
    yearEjdevag: "1402",
    phoneNumber: "09302982839",
    ostan: "08",
    explain: "",
  },
  {
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
    explain: "",
  },

  {
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
  },
];

const ScrapPage = () => {
  async function register(data) {
    registerEjdevag(data);
  }
  return (
    <>
      {/* <Modal /> */}
      <div className=" bg-gray-200 p-4">
        <SearchInput />
        {/* cards */}
        <div className="flex gap-2 mt-4">
          {data.map((item, index) => (
            <Card onRegister={() => register(item)} data={item} key={index} />
          ))}
        </div>

        {/* cards */}
        <div className="h-screen flex justify-center items-center ">
          <button
            className="bg-white p-4 rounded-md active:scale-90 transition duration-100 ease-linear"
            onClick={register}
          >
            ثبت نام سریع
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrapPage;
