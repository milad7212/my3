import axios from "axios";
import { writeLog } from "./writeLog";
import { getCodeSms } from "./getCodeSms";
import { registerEjdevaj } from "./registerEjdevaj.js";

export async function fillFormPage3(page, data, timesRunFillPage2, browser) {
  try {
    // Fill out the form
    await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city); // Rafsanjan
    // await page.select("#ctl00_ContentPlaceHolder1_ddlBankName", "56"); // Bank Saman

    // await page.type("#ctl00_ContentPlaceHolder1_tbIDNo2", "1234567890"); // Example national ID for spouse
    await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
    // await page.type("#ctl00_ContentPlaceHolder1_tbEMail", "example@email.com");
    await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
    await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
    await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar0");

    const captchaInput = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_tbCaptcha1"
    );

    let captcha = await getCaptchaSrc(page);
    await captchaInput?.type(`${captcha}`);

    // // Submit the form
    // await page.click("#ctl00_ContentPlaceHolder1_btnSave");

    // Wait for navigation or confirmation
    await page.waitForNavigation();
  } catch (error) {
    writeLog(data.phoneNumber, error);
    return;
  }
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
    // console.log("error captcha", error);
    return "";
  }
}

async function getCaptchaSrc(page) {
  const src = await page.evaluate(() => {
    return document?.querySelector("#ctl00_ContentPlaceHolder1_ImgCaptcha1")
      .src;
  });
  return await sendCaptchaToServer(src);
}
