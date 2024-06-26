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

  // تابعی برای گرفتن اسکرین‌شات
  async function takeScreenshot(page: Page, message: any): Promise<void> {
    // اضافه کردن دیالوگ شبیه‌سازی شده به صفحه// اضافه کردن دیالوگ شبیه‌سازی شده به صفحه
    await page.evaluate((message) => {
      let dialogDiv = document.createElement("div");
      dialogDiv.id = "custom-dialog";
      dialogDiv.style.position = "fixed";
      dialogDiv.style.top = "50%";
      dialogDiv.style.left = "50%";
      dialogDiv.style.transform = "translate(-50%, -50%)";
      dialogDiv.style.backgroundColor = "white";
      dialogDiv.style.border = "1px solid black";
      dialogDiv.style.padding = "10px";
      dialogDiv.style.zIndex = "10000";
      dialogDiv.innerHTML = `<p>${message}</p>`;
      document.body.appendChild(dialogDiv);
    }, message);

    const date = new Date();
    const dateString = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    const timeString = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    const fileName = `screenshot-${dateString}-${timeString}.png`;
    await page.screenshot({ path: fileName });
    // حذف دیالوگ شبیه‌سازی شده از صفحه
    await page.evaluate(() => {
      let dialogDiv = document.getElementById("custom-dialog");
      if (dialogDiv) {
        dialogDiv.remove();
      }
    });
  }

  // تابعی برای تلاش به بارگذاری صفحه تا 3 بار
  async function tryLoadPage(page: Page, url: string): Promise<boolean> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await page.goto(url, {
          waitUntil: "networkidle2",
          timeout: 30000,
        });
        return true; // بارگذاری موفقیت‌آمیز
      } catch (error) {
        // console.log(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt === 3) {
          return false; // بعد از سه بار تلاش شکست خورد
        }
      }
    }
    return false;
  }

  // تابع اصلی برای ثبت ازدواج
  async function register(): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${width},${height}`],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: width, height: height });
    // جایگزینی تابع alert
    await page.evaluate(() => {
      window.alert = (message) => {
        let event = new CustomEvent("alert", { detail: message });
        window.dispatchEvent(event);
      };
    });

    // مدیریت دیالوگ‌ها و گرفتن اسکرین‌شات
    page.on("dialog", async (dialog) => {
      // await takeScreenshot(page, dialog.message());

      await Promise.all([
        await continueButton?.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);

      await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
      await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
      await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
      await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);

      await dialog.accept();

      await dialog.accept();
      if (dialog.message().includes("چند")) {
        await dialog.accept();
        setTimeout(async () => {
          await dialog.accept();
          await page.click("#ctl00_ContentPlaceHolder1_btnSubmit"); // کلیک دوباره روی دکمه "اوکی"
        }, 60000);
      } else {
        await dialog.accept();
      }
    });

    const pageLoaded = await tryLoadPage(
      page,
      "https://ve.cbi.ir/TasRequest.aspx"
    );
    if (!pageLoaded) {
      // console.log("Failed to load page after 3 attempts, closing browser");
      await browser.close();
      return;
    }

    // پر کردن فرم
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
    // محمد دمت گرممممممممممممممممممممممممممم :)
    // ارسال کپچا به سرور
    let captcha = await getCaptchaSrc(page);
    await captchaInput?.type(`${captcha}`);

    await Promise.all([
      await page.click("#ctl00_ContentPlaceHolder1_btnContinue1"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
    await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
    await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
    await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);

    // await browser.close();
  }

  // اجرای تابع ثبت نام هر 1 دقیقه (60000 میلی‌ثانیه)
  // setInterval(register, 60000);

  // اولین اجرا به محض شروع برنامه
  await register();
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
    console.log("Server response:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error sending image to server:", error);
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
