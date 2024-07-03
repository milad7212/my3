import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DayInput from "./inputs/DayInput";
import MonthInput from "./inputs/MonthInput";
import YearInput from "./inputs/YearInput";
import CityInput from "./inputs/CityInput";

import axios from "axios";

const MarriageForm = ({}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [dataform, setDataform] = useState({
    dayTavalod: "",
    monthTavalod: "",
    yearTavalod: "",
    dayEjdevag: "",
    monthEjdevag: "",
    yearEjdevag: "",
    ostan: "",
    city: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("milad", data);
    try {
      console.log(data);
      const response = await axios.post("/api/users", {
        data,
      });
      console.log("response api users", response);
    } catch (error) {
      console.log("error api users", error);
      setErrorMessage("خطا در ارسال اطلاعات. لطفا دوباره تلاش کنید.");
    }
  };
  const handleDateChange = (type, value) => {
    setValue(type, value);
  };
  const handelCityValue = (provinceCity) => {
    setValue("cityId", provinceCity.cityId);
    setValue("ostanId", provinceCity.ostanId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div dir="rtl" className="grid gap-6 mb-6 md:grid-cols-2 text-right">
        <div className="grid grid-cols-3 col-span-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              نام
            </label>
            <input
              type="text"
              id="name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="میلاد"
              {...register("name", { required: "نام الزامی است" })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          {/* <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              نام خانوادگی
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="حسنی"
            />
          </div> */}
          <div>
            <label
              htmlFor="codeMeli"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              کدملی
            </label>
            <input
              type="text"
              id="codeMeli"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="کد ملی"
              {...register("codeMeli")}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              موبایل
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-white  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="09139939426"
              required
              {...register("phoneNumber")}
            />
          </div>
        </div>

        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900  ">
            تولد
          </label>
          <div className=" flex gap-6 my-4 w-full">
            <div className="grow">
              <DayInput
                onDayChange={(day) => handleDateChange("dayTavalod", day)}
              />
            </div>
            <div className="grow">
              <MonthInput
                onMonthChange={(month) =>
                  handleDateChange("monthTavalod", month)
                }
              />
            </div>
            <div className="grow">
              <YearInput
                onYearChange={(year) => handleDateChange("yearTavalod", year)}
              />
            </div>
          </div>
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900  ">
            ازدواج
          </label>
          <div className=" flex gap-6 my-4 w-full">
            <div className="grow">
              <DayInput
                onDayChange={(day) => handleDateChange("dayEjdevag", day)}
              />
            </div>
            <div className="grow">
              <MonthInput
                onMonthChange={(month) =>
                  handleDateChange("monthEjdevag", month)
                }
              />
            </div>
            <div className="grow">
              <YearInput
                onYearChange={(year) => handleDateChange("yearEjdevag", year)}
              />
            </div>
          </div>
        </div>
        <div className="">
          <CityInput handelCityValue={handelCityValue} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              کد پستی
            </label>
            <input
              type="text"
              id="website"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="777777"
              {...register("zipCode")}
            />
          </div>
          <div>
            <label
              htmlFor="visitors"
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              تلفن ثابت
            </label>
            <input
              type="number"
              id="visitors"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder=""
              {...register("phoneStatic")}
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
          آدرس
        </label>
        <textarea
          rows={4}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          {...register("address")}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="explain"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
          توضیحات
        </label>
        <textarea
          rows={2}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          {...register("explain")}
        />
      </div>

      {/* <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300    "
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900  "
        >
          I agree with the{" "}
          <a href="#" className="text-blue-600 hover:underline  ">
            terms and conditions
          </a>
          .
        </label>
      </div> */}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        ثبت نام
      </button>
    </form>
  );
};

export default MarriageForm;
