"use client";

import React, { useEffect, useState } from "react";
import { registerEjdevaj } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";
import SwitchButton from "./components/ui/SwitchButton";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";
import prisma from "@/prisma/client";
import axios from "axios";
import { usersData } from "@/data/users";

const ScrapPage = () => {
  const [headless, setheadless] = useState(false);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`/api/users`);

        console.log("users data:", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProvinces();
  }, []);
  async function register(data) {
    registerEjdevaj(data,headless);
  }

  return (
    <>
      {/* <Modal /> */}
      <div className=" bg-gray-200 relative p-4 min-h-screen">
        <div className="absolute">
          <SwitchButton
            headless={headless}
            handleSwitch={(e) => setheadless(!e)}
          />
        </div>
        <SearchInput />

        {/* cards */}
        <div className=" gap-4 mt-4 flex flex-wrap  ">
          {usersData.map((item, index) => (
            <>
              {item.status == "0" && (
                <Card
                  onRegister={() => register(item)}
                  data={item}
                  key={index}
                />
              )}
            </>
          ))}
        </div>

        {/* cards */}
      </div>
    </>
  );
};

export default ScrapPage;
