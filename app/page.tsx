"use client";

import React from "react";
import { registerEjdevag } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";

const ScrapPage = () => {
  async function register() {
    registerEjdevag();
  }
  return (
    <>
      <div className=" bg-blue-400 p-4">
        <SearchInput />
        {/* cards */}
        <div className="flex gap-2">
          <div className="bg-white shadow-sm rounded-md p-4">
            <div className="flex justify-between gap-6 items-center">
              <p className="">میلاد حسنی</p>
              <p className="">5420020645</p>
            </div>
            <div className=""></div>
          </div>
        </div>

        {/* cards */}
        <div className="h-screen flex justify-center items-center ">
          <button
            className="bg-white p-4 rounded-md active:scale-90 transition duration-100 ease-linear"
            onClick={register}
          >
            ثبت نام سریع
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrapPage;
