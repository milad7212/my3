import puppeteer from "puppeteer";

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
  await page.waitForSelector("body");

  return page;
}
