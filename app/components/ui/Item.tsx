import React from "react";

const Item = ({ title, text }) => {
  return (
    <>
      <div className="">
        <p className="text-xs mb-2 text-gray-400"> {title}</p>
        <p className="font-bold text-justify"> {text}</p>
      </div>
    </>
  );
};

export default Item;
