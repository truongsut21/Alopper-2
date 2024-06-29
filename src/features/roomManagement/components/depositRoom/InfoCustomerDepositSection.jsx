import React from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputFile from "../../../../components/inputDrawRIght/InputFile";
import { useDispatch, useSelector } from "react-redux";
import { updateDepositRoomSlice } from "./depositRoomSlice";
import moment from "moment";
import { openModal } from "../../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../../utils/globalConstantUtil";

export const InfoCustomerDepositSection = () => {
  const dispatch = useDispatch();

  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);
  //console.log("infoDepositRoom:", infoDepositRoom);

  const updateFormValue = ({ updateType, value, index }) => {
    const newOBJ = { ...infoDepositRoom, [updateType]: value };
    dispatch(updateDepositRoomSlice(newOBJ));
  };


  const openModalSign = () => {
    dispatch(
      openModal({
        title: "Tạo chữ kí",
        bodyType: MODAL_BODY_TYPES.SIGNATURE,
        extraObject: {
          callBack: (data) => {
            const newOBJ = { ...infoDepositRoom, signature: data };
            dispatch(updateDepositRoomSlice(newOBJ));
          },
        },
      })
    );
  };

  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Thông tin khách hàng
      </p>

      <InputText
        format="fullName"
        updateType="fullName"
        updateFormValue={updateFormValue}
        lable="Họ và tên "
        defaultValue={infoDepositRoom.fullName}
      />

      <InputText
        type="text"
        updateType="phoneNumber"
        updateFormValue={updateFormValue}
        lable="Số điện thoại"
        defaultValue={infoDepositRoom.phoneNumber}
      />

      <InputDate
        updateType="birthOfDay"
        updateFormValue={updateFormValue}
        lable="Ngày sinh"
        defaultValue={moment(infoDepositRoom.birthOfDay).format("YYYY-MM-DD")}
      />

      <InputText
        type="text"
        updateType="identification"
        updateFormValue={updateFormValue}
        lable="CCCD/CMND"
        defaultValue={infoDepositRoom.identification}
      />

      <InputDate
        updateType="dateRange"
        updateFormValue={updateFormValue}
        lable="Ngày cấp"
        defaultValue={moment(infoDepositRoom.dateRange).format("YYYY-MM-DD")}
      />

      <InputText
        updateType="issuedBy"
        updateFormValue={updateFormValue}
        defaultValue={infoDepositRoom.issuedBy}
        lable="Nơi cấp"
      />

      <InputText
        updateType="permanentAddress"
        updateFormValue={updateFormValue}
        lable="Địa chỉ thưởng trú"
        defaultValue={infoDepositRoom.permanentAddress}
      />

      <InputFile
        defaultValue={infoDepositRoom.signature}
        type="file"
        updateType="signature"
        updateFormValue={updateFormValue}
        lable="Chữ ký"
      />

      <div className="w-full flex justify-end">
        <div></div>
        <button
          onClick={openModalSign}
          type="button"
          className="text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4 w-80"
        >
          Tạo chữ kí
        </button>
      </div>
      <div className="divider my-1"></div>
    </>
  );
};
