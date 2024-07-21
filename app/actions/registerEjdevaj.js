"use server";

import { AudioAlert } from "./app/alert";
import axios from "axios";
import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { solveCaptcha } from "./solveCaptcha";
import { getDateTimeString } from "./getDateTimeString";
import { fillFormPage1 } from "./fillFormPage1.js";

export async function registerEjdevag(data) {
  const width = 1024; // عرض صفحه نمایش
  const height = 1000;
  let tryRegister = 0;

  // تابع اصلی برای ثبت ازدواج
  async function register(page) {
    tryRegister++;

    // مدیریت دیالوگ‌ها
    page.on("dialog", async (dialog) => {
      console.log(`${tryRegister}  ::`, dialog.message());

      let alert;
      if (dialog.message().includes("6")) {
        // alert = new SMSAlert(alertData);
        // await alert.send();

        await dialog.accept();
        alert = new AudioAlert();
        await alert.send();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // کل محتوای HTML صفحه را بگیرید
        const html = await page.content();
        // نام فایل بر اساس تاریخ و ساعت جاری
        const fileName = `doc/page_${
          data.codeMeli
        }_${getDateTimeString()}.html`;

        // محتوای HTML را در یک فایل ذخیره کنید
        writeFileSync(fileName, html);

        await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
        await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
        await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
        await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
      } else {
        // alert = new EitaAlert(alertData);

        // alert = new AudioAlert();
        // await alert.send();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await dialog.accept();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fillFormPage1(page, data);
      }
    });
    await fillFormPage1(page, data);
  }

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: width, height: height });
  // پاک کردن کوکی‌ها
  await page.deleteCookie(...(await page.cookies()));
  await page.goto("https://ve.cbi.ir/TasRequest.aspx", {
    waitUntil: "networkidle2",
    timeout: 70000,
  });
  await page.waitForSelector("body");

  await register(page);
}

async function sendCaptchaToServer(src) {
  try {
    const response = await axios.post(
      "http://146.19.212.232:8000/marriage-baby",
      {
        src: src,
      }
    );

    return response.data.result;
  } catch (error) {
    console.log("error captcha", error);
    return "";
  }
}

async function getCaptchaSrc(page) {
  const src = await page.evaluate(() => {
    return document?.querySelector("#ctl00_ContentPlaceHolder1_ImgCaptcha").src;
  });
  return await sendCaptchaToServer(src);
}
