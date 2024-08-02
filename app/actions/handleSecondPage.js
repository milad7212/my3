import { setTitle } from "./setTitle";
import { fillFormPage2 } from "./fillFormPage2";

export async function handleSecondPage(
  page,
  data,
  timesRunFillPage2,
  browser,
  dataSmsCode
) {
  await setTitle(page, data);
  return await fillFormPage2(
    page,
    data,
    timesRunFillPage2,
    browser,
    dataSmsCode
  );
}
