import axios from "axios";
import { writeLog } from "./writeLog";

export async function fillFormPage3(page, data) {
  try {
    // Fill out the form
    await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city); // Rafsanjan
    // await page.select("#ctl00_ContentPlaceHolder1_ddlBankName", "56"); // Bank Saman

    await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);

    await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
    await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
    if (data.gender) {
      await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.sarbazi);
    }

    if (data.hasIsar === 1) {
      await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar1");
    } else {
      await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar0");
    }

    // منتظر بمانید تا سلکت باکس قابل دسترسی باشد
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlBankName");

    // دریافت تمامی گزینه‌های سلکت باکس
    const options = await page.evaluate(() => {
      const selectElement = document.querySelector(
        "#ctl00_ContentPlaceHolder1_ddlBankName"
      );
      const optionsArray = [];
      for (let i = 0; i < selectElement.options.length; i++) {
        optionsArray.push({
          value: selectElement.options[i].value,
          text: selectElement.options[i].text,
        });
      }
      return optionsArray;
    });

    writeLog(data.phoneNumber, `${options}`);

    const captchaInput = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_ddlSarbasiST"
    );

    let captcha = await getCaptchaSrc(page);
    await captchaInput?.type(`${captcha}`);

    // // Submit the form
    // await page.click("#ctl00_ContentPlaceHolder1_btnSave");

    // await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar0");
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
