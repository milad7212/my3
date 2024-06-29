"use server";

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
  const width = 1920; // عرض صفحه نمایش
  const height = 1080;
  let tryRegister = 0;

  // تابع اصلی برای ثبت ازدواج
  async function register(page: Page): Promise<void> {
    tryRegister++;

    // مدیریت دیالوگ‌ها
    page.on("dialog", async (dialog) => {
      console.log(`${tryRegister}  ::`, dialog.message());
      if (dialog.message().includes("6")) {
        await dialog.accept();
        await Promise.all([
          page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
        await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
        await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
        await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await dialog.accept();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await fillForm(page);
      }
    });
    await fillForm(page);
  }

  async function fillForm(page: Page): Promise<void> {
    const firstInput = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_tbIDNo"
    );
    // پر کردن فرم
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

    // صبر به مدت2  ثانیه بعد از کلیک
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // تابعی برای رفرش کردن صفحه هر 30 ثانیه
  async function refreshPage(page: Page): Promise<void> {
    setInterval(async () => {
      console.log("Refreshing page...");
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      await fillForm(page); // دوباره پر کردن فرم بعد از رفرش
    }, 30000);
  }

  // اولین اجرا به محض شروع برنامه
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${width},${height}`],
  });
  const page = await browser.newPage();
  // تغییر User Agent
  // await page.setUserAgent(
  //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  // );

  await page.setViewport({ width: width, height: height });
  // پاک کردن کوکی‌ها
  await page.deleteCookie(...(await page.cookies()));

  while (true) {
    try {
      await page.goto("https://ve.cbi.ir/TasRequest.aspx", {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      await page.waitForSelector("body");
      break;
    } catch (error) {
      console.error("Failed to load page, refreshing in 30 seconds:", error);
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  }

  await register(page);
  await refreshPage(page);
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
