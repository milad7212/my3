const fs = require("fs");
const logFilePath = "doc/log/";
export function writeLog(nationalCode, message) {
  let fileAddress = `${logFilePath}${nationalCode}.txt`;
  // بررسی وجود فایل و ایجاد آن در صورت عدم وجود
  if (!fs.existsSync(fileAddress)) {
    fs.writeFileSync(fileAddress, "Log file created\n", "utf8");
  }

  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp}   : ${message}\n`;

  fs.appendFileSync(fileAddress, logEntry, "utf8");
}
