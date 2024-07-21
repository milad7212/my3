// تابعی برای دریافت تاریخ و ساعت جاری به صورت رشته
export function getDateTimeString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // ماه‌ها از 0 شروع می‌شوند
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // رشته تاریخ و ساعت
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}
