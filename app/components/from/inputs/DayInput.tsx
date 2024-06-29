import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
const options = [
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
interface DayInputProps {
  onDayChange: (day: string) => void;
}

const DayInput: React.FC<DayInputProps> = ({ onDayChange }) => {
  const [selectedDay, setSelectedDay] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedDay(selectedOption);
    if (selectedOption) {
      onDayChange(selectedOption.value);
    } else {
      onDayChange("");
    }
  };
  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        options={options}
        isRtl={true}
        placeholder="روز"
        value={selectedDay}
        onChange={handleChange}
      />
    </>
  );
};

export default DayInput;
