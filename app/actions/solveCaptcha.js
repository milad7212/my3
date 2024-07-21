import axios from "axios";
export async function solveCaptcha(page, id) {
  

  const src = await page.evaluate(() => {
    return document?.querySelector(`${id}`).src;
  });

  try {
    const response = await axios.post(
      "http://146.19.212.232:8000/marriage-baby",
      {
        src: src,
      }
    );

    return response.data.result;
  } catch (error) {
    console.log("error captcha", error);
    return "";
  }
}
