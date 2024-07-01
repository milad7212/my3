import axios from "axios";

// Define variables
const token = "bot280070:ee9be28d-6b67-44b6-a37d-d0b57a1ef7a6";

// Function to send message via Telegram API
export async function sendMessageEita(data) {
  try {
    // Send POST request using axios
    const response = await axios.get(
      `https://eitaayar.ir/api/${token}/sendMessage`,
      {
        params: {
          text: `#وام_ازدواج

          ${data.mes}

          موبایل: ${data.mobile}
          استان : #${data.ostan}
          شهر   : #${data.city}
          تاریخ  : #${Date.now()}
          
          #1
          #${data.phoneNumber}`,
          chat_id: 9871006,
        },
      }
    );

    // console.log(response.data); // Output the response data
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}
