import axios from "axios";
export async function fillFormPage2(page, data) {
  await page.select("#ctl00_ContentPlaceHolder1_ddlMarryDay", data.dayEjdevag);
  await page.select(
    "#ctl00_ContentPlaceHolder1_ddlMarryMonth",
    data.monthEjdevag
  );
  await page.type("#ctl00_ContentPlaceHolder1_tbMarrYear", data.yearEjdevag);

  await page.select("#ctl00_ContentPlaceHolder1_ddlState", data.ostan);

  const captchaInput = await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_ImgCaptcha"
  );

  let captcha = await getCaptchaSrc(page);
  await captchaInput?.type(`${captcha}`);

  await page.click("#ctl00_ContentPlaceHolder1_btnContinue1");
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
    console.log("error captcha", error);
    return "";
  }
}

async function getCaptchaSrc(page) {
  const src = await page.evaluate(() => {
    return document?.querySelector("#ctl00_ContentPlaceHolder1_ImgCaptcha").src;
  });
  return await sendCaptchaToServer(src);
}