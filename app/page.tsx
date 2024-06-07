"use client";

import React from "react";
import { registerEjdevag } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";

const ScrapPage = () => {
  async function register() {
    registerEjdevag();
  }
  return (
    <>
      <Modal />
      <div className=" bg-gray-200 p-4">
        <SearchInput />
        {/* cards */}
        <div className="flex gap-2">
          <Card />
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
