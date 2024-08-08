import axios from "axios";
import { writeLog } from "./writeLog";
import { solveCaptcha } from "./solveCaptcha";
export async function fillFormPage3(page, data) {
  try {
    // Fill out the form
    try {
      await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data?.city); // Rafsanjan
    } catch (error) {
      console.log("Error selecting city:", error);
    } // Rafsanjan
    // await page.select("#ctl00_ContentPlaceHolder1_ddlBankName", "56"); // Bank Saman

    try {
      await page.type("#ctl00_ContentPlaceHolder1_tbTel", data?.phoneStatic);
    } catch (error) {
      console.log("Error typing phone:", error);
    }

    
    try {
      await page.type("#ctl00_ContentPlaceHolder1_tbZipCD", data?.zipCode);
    } catch (error) {
      console.log("Error typing zip code:", error);
    }
    try {
      await page.type("#ctl00_ContentPlaceHolder1_tbAddress", data?.address);
    } catch (error) {
      console.log("Error typing address:", error);
    }
    if (data?.gender) {
      try {
        await page.select("#ctl00_ContentPlaceHolder1_ddlCity", data?.sarbazi);
      } catch (error) {
        console.log("Error selecting sarbazi:", error);
      }
    }

    if (data?.hasIsar === 1) {
      try {
        await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar1");
      } catch (error) {
        console.log("Error clicking Isar1:", error);
      }
    } else {
      try {
        await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar0");
      } catch (error) {
        console.log("Error clicking Isar0:", error);
      }
    }
    let captchaInput;
    try {
       captchaInput = await page.waitForSelector(
        "#ctl00_ContentPlaceHolder1_tbCaptcha1"
      );
    } catch (error) {
      console.log("Error waiting for captcha input:", error);
    }
    
    try {
      let captcha = await solveCaptcha(
        page,
        "#ctl00_ContentPlaceHolder1_ImgCaptcha1"
      );
      await captchaInput?.type(`${captcha}`);
    } catch (error) {
      console.log("error", error);
    }

    // منتظر بمانید تا سلکت باکس قابل دسترسی باشد
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlBankName");

    try {
      await page.select("#ctl00_ContentPlaceHolder1_ddlBankName", data?.idbank);
    } catch (error) {
      console.log(
        `Option with value ${data?.idbank} not found. No action taken.`
      );
    }

    // // Submit the form
    // await page.click("#ctl00_ContentPlaceHolder1_btnSave");

    // await page.click("#ctl00_ContentPlaceHolder1_rbtnIsar0");
  } catch (error) {
    writeLog(data.phoneNumber, error);
    return;
  }
}
