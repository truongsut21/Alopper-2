import React, { useState } from "react";
import InputTextServicePolicy from "./input/InputTextServicePolicy";
import CheckBox from "./input/CheckBox";
import { instertServicePolicy } from "./NewHomeSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import InputServicePricePolicy from "./input/InputPriceServicePolicy";

function CreatePolicyBodyRightDrawer({ closeRightDrawer }) {
  const dispatch = useDispatch();

  const INIT_POLICY = {
    serviceName: "",
    price: 0,
    units: ["Lần","Tháng","Xe","Người"],
    option: "Người",
    default:false,
  };

  const updateFormValue = ({ updateType, value }) => {
    setPolicyobObj({ ...policyObj, [updateType]: value });
  };



  const handleInsretServicePolicy = () => {
    let flag = true;

    if (policyObj.units === undefined) {
      flag = false;
      dispatch(
        showNotification({ message: "Dơn vị được để trống", status: 0 })
      );
    }
    if (policyObj.price < 0) {
      flag = false;
      dispatch(showNotification({ message: "Giá không hợp lệ", status: 0 }));
    }
    if (policyObj.serviceName === "") {
      flag = false;
      dispatch(
        showNotification({ message: "Tên không được để trống", status: 0 })
      );
    }

    if (flag) {
      const newServicePolicyObj = policyObj;
      dispatch(instertServicePolicy({ newServicePolicyObj }));
      dispatch(
        showNotification({
          message: "Thêm chính sách dịch vụ thành công",
          status: 1,
        })
      );
      closeRightDrawer();
    }
  };

  const [policyObj, setPolicyobObj] = useState(INIT_POLICY);
  //console.log("policyObj:", policyObj);
  return (
    <div className="mt-4">
      <InputTextServicePolicy
        type="text"
        lable="Tên dịch vụ"
        updateType="serviceName"
        updateFormValue={updateFormValue}
      />
      <InputServicePricePolicy
        type="text"
        lable="Chi phí (VND)"
        unit="đ"
        updateType="price"
        updateFormValue={updateFormValue}
      />

      {/* Đơn vị */}
      {/* <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-gray-900 dark:text-white">Đơn vị</p>
        <div className="w-80 justify-between items-start">
          <div className="grid grid-cols-3 gap-4">
            <CheckBox
              label="Người"
              units={policyObj.units}
              updateType="units"
              updateFormValue={updateFormChecked}
            />
            <CheckBox
              label="Xe"
              updateType="units"
              units={policyObj.units}
              updateFormValue={updateFormChecked}
            />
            <CheckBox
              label="Tháng"
              units={policyObj.units}
              updateType="units"
              updateFormValue={updateFormChecked}
            />
            <CheckBox
              label="Phòng"
              units={policyObj.units}
              updateType="units"
              updateFormValue={updateFormChecked}
            />
            <CheckBox
              label="Lần"
              units={policyObj.units}
              updateType="units"
              updateFormValue={updateFormChecked}
            />
            <CheckBox
              label="M3"
              units={policyObj.units}
              updateType="units"
              updateFormValue={updateFormChecked}
            />
            <CheckBox
              label="Kwh"
              units={policyObj.units}
              updateType="units"
              updateFormValue={updateFormChecked}
            />
          </div>
        </div>
      </div> */}

      <div className="flex justify-end mt-4">
        <button
          onClick={() => closeRightDrawer()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>
        <button
          onClick={handleInsretServicePolicy}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}

export default CreatePolicyBodyRightDrawer;
