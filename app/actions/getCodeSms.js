import { createClient } from "@supabase/supabase-js";

export async function getCodeSms(phone) {
  let phoneNumber = "+98" + phone.substring(1);
  const supabase = createClient(
    "https://gyyahfiiuknbzsmeqxwa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eWFoZmlpdWtuYnpzbWVxeHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NzMwNzAsImV4cCI6MjAzNzE0OTA3MH0.Io1Yu-zALtggR6dVSxnmXfJzhS4ouQPksmuYKszW--E"
  );

  let { data, error } = await supabase
    .from("sms-forwarder")
    .select("created_at,smsdata")
    .like("smsdata", `%${phoneNumber}%`);

  if (data) {
    console.log("khodaaaa", findSixDigitCode(data[0].smsdata));
  }

  return data;
}

function findSixDigitCode(message) {
  let match = message.match(/:\s*(\d{6})/);

  if (match) {
    return match[0];
  } else {
    console.log("No 6-digit number found.");
    return "";
  }
}
