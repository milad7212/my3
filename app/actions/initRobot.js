import puppeteer from "puppeteer";

const VIEWPORT = { width: 1024, height: 1000 };
const URL = "https://ve.cbi.ir/TasRequest.aspx";
const TIMEOUTS = {
  networkIdle: 70000,
  formSelector: 10000,
  captchaWait: 8000,
};

async function launchBrowser(headless) {
  return puppeteer.launch({
    headless: headless,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    ],
  });
}

async function setupPage(browser) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.deleteCookie(...(await page.cookies()));
  return page;
}

async function navigateToPage(page, url) {
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: TIMEOUTS.networkIdle,
  });

  const loadedInitPage = await page.waitForSelector("body");
  if (!loadedInitPage) {
    throw new Error("Failed to load initial page");
  }

  const loadedFormPage = await page.waitForSelector(
    "#ctl00_ContentPlaceHolder1_tbIDNo",
    {
      timeout: TIMEOUTS.formSelector,
    }
  );

  if (!loadedFormPage) {
    const captchaPage = await page.$("#ans");
    if (captchaPage) {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.captchaWait));
      // throw new Error("Captcha page detected");
    }
  }
}

export async function initRobot(headless) {
  const browser = await launchBrowser(headless);

  try {
    const page = await setupPage(browser);
    await navigateToPage(page, URL);
    return { page, browser };
  } catch (error) {
    console.error("Error in initRobot:::::::::::::", error.message);

    // await browser.close();
    return null;
  }
}
