import { solveCaptcha } from "./solveCaptcha";
import { setTitle } from "./setTitle";

export async function fillFormPage1(page, data) {
  await setTitle(page, data);
  await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbIDNo");
  await page.type("#ctl00_ContentPlaceHolder1_tbIDNo", data.codeMeli);
  await page.select("#ctl00_ContentPlaceHolder1_ddlBrDay", data.dayTavalod);
  await page.type("#ctl00_ContentPlaceHolder1_tbBrYear", data.yearTavalod);
  await page.select("#ctl00_ContentPlaceHolder1_ddlBrMonth", data.monthTavalod);
  await page.type("#ctl00_ContentPlaceHolder1_tbMobileNo", data.phoneNumber);

  const captchaInput = await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_tbCaptcha"
  );

  let captcha = await solveCaptcha(
    page,
    "#ctl00_ContentPlaceHolder1_ImgCaptcha"
  );

  await captchaInput?.type(`${captcha}`);

  await page.click("#ctl00_ContentPlaceHolder1_btnSendConfirmCode");
}
