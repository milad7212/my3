// kavenegarApi.ts
import Kavenegar from "kavenegar";

const apiKey = process.env.KAVENEGAR_API_KEY as string;
const api = Kavenegar.KavenegarApi({
  apikey: apiKey,
});
console.log(`Kavenegar API Key: ${apiKey}`);

export const sendMessage = (
  message: string,

  receptor: string
) => {
  api.Send(
    {
      message,
      sender: 2000500666,
      receptor,
    },
    (response: any, status: any) => {
      console.log(response);
      console.log(status);
    }
  );
};
