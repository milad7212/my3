import { sendMessage } from "@/utils/sendKavehNegar";
import { sendMessageEita } from "@/utils/sendMessageEita";
import puppeteer from "puppeteer";
import path from "path";
class Alert {
  constructor(data) {
    this.data = data;
  }

  async send() {
    try {
      await this.sendMessage();
    } catch (error) {
      console.log("Error sending alert :", error);
      this.handleError(error);
    }
  }

  sendMessage() {
    throw new Error("Method not implemented");
  }

  handleError(error) {
    console.log(`Handling error in ${this.constructor.name}:`, error.message);
  }
}

class SMSAlert extends Alert {
  constructor(data) {
    super(data);
  }

  async sendMessage() {
    const { phoneNumber, message } = this.data;
    await sendMessage(message, phoneNumber);
  }
}

class EitaAlert extends Alert {
  constructor(data) {
    super(data);
  }

  async sendMessage() {
    const { phoneNumber, message, ostan, city } = this.data;
    const dataForSendEita = {
      mes: message,
      ostan: ostan,
      city: city,
      mobile: phoneNumber,
    };
    await sendMessageEita(dataForSendEita);
  }
}

class AudioAlert extends Alert {
  constructor(data) {
    super(data);
  }

  // پیاده‌سازی متد sendMessage برای پخش آهنگ
  async sendMessage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Relative path to the HTML file
    const fileURI = `file://${path.join(
      process.cwd(),
      "app",
      "actions",
      "playAudio.html"
    )}`;

    await page.goto(fileURI);
    // منتظر بمانید تا صفحه کاملاً بارگذاری شود
    await page.waitForSelector("audio");

    // کلیک بر روی المان پخش موسیقی
    await page.click("audio");

    console.log("Clicked on the audio element.");

    // منتظر بمانید تا موسیقی پخش شود (مثلاً 10 ثانیه)
    await page.waitForTimeout(10000); // یک مثال: 10 ثانیه منتظر بماند
  }
}

export { Alert, SMSAlert, EitaAlert, AudioAlert };
