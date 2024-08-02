import { createClient } from "@supabase/supabase-js";
import createCustomLogger from "./logger";
import { difTime } from "./difTime";

export async function getCodeSms(phone) {
  const logger = createCustomLogger(`${phone}.log`);
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

  if (error) {
    logger.error(`error in code api :::::: ${error}`);
    return { smsCode: null, isValid: false };
  }
  if (!data || data.length === 0) {
    logger.info("No data found for the given phone number.");
    return { smsCode: null, isValid: false };
  }

  let smsCode = await findSixDigitCode(data[0].smsdata);

  logger.info(`get sms code ::::::  ${smsCode}`);
  let isValid = difTime(data[0].created_at);

  return { smsCode, isValid };
}

async function findSixDigitCode(message) {
  try {
    let match = await message.match(/ج :\s*(\d{6})/);

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
