export async function setTitle(page, data) {
  await page.evaluate((data) => {
    let newTitle = ` ${data.name} | ${data.phoneNumber}`;
    document.title = newTitle;
  }, data);
  return;
}
