import React from "react";
import AsyncSelect from "react-select/async";
import { ColourOption, colourOptions } from "../data";

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (
  inputValue: string,
  callback: (options: ColourOption[]) => void
) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};
const PageTest = () => {
  return (
    <>
      <div className="min-h-screen">
        <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />
      </div>
    </>
  );
};

export default PageTest;
