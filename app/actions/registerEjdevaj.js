"use server";

import { AudioAlert } from "./app/alert";
import puppeteer from "puppeteer";

import { fillFormPage1 } from "./fillFormPage1.js";
import { fillFormPage2 } from "./fillFormPage2";
import { saveContentHtml } from "./saveContentHtml";

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
        await dialog.accept();
        alert = new AudioAlert();
        await alert.send();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await saveContentHtml(page, data);
        await fillFormPage2(page, data);

        // await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
        // await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
        // await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
        // await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
      } else {
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
