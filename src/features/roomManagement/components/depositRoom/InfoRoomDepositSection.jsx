import React, { useEffect, useState } from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputPrice from "../../../../components/inputDrawRIght/InputPrice";
import { useDispatch, useSelector } from "react-redux";
import { updateDepositRoomSlice } from "./depositRoomSlice";
import moment from "moment";

export const InfoRoomDepositSection = ({ extraObject }) => {
  const dispatch = useDispatch();

  const { selectedHome } = useSelector((state) => state.rooms);
  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);

  //console.log("infoDepositRoom:", infoDepositRoom);

  const updateFormValue = ({ updateType, value, index }) => {
    const newOBJ = {
      ...infoDepositRoom,
      [updateType]: value,
    };
    dispatch(updateDepositRoomSlice(newOBJ));
  };

  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Thông tin căn hộ
      </p>

      <InputText
        lable="Địa chỉ toà nhà"
        disabled={true}
        defaultValue={selectedHome.name}
      />

      <InputText
        lable="Mã phòng"
        disabled={true}
        defaultValue={extraObject.roomCode}
      />

      <InputPrice
        unit="đ"
        defaultValue={infoDepositRoom.rentalPrice}
        updateType="rentalPrice"
        updateFormValue={updateFormValue}
        lable="Giá cho thuê"
      />

      <InputText
        type="number"
        updateType="rentalTerm"
        updateFormValue={updateFormValue}
        lable="Thời hạn thuê"
        unit="Tháng"
        defaultValue={infoDepositRoom.rentalTerm}
      />
      <InputDate
        updateType="depositDate"
        defaultValue={moment(infoDepositRoom.depositDate).format("YYYY-MM-DD")}
        updateFormValue={updateFormValue}
        lable="Ngày đặt cọc"
      />

      <InputPrice
        unit="đ"
        updateType="depositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc giữ phòng"
        defaultValue={infoDepositRoom.depositAmount}
      />

      <InputPrice
        unit="đ"
        updateType="additionalDepositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc bổ sung"
        defaultValue={infoDepositRoom.additionalDepositAmount}
      />

      <InputDate
        updateType="depositPaymentDeadline"
        defaultValue={moment(infoDepositRoom.depositPaymentDeadline).format(
          "YYYY-MM-DD"
        )}
        updateFormValue={updateFormValue}
        lable="Hạn thanh toán tiền cọc"
      />

      <InputDate
        updateType="rentalStartDate"
        defaultValue={moment(infoDepositRoom.rentalStartDate).format(
          "YYYY-MM-DD"
        )}
        updateFormValue={updateFormValue}
        lable="Ngày bắt đầu cho thuê"
      />

      <InputText
        type="number"
        updateType="numberOfPeople"
        updateFormValue={updateFormValue}
        lable="Số lượng người ở"
        defaultValue={infoDepositRoom.numberOfPeople}
      />

      <InputText
        type="number"
        updateType="numberOfVehicle"
        updateFormValue={updateFormValue}
        lable="Số lượng xe"
        defaultValue={infoDepositRoom.numberOfVehicle}
      />

      <InputText
        lable="Chương trình ưu đãi"
        updateType="chuongTrinhUuDai"
        disabled={true}
        updateFormValue={updateFormValue}
        defaultValue={""}
      />
      <div className="divider my-1"></div>
    </>
  );
};
