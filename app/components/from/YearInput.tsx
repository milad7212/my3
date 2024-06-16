import React from "react";
import Select from "react-select";

const optionYear = [
  { value: 1340, label: 1340 },
  { value: 1341, label: 1341 },
  { value: 1342, label: 1342 },
  { value: 1343, label: 1343 },
  { value: 1344, label: 1344 },
  { value: 1345, label: 1345 },
  { value: 1346, label: 1346 },
  { value: 1347, label: 1347 },
  { value: 1348, label: 1348 },
  { value: 1349, label: 1349 },
  { value: 1350, label: 1350 },
  { value: 1351, label: 1351 },
  { value: 1352, label: 1352 },
  { value: 1353, label: 1353 },
  { value: 1354, label: 1354 },
  { value: 1355, label: 1355 },
  { value: 1356, label: 1356 },
  { value: 1357, label: 1357 },
  { value: 1358, label: 1358 },
  { value: 1359, label: 1359 },
  { value: 1360, label: 1360 },
  { value: 1361, label: 1361 },
  { value: 1362, label: 1362 },
  { value: 1363, label: 1363 },
  { value: 1364, label: 1364 },
  { value: 1365, label: 1365 },
  { value: 1366, label: 1366 },
  { value: 1367, label: 1367 },
  { value: 1368, label: 1368 },
  { value: 1369, label: 1369 },
  { value: 1370, label: 1370 },
  { value: 1371, label: 1371 },
  { value: 1372, label: 1372 },
  { value: 1373, label: 1373 },
  { value: 1374, label: 1374 },
  { value: 1375, label: 1375 },
  { value: 1376, label: 1376 },
  { value: 1377, label: 1377 },
  { value: 1378, label: 1378 },
  { value: 1379, label: 1379 },
  { value: 1380, label: 1380 },
  { value: 1381, label: 1381 },
  { value: 1382, label: 1382 },
  { value: 1383, label: 1383 },
  { value: 1384, label: 1384 },
  { value: 1385, label: 1385 },
  { value: 1386, label: 1386 },
  { value: 1387, label: 1387 },
  { value: 1388, label: 1388 },
  { value: 1389, label: 1389 },
  { value: 1390, label: 1390 },
  { value: 1391, label: 1391 },
  { value: 1392, label: 1392 },
  { value: 1393, label: 1393 },
  { value: 1394, label: 1394 },
  { value: 1395, label: 1395 },
  { value: 1396, label: 1396 },
  { value: 1397, label: 1397 },
  { value: 1398, label: 1398 },
  { value: 1399, label: 1399 },
  { value: 1400, label: 1400 },
  { value: 1401, label: 1401 },
  { value: 1402, label: 1402 },
  { value: 1403, label: 1403 },
];

const optionDays = [
  { value: "01", label: "1" },
  { value: "02", label: "2" },
  { value: "03", label: "3" },
  { value: "04", label: "4" },
  { value: "05", label: "5" },
  { value: "06", label: "6" },
  { value: "07", label: "7" },
  { value: "08", label: "8" },
  { value: "09", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
];
const optionMonth = [
  { value: "01", label: "فروردین" },
  { value: "02", label: "اردیبهشت" },
  { value: "03", label: "خرداد" },
  { value: "04", label: "تیر" },
  { value: "05", label: "مرداد" },
  { value: "06", label: "شهریور" },
  { value: "07", label: "مهر" },
  { value: "08", label: "آبان" },
  { value: "09", label: "آذر" },
  { value: "10", label: "دی" },
  { value: "11", label: "بهمن" },
  { value: "12", label: "اسفند" },
];

const YearInput = () => {
  return (
    <>
      <span className="block mb-2 text-sm font-medium text-gray-900">
        تاریخ ازدواج
      </span>
      <div className="flex gap-4 w-full">
        <div className="grow">
          <Select
            className="border-none outline-none hover:border-none hover:outline-none"
            placeholder="روز"
            isRtl={true}
            options={optionDays}
          />
        </div>

        <div className="grow">
          <Select
            className="shadow-none"
            placeholder="ماه"
            isRtl={true}
            options={optionMonth}
          />
        </div>
        <div className="grow">
          <Select
            className="shadow-none focus:border-none"
            placeholder="سال"
            isRtl={true}
            name="color"
            options={optionYear}
          />
        </div>
      </div>
    </>
  );
};

export default YearInput;
