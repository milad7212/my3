import React, { useState } from "react";

const Item = ({ title, text }) => {
  const [highlight, setHighlight] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard!");
        setHighlight(true);
        setTimeout(() => {
          setHighlight(false);
        }, 500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <>
      <div className="">
        <p className="text-xs mb-2 text-gray-400"> {title}</p>
        <p
          className={`text-justify font-bold cursor-pointer transition-all ease-in ${
            highlight ? "bg-blue-600 text-white " : ""
          }`}
          onClick={() => copyToClipboard(text)}
        >
          {" "}
          {text}
        </p>
      </div>
    </>
  );
};

export default Item;
