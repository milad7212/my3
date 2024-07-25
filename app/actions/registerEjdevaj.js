"use server";
import { AudioAlert } from "./app/alert";
import { fillFormPage1 } from "./fillFormPage1.js";
import { fillFormPage2 } from "./fillFormPage2";
import { saveContentHtml } from "./saveContentHtml";
import { initRobot } from "./initRobot";
import { wait } from "./wait";
import { getCodeSms } from "./getCodeSms";
import { writeLog } from "./writeLog";

export async function registerEjdevag(data) {
  // let milad = await getCodeSms(data.phoneNumber);

  // return;
  let timesRunFillPage2 = 0;
  let status = "init";
  let { page, browser } = await initRobot();
  if (!page) {
    console.log("Failed to initialize robot. Exiting...");
    return; // Stop execution if initRobot failed
  }
  await fillFormPage1(page, data);

  page.on("dialog", async (dialog) => {
    writeLog(data.phoneNumber, dialog.message());
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (status == "secondPage") {
      await dialog.accept();
      await fillFormPage2(page, data, timesRunFillPage2, browser);
      timesRunFillPage2++;
    }
    if (status == "init") {
      if (dialog.message().includes("6")) {
        status = "secondPage";
        await dialog.accept();
        // let alert = new AudioAlert();
        // await alert.send();

        // await wait();

        // await saveContentHtml(page, data);
        await fillFormPage2(page, data, timesRunFillPage2);
        timesRunFillPage2++;
      } else {
        // await wait();
        await dialog.accept();
        // await wait();
        await fillFormPage1(page, data);
      }
    }
  });
}

// await page.type("#ctl00_ContentPlaceHolder1_tbTel", data.phoneStatic);
// await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data.zipCode);
// await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data.address);
// await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data.city);
