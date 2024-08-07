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
import { createClient } from "@supabase/supabase-js";

const ScrapPage = () => {
  const [headless, setheadless] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchedUser, setSetSearchedUser] = useState([]);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const supabase = createClient(
          "https://gyyahfiiuknbzsmeqxwa.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eWFoZmlpdWtuYnpzbWVxeHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NzMwNzAsImV4cCI6MjAzNzE0OTA3MH0.Io1Yu-zALtggR6dVSxnmXfJzhS4ouQPksmuYKszW--E"
        );

        let { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("status", "1");
        if (!error) {
          setUsers(data);
          setSetSearchedUser(data);
          console.log("data", data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProvinces();
  }, []);
  async function register(data) {
    registerEjdevaj(data, headless);
  }

  function handelSearch(searchTerm) {
    const filtered = users.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSetSearchedUser(filtered);
  }
  function handleEmptyInput() {
    setSetSearchedUser(users);
  }

  return (
    <>
      {/* <Modal /> */}
      <div className=" bg-gray-200 relative p-4 min-h-screen">
        <div className="absolute">
          <SwitchButton
            headless={headless}
            handleSwitch={() => setheadless((e) => !e)}
          />
        </div>
        <SearchInput
          handelSearch={handelSearch}
          handleEmptyInput={handleEmptyInput}
        />

        {/* cards */}
        <div className=" gap-4 mt-4 flex flex-wrap  ">
          {searchedUser.map((item, index) => (
            <>
              <Card onRegister={() => register(item)} data={item} key={index} />
            </>
          ))}

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
