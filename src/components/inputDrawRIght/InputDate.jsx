import { useEffect, useState } from "react";

const InputDate = ({ lable, defaultValue, updateType, updateFormValue }) => {
  const [value, setValue] = useState(defaultValue || "");
 
  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  
  return (
    <div className="flex justify-between items-center mb-5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">{lable}</p>
      <div className="relative w-80 shadow border border-gray-300 rounded-md">
        <input
          value={value}
          onChange={(e) => updateInputValue(e.target.value)}
          type="date"
          className="bg-gray-50border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  "
          placeholder="Chọn ngày"
        />
      </div>
    </div>
  );
};

export default InputDate;
