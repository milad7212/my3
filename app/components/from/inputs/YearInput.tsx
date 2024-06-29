import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
const options = [
  { value: "1340", label: "1340" },
  { value: "1341", label: "1341" },
  { value: "1342", label: "1342" },
  { value: "1343", label: "1343" },
  { value: "1344", label: "1344" },
  { value: "1345", label: "1345" },
  { value: "1346", label: "1346" },
  { value: "1347", label: "1347" },
  { value: "1348", label: "1348" },
  { value: "1349", label: "1349" },
  { value: "1350", label: "1350" },
  { value: "1351", label: "1351" },
  { value: "1352", label: "1352" },
  { value: "1353", label: "1353" },
  { value: "1354", label: "1354" },
  { value: "1355", label: "1355" },
  { value: "1356", label: "1356" },
  { value: "1357", label: "1357" },
  { value: "1358", label: "1358" },
  { value: "1359", label: "1359" },
  { value: "1360", label: "1360" },
  { value: "1361", label: "1361" },
  { value: "1362", label: "1362" },
  { value: "1363", label: "1363" },
  { value: "1364", label: "1364" },
  { value: "1365", label: "1365" },
  { value: "1366", label: "1366" },
  { value: "1367", label: "1367" },
  { value: "1368", label: "1368" },
  { value: "1369", label: "1369" },
  { value: "1370", label: "1370" },
  { value: "1371", label: "1371" },
  { value: "1372", label: "1372" },
  { value: "1373", label: "1373" },
  { value: "1374", label: "1374" },
  { value: "1375", label: "1375" },
  { value: "1376", label: "1376" },
  { value: "1377", label: "1377" },
  { value: "1378", label: "1378" },
  { value: "1379", label: "1379" },
  { value: "1380", label: "1380" },
  { value: "1381", label: "1381" },
  { value: "1382", label: "1382" },
  { value: "1383", label: "1383" },
  { value: "1384", label: "1384" },
  { value: "1385", label: "1385" },
  { value: "1386", label: "1386" },
  { value: "1387", label: "1387" },
  { value: "1388", label: "1388" },
  { value: "1389", label: "1389" },
  { value: "1390", label: "1390" },
  { value: "1391", label: "1391" },
  { value: "1392", label: "1392" },
  { value: "1393", label: "1393" },
  { value: "1394", label: "1394" },
  { value: "1395", label: "1395" },
  { value: "1396", label: "1396" },
  { value: "1397", label: "1397" },
  { value: "1398", label: "1398" },
  { value: "1399", label: "1399" },
  { value: "1400", label: "1400" },
  { value: "1401", label: "1401" },
  { value: "1402", label: "1402" },
  { value: "1403", label: "1403" },
  { value: "1404", label: "1404" },
  { value: "1405", label: "1405" },
  { value: "1406", label: "1406" },
  { value: "1407", label: "1407" },
];
interface YearInputProps {
  onYearChange: (day: string) => void;
}

const YearInput: React.FC<YearInputProps> = ({ onYearChange }) => {
  const [selectedDay, setSelectedDay] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedDay(selectedOption);
    if (selectedOption) {
      onYearChange(selectedOption.value);
    } else {
      onYearChange("");
    }
  };
  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        options={options}
        isRtl={true}
        placeholder="سال"
        value={selectedDay}
        onChange={handleChange}
      />
    </>
  );
};

export default YearInput;
