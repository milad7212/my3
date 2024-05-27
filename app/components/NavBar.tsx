"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  console.log("session", session);
  console.log("status", status);
  if (status == "loading") {
    return null;
  }
  if (status == "unauthenticated") {
    return <p className="">dont </p>;
  }
  return (
    <div dir="ltr" className="p-4 bg-gray-200 space-x-4 flex items-center ">
      <Link href="/">home</Link>
      {status == "authenticated" && (
        <p className="bg-red-100 p-2 rounded-md">{session.user!.name}</p>
      )}
    </div>
  );
};

export default NavBar;
