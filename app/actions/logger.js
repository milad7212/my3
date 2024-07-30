import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

// تعریف فرمت دلخواه برای لاگ‌ها
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// ایجاد لاگر
const logger = createLogger({
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
    new transports.File({ filename: "app.log" }), // ذخیره لاگ‌ها در فایل
  ],
});

export default logger;
