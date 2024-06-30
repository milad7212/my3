import axios from "axios";

// Define variables
const token = "bot280070:ee9be28d-6b67-44b6-a37d-d0b57a1ef7a6";

// Function to send message via Telegram API
export async function sendMessageEita() {
  try {
    // Send POST request using axios
    const response = await axios.get(
      `https://eitaayar.ir/api/${token}/sendMessage`,
      {
        params: {
          text: `#وام_ازدواج

          موبایل: 09139939426
          استان : #شیراز
          شهر   : #لامرد
          تاریخ  : #1402_03_04
          ساعت : 11:04 

          بانک : ملت - رسالت- توسعه تعاون
          ارسال کد 6 رقمی

          #1
          #09139939426
          `,
          date: 0,
          parse_mode: "",
          viewCountForDelete: "",
          chat_id: 9871006,
        },
      }
    );

    console.log(response.data); // Output the response data
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}
