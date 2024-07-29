import { setTitle } from "./setTitle";
import { fillFormPage2 } from "./fillFormPage2";
import { AudioAlert } from "./app/alert";
import { saveContentHtml } from "./saveContentHtml";
import { fillFormPage3 } from "./fillFormPage3";
export async function handleSecondPage(
  dialog,
  page,
  data,
  timesRunFillPage2,
  browser
) {
  await dialog.accept();
  await setTitle(page, data);
  let page3 = await fillFormPage2(page, data, timesRunFillPage2, browser);
  if (page3) {
    let alert = new AudioAlert();
    await alert.send();
    await saveContentHtml(page, data);
    await fillFormPage3();
  }
}
