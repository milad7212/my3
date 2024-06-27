import { Page } from "puppeteer";
// تابعی برای گرفتن اسکرین‌شات
export async function takeScreenshot(page: Page, message: any): Promise<void> {
  // اضافه کردن دیالوگ شبیه‌سازی شده به صفحه// اضافه کردن دیالوگ شبیه‌سازی شده به صفحه
  await page.evaluate((message) => {
    let dialogDiv = document.createElement("div");
    dialogDiv.id = "custom-dialog";
    dialogDiv.style.position = "fixed";
    dialogDiv.style.top = "50%";
    dialogDiv.style.left = "50%";
    dialogDiv.style.transform = "translate(-50%, -50%)";
    dialogDiv.style.backgroundColor = "white";
    dialogDiv.style.border = "1px solid black";
    dialogDiv.style.padding = "10px";
    dialogDiv.style.zIndex = "10000";
    dialogDiv.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(dialogDiv);
  }, message);

  const date = new Date();
  const dateString = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  const timeString = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  const fileName = `screenshot-${dateString}-${timeString}.png`;
  await page.screenshot({ path: fileName });
  // حذف دیالوگ شبیه‌سازی شده از صفحه
  await page.evaluate(() => {
    let dialogDiv = document.getElementById("custom-dialog");
    if (dialogDiv) {
      dialogDiv.remove();
    }
  });
}
