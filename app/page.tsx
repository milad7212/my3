"use client";

import React, { useEffect } from "react";
import { registerEjdevag } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";
import prisma from "@/prisma/client";
import axios from "axios";

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
    name: "کافی نتی اهواز",
    codeMeli: "1841657336",
    dayTavalod: "13",
    monthTavalod: "10",
    yearTavalod: "1363",
    dayEjdevag: "05",
    monthEjdevag: "11",
    yearEjdevag: "1402",
    phoneNumber: "09100954359",
    ostan: "07",
    explain: "شهرستان گفت بزن ایذه",
    zipCode: "6391857816",
    phoneStatic: "06143635183",
    address:
      "استان خوزستان، شهرستان ايذه، بخش مركزي، شهر ايذه، حافظ شمالي، كوچه مهاجر 12 غربي، بن بست (( مرادي ))، پلاك 0، طبقه همكف",
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
    city: "234",

    explain: "با کافی نتی در ارتباطم - لامرد شعبه هم باشه علامرودشت",
  },
  {
    status: "1",
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
    city: "",
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

const ScrapPage = () => {
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`/api/users`);

        console.log("users data:", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProvinces();
  }, []);
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
