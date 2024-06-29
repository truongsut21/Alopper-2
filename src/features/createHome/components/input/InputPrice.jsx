import React, { useEffect, useState } from "react";
import {
  formatPrice,
  formatStringToPrice,
} from "../../../../components/Input/Format";

export default function InputPrice({
  lable,
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
  unit,
}) {
  const [value, setValue] = useState(defaultValue || "");

  const updateInputValue = (val) => {
    val = formatStringToPrice(val);
    //console.log("val:", val);
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  return (
    <div className="flex flex-col items-start w-full">
      <p className="text-sm leading-5 font-medium">{lable}</p>
      <div className="w-full h-9 bg-white rounded-md border border-gray-300 inline-flex">
        <div className="grow">
          <input
            type="text"
            disabled={disabled || false}
            value={formatPrice(value)}
            onChange={(e) => updateInputValue(e.target.value)}
            className="w-full h-8 focus:outline-none text-gray-900"
          />
        </div>
        {unit && (
          <div className=" h-9 text-gray-500 text-sm font-normal leading-tight py-2 px-2">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
