import React from "react";
import {
  MdModeEdit,
  MdDelete,
  MdPlayCircle,
  MdRemoveRedEye,
} from "react-icons/md";
import Item from "./Item";

const Card = ({ data, onRegister }) => {
  return (
    <div className="bg-white  rounded-md p-4 relative  flex flex-col gap-1 shadow-md">
      <div className=" self-end">
        <div className="flex gap-2">
          <MdRemoveRedEye />
          <MdModeEdit />
          <MdDelete />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 my-2 items-center">
        <Item text={data.name} title="نام" />
        <Item text={data.codeMeli} title="کدملی" />
      </div>

      <div className="grid grid-cols-3 gap-6 my-2 items-center">
        {" "}
        <Item text={data.phoneNumber} title="موبایل" />{" "}
        <Item
          text={`${data.yearTavalod}/${data.monthTavalod}/${data.dayTavalod}`}
          title="تاریخ تولد"
        />
        <Item
          text={`${data.yearEjdevag}/${data.monthEjdevag}/${data.dayEjdevag}`}
          title="تاریخ ازدواج"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 my-2 items-center">
        <Item text={data.ostan} title="استان" />

        <Item text={data.zipCode} title="کدپستی" />
        <Item text={data.phoneStatic} title="تلفن ثابت" />
      </div>
      <div className="flex justify-between gap-6 my-2 items-center">
        <Item text={data.address} title="آدرس" />
      </div>
      <div className="flex justify-between gap-6 my-2 items-center">
        <Item text={data.explain} title="توضیحات اضافه" />
      </div>
      <div className=" flex justify-center">
        <MdPlayCircle
          onClick={onRegister}
          className="h-10 w-10 text-green-800 cursor-pointer hover:scale-110 active:scale-95 duration-100"
        />
      </div>
    </div>
  );
};

export default Card;
