"use server";

import { fillFormPage1 } from "./fillFormPage1.js";
import { initRobot } from "./initRobot";
import { writeLog } from "./writeLog";
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
