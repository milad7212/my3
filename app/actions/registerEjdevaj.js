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
import { setTitle } from "./setTitle";
import { handleInitPage } from "./handleInitPage";
import { handleSecondPage } from "./handleSecondPage";

export async function registerEjdevaj(data) {
  let timesRunFillPage2 = 0;
  let status = "init";
  let { page, browser } = await initRobot();
  if (!page) {
    console.log("Failed to initialize robot. Exiting...");
    return;
  }
  await setTitle(page, data);
  await fillFormPage1(page, data);

  page.on("dialog", async (dialog) => {
    writeLog(data.phoneNumber, dialog.message());
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (status == "secondPage") {
      await handleSecondPage(dialog, page, data, timesRunFillPage2, browser);
      timesRunFillPage2++;
    }
    if (status == "init") {
      if (dialog.message().includes("6")) {
        status = "secondPage";
        await handleSecondPage(dialog, page, data, timesRunFillPage2, browser);
        timesRunFillPage2++;
      } else {
        await handleInitPage(dialog, page, data);
      }
    }
  });
}
