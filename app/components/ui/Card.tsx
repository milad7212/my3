import React from "react";
import {
  MdModeEdit,
  MdDelete,
  MdPlayCircle,
  MdRemoveRedEye,
} from "react-icons/md";

const Card = ({ data, onRegister }) => {
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
        <p className=""> {data.name}</p>
        <p className="">{data.codeMeli}</p>
      </div>

      <div className="flex justify-between gap-6 my-2 items-center">
        <p className="">
          {" "}
          {`${data.yearTavalod}/${data.monthTavalod}/${data.dayTavalod}`}
        </p>

        <p className="">
          {" "}
          {`${data.yearEjdevag}/${data.monthEjdevag}/${data.dayEjdevag}`}
        </p>
      </div>
      <div className="flex justify-between gap-6 my-2 items-center">
        <p className=""> {data.ostan}</p>
        <p className="">{data.phoneNumber}</p>
      </div>
      <div className=" flex justify-center">
        <MdPlayCircle
          onClick={onRegister}
          className="h-10 w-10 text-green-800"
        />
      </div>
    </div>
  );
};

export default Card;
