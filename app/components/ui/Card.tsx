import React from "react";
import {
  MdModeEdit,
  MdDelete,
  MdPlayCircle,
  MdRemoveRedEye,
} from "react-icons/md";

const Card = () => {
  return (
    <div className="bg-white  rounded-md p-4 relative  flex flex-col gap-4">
      <div className=" self-end">
        <div className="flex gap-2">
          <MdRemoveRedEye />
          <MdModeEdit />
          <MdDelete />
        </div>
      </div>

      <div className="flex justify-between gap-6 my-2 items-center">
        <p className="">میلاد حسنی</p>
        <p className="">5420020645</p>
      </div>

      <div className=" flex justify-center">
        <MdPlayCircle className="h-10 w-10 text-green-800" />
      </div>
    </div>
  );
};

export default Card;
