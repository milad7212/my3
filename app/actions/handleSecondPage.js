import { setTitle } from "./setTitle";
import { fillFormPage2 } from "./fillFormPage2";

export async function handleSecondPage(
  dialog,
  page,
  data,
  timesRunFillPage2,
  browser
) {
  await dialog.accept();
  await setTitle(page, data);
  return await fillFormPage2(page, data, timesRunFillPage2, browser);
}
