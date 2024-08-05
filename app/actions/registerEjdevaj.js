"use server";
import { fillFormPage1 } from "./fillFormPage1.js";
import { initRobot } from "./initRobot";
import { writeLog } from "./writeLog";
import { handleInitPage } from "./handleInitPage";
import { handleSecondPage } from "./handleSecondPage";
import createCustomLogger from "./logger";
import { AudioAlert } from "./app/alert";
import { saveContentHtml } from "./saveContentHtml";
import { fillFormPage3 } from "./fillFormPage3";
import { getCodeSms } from "./getCodeSms";

const PAGE_STATUS = {
  INIT: "init",
  SECOND_PAGE: "secondPage",
  THIRD_PAGE: "thirdPage",
};

export async function registerEjdevaj(data, headless) {
  const logger = createCustomLogger(`${data.phoneNumber}.log`);
  try {
    logger.info("Starting robot :)");
    let dataSmsCode = { smsCode: null, isValid: false };

    let timesFormPage2Filled = 0;
    let currentPageStatus = PAGE_STATUS.INIT;
    let successFillPage2;

    let { page, browser } = await initRobot(headless);
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
        if (!dataSmsCode.isValid) {
          let { smsCode, isValid } = await getCodeSms(data.phoneNumber);

          dataSmsCode = { smsCode, isValid };
        }
        await dialog.accept();
        successFillPage2 = await handleSecondPage(
          page,
          data,
          timesFormPage2Filled,
          browser,
          dataSmsCode
        );
        timesFormPage2Filled++;
      }
      if (currentPageStatus === PAGE_STATUS.INIT) {
        if (dialog.message().includes("6")) {
          logger.info("Go to page 2 :)");

          await dialog.accept();
          currentPageStatus = PAGE_STATUS.SECOND_PAGE;
          await new Promise((resolve) => setTimeout(resolve, 4000));
          let { smsCode, isValid } = await getCodeSms(data.phoneNumber);
          console.log("smsCode ::::::::::::::::::", smsCode);
          console.log("isValid ::::::::::::::::::", isValid);

          dataSmsCode = { smsCode, isValid };
          console.log("dataSmsCode", dataSmsCode);

          setTimeout(() => registerEjdevaj(data, headless), 900000);

          successFillPage2 = await handleSecondPage(
            page,
            data,
            timesFormPage2Filled,
            browser,
            dataSmsCode
          );
          timesFormPage2Filled++;
        } else {
          await handleInitPage(dialog, page, data);
        }
      }

      if (successFillPage2) {
        try {
          currentPageStatus = PAGE_STATUS.THIRD_PAGE;
          let alert = new AudioAlert();
          await alert.send();
          await saveContentHtml(page, data);
          await fillFormPage3(page, data);
        } catch (error) {
          logger.error(`Error in page3:::::::::::::::: ${error}`);
        }
      }
    });
  } catch (error) {
    logger.error(`Error in registerEjdevaj:::::::::::::::: ${error}`);
  }
}
