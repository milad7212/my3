import { writeLog } from "./writeLog";
import { getCodeSms } from "./getCodeSms";

import { solveCaptcha } from "./solveCaptcha";

import createCustomLogger from "./logger";

export async function fillFormPage2(page, data, timesRunFillPage2, browser) {
  const logger = createCustomLogger(`${data.phoneNumber}.log`);
  if (timesRunFillPage2 == 32) {
    logger.info("Close Robot  :) ");
    await browser.close();

    return;
  }
  let verificationCode;
  if (timesRunFillPage2 == 0) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
  }

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
    try {
      let captcha = await solveCaptcha(
        page,
        "#ctl00_ContentPlaceHolder1_ImgCaptcha"
      );
      await captchaInput?.type(`${captcha}`);
    } catch (error) {
      await captchaInput?.type("00");
      writeLog(data.phoneNumber, error);
    }

    if (timesRunFillPage2 <= 3) {
      verificationCode = await getCodeSms(data.phoneNumber);
      console.log("verificationCode", verificationCode);

      if (verificationCode) {
        await page.$eval(
          "#ctl00_ContentPlaceHolder1_tbMobileConfCode",
          (input) => (input.value = "")
        );

        await page.type(
          "#ctl00_ContentPlaceHolder1_tbMobileConfCode",
          verificationCode
        );
      }
    }

    await page.click("#ctl00_ContentPlaceHolder1_btnContinue1");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // بررسی کنید که آیا عنصر input وجود دارد یا نه
    const inputExists = await page.$("ctl00_ContentPlaceHolder1_ddlCity");

    if (inputExists) {
      logger.info("GO TO page 3 :) ");

      return true;
    } else {
      return false;
    }
  } catch (error) {
    writeLog(data.phoneNumber, error);
    return false;
  }
}
