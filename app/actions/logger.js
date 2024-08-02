// logger.js
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

// تعریف فرمت دلخواه برای لاگ‌ها
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// تابع برای ایجاد لاگر با نام فایل دلخواه
const createCustomLogger = (filename) => {
  // ساخت مسیر فایل در پوشه doc
  const filePath = `doc/log/${filename}`;
  return createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console({
        format: combine(
          colorize(), // اضافه کردن رنگ به لاگ‌ها در کنسول
          timestamp(),
          myFormat
        ),
      }), // نمایش لاگ‌ها در کنسول
      new transports.File({ filename: filePath }), // ذخیره لاگ‌ها در فایل با نام دلخواه
    ],
  });
};

export default createCustomLogger;
