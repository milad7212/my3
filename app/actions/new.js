"use server";
import { fillFormPage1 } from "./fillFormPage1.js";
import { initRobot } from "./initRobot";
import { writeLog } from "./writeLog";
import { handleInitPage } from "./handleInitPage";
import { handleSecondPage } from "./handleSecondPage";
import logger from "./logger.js";
import { createMachine, assign, createActor } from "xstate";

// تعریف ماشین حالت
const pageMachine = createMachine(
  {
    id: "page",
    initial: "init",
    context: {
      timesRunFillPage2: 0,
      data: null,
      dialogMessage: null,
      page: null,
      browser: null,
    },
    states: {
      init: {
        on: {
          CHECK_MESSAGE: [
            {
              guard: "isMessageContains6",
              target: "secondPage",
              actions: "incrementTimesRunFillPage2",
            },
            { target: "handleInit" },
          ],
        },
      },
      secondPage: {
        entry: "handleSecondPage",
        on: {
          CONTINUE: {
            target: "secondPage",
            actions: "incrementTimesRunFillPage2",
          },
        },
      },
      handleInit: {
        entry: "handleInitPage",
        on: {
          DONE: "init",
        },
      },
    },
  },
  {
    actions: {
      handleInitPage: ({ context }) => {
        const { page, data } = context;
        fillFormPage1(page, data);
      },
      handleSecondPage: ({ context }) => {
        const { dialogMessage, page, data, timesRunFillPage2, browser } =
          context;
        handleSecondPage(dialogMessage, page, data, timesRunFillPage2, browser);
      },
      incrementTimesRunFillPage2: assign({
        timesRunFillPage2: (context) => context.timesRunFillPage2 + 1,
      }),
    },
    guards: {
      isMessageContains6: ({ context }) =>
        context.dialogMessage && context.dialogMessage.includes("6"),
    },
  }
);

export async function registerEjdevaj(data) {
  logger.info("start robot :)");

  const robotResult = await initRobot();
  if (!robotResult || !robotResult.page) {
    console.log("Failed to initialize robot. Exiting...");
    return;
  }

  const { page, browser } = robotResult;
  logger.info("lunch page :)");

  // await fillFormPage1(page, data);
  logger.info("fill form page 1 :) ");

  const pageService = createActor(pageMachine, {
    input: {
      data,
      page,
      browser,
      timesRunFillPage2: 0,
    },
  }).start();

  page.on("dialog", async (dialog) => {
    const dialogMessage = dialog.message();
    writeLog(data.phoneNumber, dialogMessage);

    pageService.send({
      type: "CHECK_MESSAGE",
      input: { dialogMessage }, // ارسال پیام dialog
    });
  });
}
