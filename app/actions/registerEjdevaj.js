"use server";
import { fillFormPage1 } from "./fillFormPage1.js";
import { initRobot } from "./initRobot";
import { writeLog } from "./writeLog";
import { handleInitPage } from "./handleInitPage";
import { handleSecondPage } from "./handleSecondPage";
import logger from "./logger.js";
import { AudioAlert } from "./app/alert";
import { saveContentHtml } from "./saveContentHtml";
import { fillFormPage3 } from "./fillFormPage3";

const PAGE_STATUS = {
  INIT: "init",
  SECOND_PAGE: "secondPage",
  THIRD_PAGE: "thirdPage",
};

export async function registerEjdevaj(data) {
  try {
    logger.info("Starting robot :)");

    let timesFormPage2Filled = 0;
    let currentPageStatus = PAGE_STATUS.INIT;
    let successFillPage2;

    let { page, browser } = await initRobot();
    if (!page) {
      console.log("Failed to initialize robot. Exiting...");
      return;
    }
    logger.info("Page launched :)");

    await fillFormPage1(page, data);
    logger.info("Filled form page 1 :) ");

    page.on("dialog", async (dialog) => {
      writeLog(data.phoneNumber, dialog.message());

      if (currentPageStatus === PAGE_STATUS.SECOND_PAGE) {
        successFillPage2 = await handleSecondPage(
          dialog,
          page,
          data,
          timesFormPage2Filled,
          browser
        );
        timesFormPage2Filled++;
      }
      if (currentPageStatus === PAGE_STATUS.INIT) {
        if (dialog.message().includes("6")) {
          currentPageStatus = PAGE_STATUS.SECOND_PAGE;
          successFillPage2 = await handleSecondPage(
            dialog,
            page,
            data,
            timesFormPage2Filled,
            browser
          );
          timesFormPage2Filled++;
        } else {
          await handleInitPage(dialog, page, data);
        }
      }

      if (successFillPage2) {
        currentPageStatus = PAGE_STATUS.THIRD_PAGE;
        let alert = new AudioAlert();
        await alert.send();
        await saveContentHtml(page, data);
        await fillFormPage3(page, data);
      }
    });
  } catch (error) {
    logger.error(`Error in registerEjdevaj:::::::::::::::: ${error}`);
  }
}
