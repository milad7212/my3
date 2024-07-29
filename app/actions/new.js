"use server";
import { createMachine, interpret } from "xstate";
import { initRobot } from "./initRobot";
import { setTitle } from "./setTitle";
import { fillFormPage1 } from "./fillFormPage1";
import { handleInitPage } from "./handleInitPage";
import { handleSecondPage } from "./handleSecondPage";
import { writeLog } from "./writeLog";

const registrationMachine = createMachine(
  {
    id: "registration",
    initial: "init",
    context: {
      data: null,
      page: null,
      browser: null,
      timesRunFillPage2: 0,
    },
    states: {
      init: {
        invoke: {
          src: async (context, event) => {
            const { page, browser } = await initRobot();
            if (!page) throw new Error("Failed to initialize robot.");
            return { page, browser };
          },
          onDone: {
            target: "setTitle",
            actions: ["assignPageAndBrowser"],
          },
          onError: {
            target: "failure",
            actions: ["logError"],
          },
        },
      },
      setTitle: {
        invoke: {
          src: async (context, event) => {
            await setTitle(context.page, context.data);
          },
          onDone: "fillFormPage1",
          onError: {
            target: "failure",
            actions: ["logError"],
          },
        },
      },
      fillFormPage1: {
        invoke: {
          src: async (context, event) => {
            await fillFormPage1(context.page, context.data);
          },
          onDone: "waitingForDialog",
          onError: {
            target: "failure",
            actions: ["logError"],
          },
        },
      },
      waitingForDialog: {
        on: {
          DIALOG_RECEIVED: [
            {
              guard: (context, event) => event.message.includes("6"),
              target: "handleSecondPage",
            },
            {
              target: "handleInitPage",
            },
          ],
        },
      },
      handleInitPage: {
        invoke: {
          src: async (context, event) => {
            await handleInitPage(event.dialog, context.page, context.data);
          },
          onDone: "waitingForDialog",
          onError: {
            target: "failure",
            actions: ["logError"],
          },
        },
      },
      handleSecondPage: {
        invoke: {
          src: async (context, event) => {
            await handleSecondPage(
              event.dialog,
              context.page,
              context.data,
              context.timesRunFillPage2,
              context.browser
            );
            context.timesRunFillPage2++;
          },
          onDone: "waitingForDialog",
          onError: {
            target: "failure",
            actions: ["logError"],
          },
        },
      },
      failure: {
        type: "final",
      },
      success: {
        type: "final",
      },
    },
  },
  {
    actions: {
      assignPageAndBrowser: (context, event) => {
        context.page = event.data.page;
        context.browser = event.data.browser;
      },
      logError: (context, event) => {
        writeLog(context.data.phoneNumber, event.data);
      },
    },
  }
);

export async function registerEjdevaj(data) {
  const service = interpret(registrationMachine.withContext({ data }))
    .onTransition((state) => {
      console.log(state.value);
    })
    .start();

  service.send({ type: "START" });

  page.on("dialog", async (dialog) => {
    writeLog(data.phoneNumber, dialog.message());
    await new Promise((resolve) => setTimeout(resolve, 2000));

    service.send({
      type: "DIALOG_RECEIVED",
      dialog,
      message: dialog.message(),
    });
  });
}
