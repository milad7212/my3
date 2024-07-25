"use client";

import React, { useEffect } from "react";
import { registerEjdevaj } from "./actions/registerEjdevaj";
import SearchInput from "./components/sarch/SearchInput";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";
import prisma from "@/prisma/client";
import axios from "axios";
import { usersData } from "@/data/users";

const ScrapPage = () => {
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
    registerEjdevaj(data);
  }

  return (
    <>
      {/* <Modal /> */}
      <div className=" bg-gray-200 p-4 min-h-screen">
        <SearchInput />

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-4 grid-cols-1 ">
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
