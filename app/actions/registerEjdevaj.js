"use server";
import { AudioAlert } from "./app/alert";
import { fillFormPage1 } from "./fillFormPage1.js";
import { fillFormPage2 } from "./fillFormPage2";
import { fillFormPage3 } from "./fillFormPage3";
import { saveContentHtml } from "./saveContentHtml";
import { initRobot } from "./initRobot";
import { wait } from "./wait";
import { getCodeSms } from "./getCodeSms";
import { writeLog } from "./writeLog";

export async function registerEjdevaj(data) {
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
      let page3 = await fillFormPage2(page, data, timesRunFillPage2, browser);
      timesRunFillPage2++;
      if (page3) {
        let alert = new AudioAlert();
        await alert.send();

        await saveContentHtml(page, data);
        await fillFormPage3();
      }
    }
    if (status == "init") {
      if (dialog.message().includes("6")) {
        status = "secondPage";
        await dialog.accept();
        // let alert = new AudioAlert();
        // await alert.send();

        // await wait();

        // await saveContentHtml(page, data);
        let page3 = await fillFormPage2(page, data, timesRunFillPage2);
        timesRunFillPage2++;
        if (page3) {
          let alert = new AudioAlert();
          await alert.send();
          await saveContentHtml(page, data);
          await fillFormPage3();
        }
      } else {
        // await wait();
        await dialog.accept();
        // await wait();
        await fillFormPage1(page, data);
      }
    }
  });
}
