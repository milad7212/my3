export async function fillFormPageTwo(page, data) {
  await page.select("#ctl00_ContentPlaceHolder1_ddlMarryDay", data.dayEjdevag);
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

  await page.click("#ctl00_ContentPlaceHolder1_btnContinue1");
}
