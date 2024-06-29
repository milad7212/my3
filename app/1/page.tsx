"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import DayInput from "../components/from/inputs/DayInput";
import MonthInput from "../components/from/inputs/MonthInput";
import YearInput from "../components/from/inputs/YearInput";

const PageTest = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`/api/province`);
        setProvinces(response.data);
        console.log("Provinces data:", response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (selectedOption) => {
    setSelectedProvince(selectedOption);
    try {
      const response = await axios.get(`/api/city/${selectedOption.id}`);
      setCities(response.data);
      console.log("Cities data:", response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-400 p-6">
        <div className="grid grid-cols-2 gap-2">
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={provinces}
            isRtl={true}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id.toString()}
            placeholder="استان"
            onChange={handleProvinceChange}
            isLoading={loading}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={cities}
            isRtl={true}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id.toString()}
            placeholder="شهر"
            isDisabled={!selectedProvince}
          />
        </div>
        {error && <p className="text-red-500">خطا در بارگیری داده‌ها</p>}
        <div className=" flex gap-6 my-4">
          <DayInput onDayChange={() => {}} />
          <MonthInput onMonthChange={() => {}} />
          <YearInput onYearChange={() => {}} />
        </div>
      </div>
    </>
  );
};

export default PageTest;
