import React from "react";
import {
  MdModeEdit,
  MdDelete,
  MdPlayCircle,
  MdRemoveRedEye,
} from "react-icons/md";
import Item from "./Item";

const Card = ({ data, onRegister, key }) => {
  return (
    <div
      key={key}
      className="bg-white  rounded-md p-4 relative  flex  flex-col gap-1 shadow-md w-52"
    >
      <div className="flex justify-between items-center">
        <MdPlayCircle
          onClick={onRegister}
          className="h-6 w-6 text-green-800 cursor-pointer hover:scale-110 active:scale-95 duration-100"
        />
        <div className="flex gap-2">
          <MdRemoveRedEye />
          <MdModeEdit />
          <MdDelete />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 my-2 items-center ">
        <Item text={data.name} title="نام" />
        <Item text={data.codeMeli} title="کدملی" />
        <Item text={data.phoneNumber} title="موبایل" />{" "}
        <Item
          text={`${data.yearTavalod}/${data.monthTavalod}/${data.dayTavalod}`}
          title="تاریخ تولد"
        />
        <Item
          text={`${data.yearEjdevag}/${data.monthEjdevag}/${data.dayEjdevag}`}
          title="تاریخ ازدواج"
        />
        <Item text={data.ostan} title="استان" />
        <Item text={data.city} title="شهر" />
        <Item text={data.zipCode} title="کدپستی" />
        <Item text={data.phoneStatic} title="تلفن ثابت" />
        <Item text={data.address} title="آدرس" />
        <Item text={data.explain} title="توضیحات اضافه" />
        <Item text={data.created_at} title=" تاریخ ایجاد" />
      </div>
    </div>
  );
};

export default Card;
