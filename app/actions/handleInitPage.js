import { fillFormPage1 } from "./fillFormPage1.js";
export async function handleInitPage(dialog, page, data) {
  await dialog.accept();
  await fillFormPage1(page, data);
}
