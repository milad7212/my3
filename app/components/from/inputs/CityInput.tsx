"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
const CityInput = ({ handelCityValue }) => {
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

  const handleProvinceChange = async (
    selectedOption: SingleValue<{ id: string; label: string }>
  ) => {
    setSelectedProvince(selectedOption);
    try {
      const response = await axios.get(`/api/city/${selectedOption?.id}`);
      setCities(response.data);
      console.log("Cities data:", response.data);
    } catch (error) {
      setError(error);
    }
  };
  const onCityChange = async (
    selectedOption: SingleValue<{ id: string; label: string }>
  ) => {
    const provinceCity = {
      cityId: selectedOption?.id,
      ostanId: selectedProvince?.id,
    };
    handelCityValue(provinceCity);
    console.log("provinceCity", provinceCity);
  };
  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              استان
            </label>
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
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              شهرستان
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              options={cities}
              isRtl={true}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id.toString()}
              placeholder="شهر"
              isDisabled={!selectedProvince}
              onChange={onCityChange}
            />
          </div>
        </div>
        {error && <p className="text-red-500">خطا در بارگیری داده‌ها</p>}
      </div>
    </>
  );
};

export default CityInput;
