import React from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputFile from "../../../../components/inputDrawRIght/InputFile";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

import { TrashIcon } from "@heroicons/react/24/outline";

export const InfoCustomerDepositSection = ({
  updateFormValue,
  updateFormVehicleValue,
  handleDeleteObjCustomer,
  handleAddVehicleCustomer,
  handleDeleteObjVehicle,
  customersObj,
  index,
  item,
}) => {
  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Thông tin khách hàng {index + 1}
      </p>

      <InputText
        lable="Họ tên"
        format="fullName"
        updateType="fullName"
        updateFormValue={updateFormValue}
        defaultValue={customersObj[index].fullName}
        index={index}
      />

      <InputText
        type="text"
        lable="Số điện thoại"
        updateType="phoneNumber"
        updateFormValue={updateFormValue}
        defaultValue={customersObj[index].phoneNumber}
        index={index}
      />

      <InputText
        type="text"
        lable="CCCD/CMND"
        updateType="identification"
        updateFormValue={updateFormValue}
        index={index}
        defaultValue={customersObj[index].identification}
      />

      <button
        onClick={() => {
          handleAddVehicleCustomer(index);
        }}
        className="float-right h-7 pr-2.5 py-1.5 bg-rose-600 hover:bg-rose-500  rounded justify-center items-center gap-2 inline-flex"
      >
        <PlusSmallIcon className="w-4 h-4 relative text-white" />
        <div className=" text-center text-white text-xs font-medium">
          Thêm xe
        </div>
      </button>

      {item.vehicles.map((vehicle, indexVehicle) => {
        return (
          <div key={indexVehicle}>
            <div className="flex ">
              <p className="text-lg font-normal text-rose-800 dark:text-white">
                Thông tin xe {indexVehicle + 1}
              </p>
            </div>
            <InputText
              lable="Loại xe"
              updateType="type"
              updateFormValue={updateFormVehicleValue}
              index={index}
              index2={indexVehicle}
              defaultValue={customersObj[index].vehicles[indexVehicle].type}
            />

            <InputText
              lable="Biển số xe"
              updateType="licensePlates"
              updateFormValue={updateFormVehicleValue}
              index={index}
              index2={indexVehicle}
              defaultValue={
                customersObj[index].vehicles[indexVehicle].licensePlates
              }
              format="upCase"
            />

            {/* <InputFile
              lable="Hình ảnh xe"
              updateType="image"
              updateFormValue={updateFormVehicleValue}
              index={index}
              index2={indexVehicle}
            /> */}

            <div className="text-right">
              <button
                className="text-right btn w-80 bg-rose-50 text-rose-700 border-none hover:bg-rose-200"
                onClick={() => handleDeleteObjVehicle(index, indexVehicle)}
              >
                <TrashIcon className="w-5 mx-2" />
                Xoá xe
              </button>
            </div>
          </div>
        );
      })}

      <button
        className="mt-2 btn w-full bg-rose-50 text-rose-700 border-none hover:bg-rose-200"
        onClick={() => handleDeleteObjCustomer(index)}
      >
        <TrashIcon className="w-5 mx-2" />
        Xoá khách hàng
      </button>

      <div className="divider my-1"></div>
    </>
  );
};
