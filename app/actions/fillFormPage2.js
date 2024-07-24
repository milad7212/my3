import axios from "axios";
import { writeLog } from "./writeLog";
import { getCodeSms } from "./getCodeSms";

export async function fillFormPage2(page, data, timesRunFillPage2) {
  console.log(
    "timesRunFillPage2 **********************************************",
    timesRunFillPage2
  );
  try {
    await page.select(
      "#ctl00_ContentPlaceHolder1_ddlMarryDay",
      data.dayEjdevag
    );
    await page.select(
      "#ctl00_ContentPlaceHolder1_ddlMarryMonth",
      data.monthEjdevag
    );
    await page.type("#ctl00_ContentPlaceHolder1_tbMarrYear", data.yearEjdevag);

    await page.select("#ctl00_ContentPlaceHolder1_ddlState", data.ostan);

    const captchaInput = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_tbCaptcha"
    );

    let captcha = await getCaptchaSrc(page);
    await captchaInput?.type(`${captcha}`);
    if (timesRunFillPage2 < 3) {
      let verificationCode = await getCodeSms(data.phoneNumber);

      await page.type(
        "#ctl00_ContentPlaceHolder1_tbMobileConfCode",
        verificationCode
      );
    }

    await page.click("#ctl00_ContentPlaceHolder1_btnContinue1");
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    return;
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
    return document?.querySelector("#ctl00_ContentPlaceHolder1_ImgCaptcha").src;
  });
  return await sendCaptchaToServer(src);
}
