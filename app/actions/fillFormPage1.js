import axios from "axios";

export async function fillFormPage1(page, data) {
  await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbIDNo");
  await page.type("#ctl00_ContentPlaceHolder1_tbIDNo", data.codeMeli);

  await page.type("#ctl00_ContentPlaceHolder1_ddlBrDay", `${data.dayTavalod}`);
  await page.select("#ctl00_ContentPlaceHolder1_ddlBrMonth", data.monthTavalod);
  await page.type("#ctl00_ContentPlaceHolder1_tbBrYear", data.yearTavalod);

  await page.type("#ctl00_ContentPlaceHolder1_tbMobileNo", data.phoneNumber);

  const captchaInput = await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_tbCaptcha"
  );

  let captcha = await getCaptchaSrc(page);

  await captchaInput?.type(`${captcha}`);

  await page.click("#ctl00_ContentPlaceHolder1_btnSendConfirmCode");
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
