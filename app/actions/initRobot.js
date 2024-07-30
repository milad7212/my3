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
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--window-size=${width},${height}`,
    ],
  });
  try {
    const page = await browser.newPage();

    await page.setViewport({ width: width, height: height });
    await page.deleteCookie(...(await page.cookies()));
    await page.goto("https://ve.cbi.ir/TasRequest.aspx", {
      waitUntil: "networkidle2",
      timeout: 70000,
    });

    const loadedInitPage = await page.waitForSelector("body");
    if (!loadedInitPage) {
      throw new Error("Failed to load initial page");
    }
    const loadedFormPage = await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_tbIDNo",
      { timeout: 10000 }
    );
    if (!loadedFormPage) {
      const captchaPage = await page.$("#ans");
      if (captchaPage) {
        await new Promise((resolve) => setTimeout(resolve, 8000));
        throw new Error("Captcha page detected");
      }
    }

    return { page, browser };
  } catch (error) {
    console.log("Error in initRobot:", error.message);
    await browser.close();
    return null;
  }
}
