"use server";

import { sendMessageEita } from "@/utils/sendMessageEita";
import axios from "axios";
import puppeteer, { Page } from "puppeteer";

interface Data {
  codeMeli: string;
  dayTavalod: string;
  monthTavalod: string;
  yearTavalod: string;
  dayEjdevag: string;
  monthEjdevag: string;
  yearEjdevag: string;
  phoneNumber: string;
  phoneStatic: string;
  zipCode: string;
  address: string;
  ostan: string;
  city: string;
}

export async function registerEjdevag(data: Data): Promise<void> {
  const width = 1326; // عرض صفحه نمایش
  const height = 3000;
  let tryRegister = 0;

  // تابع اصلی برای ثبت ازدواج
  async function register(page: Page): Promise<void> {
    tryRegister++;

    // مدیریت دیالوگ‌ها
    page.on("dialog", async (dialog) => {
      console.log(`${tryRegister}  ::`, dialog.message());
      let dataForSendEita = {
        mes: dialog.message(),
        ostan: data.ostan,
        city: data.city,
        mobile: data.phoneNumber,
      };
      await sendMessageEita(dataForSendEita);

      if (dialog.message().includes("6")) {
        await dialog.accept();
        await Promise.all([
          page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await sendMessageEita(dataForSendEita);

        await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
        await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
        await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
        await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await dialog.accept();
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await fillForm(page);
      }
    });
    await fillForm(page);
  }

  async function fillForm(page: Page): Promise<void> {
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

    await page.select(
      "#ctl00_ContentPlaceHolder1_ddlMarryDay",
      data.dayEjdevag
    );
    await page.select(
      "#ctl00_ContentPlaceHolder1_ddlMarryMonth",
      data.monthEjdevag
    );
    await page.type("#ctl00_ContentPlaceHolder1_tbMarrYear", data.yearEjdevag);

    await page.type("#ctl00_ContentPlaceHolder1_tbMobileNo", data.phoneNumber);
    await page.select("#ctl00_ContentPlaceHolder1_ddlState", data.ostan);

    const captchaInput = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_tbCaptcha"
    );
    let captcha = await getCaptchaSrc(page);
    await captchaInput?.type(`${captcha}`);

    await page.click("#ctl00_ContentPlaceHolder1_btnContinue1");
  }

  // تابعی برای رفرش کردن صفحه هر 30 ثانیه
  // async function refreshPage(page: Page): Promise<void> {
  //   setInterval(async () => {
  //     console.log("Refreshing page...");
  //     await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  //     await fillForm(page); // دوباره پر کردن فرم بعد از رفرش
  //   }, 30000);
  // }

  // اولین اجرا به محض شروع برنامه
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${width},${height}`],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: width, height: height });
  // پاک کردن کوکی‌ها
  await page.deleteCookie(...(await page.cookies()));
  await page.goto("https://ve.cbi.ir/TasRequest.aspx", {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  await page.waitForSelector("body");

  await register(page);
  // await refreshPage(page);
}

// ارسال عکس به سرور
async function sendCaptchaToServer(src: string): Promise<string> {
  try {
    const response = await axios.post(
      "http://141.98.210.70:8000/marriage-baby",
      {
        src: src,
      }
    );

    return response.data.result;
  } catch (error) {
    return "";
  }
}

async function getCaptchaSrc(page: Page): Promise<string> {
  const src = await page.evaluate(() => {
    return document?.querySelector("#ctl00_ContentPlaceHolder1_ImgCaptcha").src;
  });
  const response = await sendCaptchaToServer(src);
  return response;
}
