import { writeFileSync } from "fs";
import { getDateTimeString } from "./getDateTimeString";
export async function saveContentHtml(page, data) {
  // کل محتوای HTML صفحه را بگیرید
  const html = await page.content();
  // نام فایل بر اساس تاریخ و ساعت جاری
  const fileName = `doc/page_${data.codeMeli}_${getDateTimeString()}.html`;

  // محتوای HTML را در یک فایل ذخیره کنید
  writeFileSync(fileName, html);
}
