"use server";

import puppeteer from "puppeteer";

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
// name:
// codeMeli:
// dayTavalod:
// monthTavalod:
// yearTavalod: ,
// dayEjdevag:
// monthEjdevag:
// yearEjdevag:
// phoneNumber:
// ostan:

export async function registerEjdevag(data) {
  try {
    (async () => {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      // Navigate the page to a URL
      await page.goto("https://ve.cbi.ir/TasRequest.aspx");

      // Set screen size
      //   await page.setViewport({ width: 1440, height: 1024 });
      const firstInput = await page.waitForSelector(
        "#ctl00_ContentPlaceHolder1_tbIDNo"
      );

      await page.type("#ctl00_ContentPlaceHolder1_tbIDNo", data.codeMeli);

      await page.type("#ctl00_ContentPlaceHolder1_ddlBrDay", data.dayTavalod);
      await page.select(
        "#ctl00_ContentPlaceHolder1_ddlBrMonth",
        data.monthTavalod
      );
      await page.type("#ctl00_ContentPlaceHolder1_tbBrYear", data.yearTavalod);

      // تاریخ ازدواج
      // روز
      await page.select(
        "#ctl00_ContentPlaceHolder1_ddlMarryDay",
        data.dayEjdevag
      );
      // ماه
      await page.select(
        "#ctl00_ContentPlaceHolder1_ddlMarryMonth",
        data.monthEjdevag
      );
      // سال
      await page.type(
        "#ctl00_ContentPlaceHolder1_tbMarrYear",
        data.yearEjdevag
      );

      // شماره موبایل
      await page.type(
        "#ctl00_ContentPlaceHolder1_tbMobileNo",
        data.phoneNumber
      );

      // استان
      await page.select("#ctl00_ContentPlaceHolder1_ddlState", data.ostan);

      //   await browser.close();
    })();
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
