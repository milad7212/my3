
import { writeLog } from "./writeLog";
import { getCodeSms } from "./getCodeSms";
import { registerEjdevaj } from "./registerEjdevaj.js";
import { solveCaptcha } from "./solveCaptcha";
export async function fillFormPage2(page, data, timesRunFillPage2, browser) {
  if (timesRunFillPage2 == 32) {
    // await browser.close();
    setTimeout(() => {
      registerEjdevaj(data);
    }, 600000);
    return;
    // اجرای تابع بعد از 10 دقیقه
  }
  let verificationCode;
  if (timesRunFillPage2 == 0) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
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
    let captcha = await solveCaptcha(
      page,
      "#ctl00_ContentPlaceHolder1_ImgCaptcha"
    );
    await captchaInput?.type(`${captcha}`);

    console.log("---------------------//////---------", timesRunFillPage2);

    if (timesRunFillPage2 < 3) {
      await page.$eval(
        "#ctl00_ContentPlaceHolder1_tbMobileConfCode",
        (input) => (input.value = "")
      );
      verificationCode = await getCodeSms(data.phoneNumber);

      await page.type(
        "#ctl00_ContentPlaceHolder1_tbMobileConfCode",
        verificationCode
      );
    }

    await page.click("#ctl00_ContentPlaceHolder1_btnContinue1");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // بررسی کنید که آیا عنصر input وجود دارد یا نه
    const inputExists = await page.$("ctl00_ContentPlaceHolder1_ddlCity");

    if (inputExists) {
      console.log("عنصر input وجود دارد");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    writeLog(data.phoneNumber, error);
    return;
  }
}

