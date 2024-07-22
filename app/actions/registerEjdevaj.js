"use server";
import { AudioAlert } from "./app/alert";
import { fillFormPage1 } from "./fillFormPage1.js";
import { fillFormPage2 } from "./fillFormPage2";
import { saveContentHtml } from "./saveContentHtml";
import { initRobot } from "./initRobot";
import { wait } from "./wait";

export async function registerEjdevag(data) {
  let status = "init";
  let page = await initRobot();
  await fillFormPage1(page, data);

  page.on("dialog", async (dialog) => {
    let alert;
    if (dialog.message().includes("6")) {
      status = "secondPage";
      await dialog.accept();
      alert = new AudioAlert();
      await alert.send();

      // await wait();

      await saveContentHtml(page, data);
      await fillFormPage2(page, data);
    }
    if (status == "init") {
      // await wait();
      await dialog.accept();
      // await wait();
      await fillFormPage1(page, data);
    }
    if (status == "secondPage") {
      await wait();
      await dialog.accept();
      await fillFormPage2(page, data);
    }
  });
}

// await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
// await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
// await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
// await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
