import { createClient } from "@supabase/supabase-js";

import createCustomLogger from "./logger";
export async function getCodeSms(phone) {
  const logger = createCustomLogger(`${data.phoneNumber}.log`);
  let phoneNumber = "+98" + phone.substring(1);

  const supabase = createClient(
    "https://gyyahfiiuknbzsmeqxwa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eWFoZmlpdWtuYnpzbWVxeHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NzMwNzAsImV4cCI6MjAzNzE0OTA3MH0.Io1Yu-zALtggR6dVSxnmXfJzhS4ouQPksmuYKszW--E"
  );

  let { data, error } = await supabase
    .from("sms-forwarder")
    .select("created_at,smsdata")
    .like("smsdata", `%${phoneNumber}%`)
    .order("created_at", { ascending: false })

    .limit(1);
  console.log("data of code", data);

  if (error) {
    logger.error(`error in code api :::::: ${error}`);
    return false;
  }

  let smsCode = await findSixDigitCode(data[0].smsdata);

  logger.info(`get sms code ::::::  ${smsCode}`);

  return smsCode;
}

async function findSixDigitCode(message) {
  try {
    let match = await message.match(/:\s*(\d{6})/);

    if (match) {
      return match[1];
    } else {
      console.log("No 6-digit number found.");
      return false;
    }
  } catch (error) {
    return false;
  }
}
