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
];
interface MonthInputProps {
  onMonthChange: (day: string) => void;
}

const MonthInput: React.FC<MonthInputProps> = ({ onMonthChange }) => {
  const [selectedDay, setSelectedDay] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedDay(selectedOption);
    if (selectedOption) {
      onMonthChange(selectedOption.value);
    } else {
      onMonthChange("");
    }
  };
  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        options={options}
        isRtl={true}
        placeholder="ماه"
        value={selectedDay}
        onChange={handleChange}
      />
    </>
  );
};

export default MonthInput;
