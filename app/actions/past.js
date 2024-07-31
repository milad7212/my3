"use server";
import { fillFormPage1 } from "./fillFormPage1.js";
import { initRobot } from "./initRobot";
import { writeLog } from "./writeLog";
import { handleInitPage } from "./handleInitPage";
import { handleSecondPage } from "./handleSecondPage";
import logger from "./logger.js";

export async function registerEjdevaj(data) {
  logger.info("start robot :)");

  let timesRunFillPage2 = 0;
  let status = "init";

  let { page, browser } = await initRobot();
  if (!page) {
    console.log("Failed to initialize robot. Exiting...");
    return;
  }
  logger.info("lunch page :)");

  await fillFormPage1(page, data);

  logger.info("fill  form page 1 :) ");

  page.on("dialog", async (dialog) => {
    writeLog(data.phoneNumber, dialog.message());

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
