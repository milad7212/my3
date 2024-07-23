import puppeteer from "puppeteer";
// state
// load page
// unload page
// capthca page :(
export async function initRobot() {
  const width = 1024;
  const height = 1000;

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: width, height: height });
  await page.deleteCookie(...(await page.cookies()));

  await page.goto("https://ve.cbi.ir/TasRequest.aspx", {
    waitUntil: "networkidle2",
    timeout: 70000,
  });
  let loadedInitPage, loadedFormPage, captchaPage;

  loadedInitPage = await page.waitForSelector("body");

  if (loadedInitPage) {
    loadedFormPage = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_tbIDNo"
    );
    if (!loadedFormPage) {
      captchaPage = page.$("#ans");
    }
  }
  if (captchaPage) {
    page.close();
  }
  if (!loadedInitPage) {
    page.close();
  }

  return page;
}