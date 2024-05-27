import Image from "next/image";
import React from "react";

function EngPage() {
  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      {/* image */}
      <div className="grid grid-cols-4 gap-4 ">
        <div className="  bg-green-400 aspect-3/4 rounded-2xl overflow-hidden">
          <Image
            src="/images/milad.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
            className="rounded-2xl overflow-hidden"
          />
        </div>
        <div className="   grid gap-4 ">
          <div
            style={{
              background:
                "linear-gradient(135deg, #393F46 0%, #202328 50%) no-repeat",
            }}
            className="flex justify-center items-center   rounded-2xl "
          >
            <p className="font-bold text-white text-3xl">میلاد حسنی</p>
          </div>
          <div
            style={{
              background:
                "linear-gradient(135deg, #393F46 0%, #202328 50%) no-repeat",
            }}
            className="flex justify-center items-center   rounded-2xl "
          >
            <p className="font-bold text-white text-3xl"> مهندس عمران</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div
              style={{
                background:
                  "linear-gradient(135deg, #393F46 0%, #202328 50%) no-repeat",
              }}
              className="flex justify-center items-center   rounded-2xl "
            >
              <p className="font-bold text-white text-3xl"> نظارت</p>
            </div>
            <div
              style={{
                background:
                  "linear-gradient(135deg, #393F46 0%, #202328 50%) no-repeat",
              }}
              className="flex justify-center items-center   rounded-2xl "
            >
              <p className="font-bold text-white text-3xl"> اجرا</p>
            </div>
            <div
              style={{
                background:
                  "linear-gradient(135deg, #393F46 0%, #202328 50%) no-repeat",
              }}
              className="flex justify-center items-center   rounded-2xl "
            >
              <p className="font-bold text-white text-3xl"> محاسبات</p>
            </div>
          </div>
        </div>
        {/* <div className="bg-blue-600 flex justify-center items-center rounded-2xl ">
          <p className=" font-bold text-white text-3xl hover:text-red-700 cursor-pointer">
            Reza
          </p>
        </div>
        <div className="bg-blue-600 flex justify-center items-center rounded-2xl ">
          <p className=" font-bold text-white text-3xl cursor-pointer">Reza</p>
        </div> */}
      </div>
    </div>
  );
}

export default EngPage;
