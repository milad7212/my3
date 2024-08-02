export function difTime(dateSms) {
  // تاریخ مشخص به صورت رشته
  const targetDateStr = dateSms;
  if (!targetDateStr) {
    return false;
  }

  // تبدیل تاریخ مشخص به شیء Date
  const targetDate = new Date(targetDateStr);

  // دریافت تاریخ و زمان سیستم
  const currentDate = new Date();

  // محاسبه تفاوت زمانی در میلی‌ثانیه
  const differenceInMilliseconds = Math.abs(currentDate - targetDate);

  // تبدیل تفاوت زمانی به دقیقه
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  // بررسی اینکه آیا تفاوت کمتر از دو دقیقه است
  const isLessThanTwoMinutes = differenceInMinutes < 2;

  // نمایش نتیجه
  return isLessThanTwoMinutes;
}
