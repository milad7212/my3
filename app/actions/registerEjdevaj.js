"use server";
import { AudioAlert } from "./app/alert";
import { fillFormPage1 } from "./fillFormPage1.js";
import { fillFormPage2 } from "./fillFormPage2";
import { saveContentHtml } from "./saveContentHtml";
import { initRobot } from "./initRobot";

export async function registerEjdevag(data) {
  let page = await initRobot();
  await register(page, data);
}

async function register(page, data) {
  page.on("dialog", async (dialog) => {
    let alert;
    if (dialog.message().includes("6")) {
      await dialog.accept();
      alert = new AudioAlert();
      await alert.send();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await saveContentHtml(page, data);
      await fillFormPage2(page, data);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await dialog.accept();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fillFormPage1(page, data);
    }
  });
  await fillFormPage1(page, data);
}

// await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
// await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
// await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
// await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
