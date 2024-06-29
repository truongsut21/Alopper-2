import React, { useEffect, useState } from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputFile from "../../../../components/inputDrawRIght/InputFile";
import InputSelect from "../../../../components/inputDrawRIght/InputSelect";
import InputPrice from "../../../../components/inputDrawRIght/InputPrice";
import { useDispatch, useSelector } from "react-redux";
import { updateContractRoomSlice } from "./contractRoomSlice";
import moment from "moment";
import { showNotification } from "../../../common/headerSlice";

export const InfoRoomDepositSection = ({ extraObject }) => {
  // console.log("extraObject:", extraObject);
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);
  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);

  const updateFormValue = ({ updateType, value, index }) => {
    const newOBJ = { ...infoContractRoom, [updateType]: value };
    if ( updateType === "rentalStartDate" &&
      moment(newOBJ.rentalStartDate).isAfter(moment(newOBJ.depositDate))) {
    dispatch(updateContractRoomSlice(newOBJ));}
    else{
      dispatch(
        showNotification({
          message: "Ngày bắt đầu cho thuê phải lớn hơn ngày đặt cọc!",
          status: 0,
        })
      );
    }
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
        defaultValue={infoContractRoom.rentalPrice}
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
        defaultValue={infoContractRoom.rentalTerm}
      />

      <InputDate
        updateType="depositDate"
        updateFormValue={updateFormValue}
        lable="Ngày đặt cọc"
        defaultValue={moment(infoContractRoom.depositDate).format("YYYY-MM-DD")}
      />

      <InputPrice
        unit="đ"
        updateType="depositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc giữ phòng"
        defaultValue={infoContractRoom.depositAmount}
      />

      <InputPrice
        unit="đ"
        updateType="additionalDepositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc bổ sung"
        defaultValue={infoContractRoom.additionalDepositAmount}
      />

      <InputDate
        updateType="depositPaymentDeadline"
        updateFormValue={updateFormValue}
        lable="Hạn thanh toán tiền cọc"
        defaultValue={moment(infoContractRoom.depositPaymentDeadline).format(
          "YYYY-MM-DD"
        )}
      />

      <InputDate
        updateType="rentalStartDate"
        updateFormValue={updateFormValue}
        lable="Ngày bắt đầu cho thuê"
        defaultValue={moment(infoContractRoom.rentalStartDate).format(
          "YYYY-MM-DD"
        )}
      />

      <InputDate
        updateType="contractEndDate"
        defaultValue={moment(infoContractRoom.contractEndDate).format(
          "YYYY-MM-DD"
        )}
        updateFormValue={updateFormValue}
        lable="Ngày kết thúc hợp đồng"
      />

      <InputText
        type="number"
        updateType="numberOfPeople"
        updateFormValue={updateFormValue}
        lable="Số lượng người ở"
        defaultValue={infoContractRoom.numberOfPeople}
      />

      <InputText
        type="number"
        updateType="numberOfVehicle"
        updateFormValue={updateFormValue}
        lable="Số lượng xe"
        defaultValue={infoContractRoom.numberOfVehicle}
      />

      <InputText
        lable="Chương trình ưu đãi"
        updateType="chuongTrinhUuDai"
        disabled={true}
      />
      <div className="divider my-1"></div>
    </>
  );
};
