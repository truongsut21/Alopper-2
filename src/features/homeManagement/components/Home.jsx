import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../common/modalSlice";
import {
  TYPES_DELETE,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import ArrowSmallRightIcon from "@heroicons/react/24/outline/ArrowSmallRightIcon";
import { ButtonCrileComponent } from "../../../components/button/ButtonCrileComponent";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ArrowUpTrayIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useNavigate } from "react-router-dom";
import { getRooms, updateSelectedHome } from "../../common/roomsSlice";

export const Home = ({
  name,
  address,
  index,
  id,
  closeRightDrawer,
  quantityRoom,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteHome = () => {
    dispatch(
      openModal({
        title: "Xoá nhà trọ",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE,
        extraObject: {
          message: `Bạn có chắc chắn muốn xoá nhà trọ ${address}?
            Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.`,
          type: TYPES_DELETE.DELETE_HOME,
          index,
          id,
        },
      })
    );
  };

  const handleUpdateHome = () => {
    closeRightDrawer();
    navigate(`/app/homemanagement/updateHome/${id}`);
  };

  const handleGetRoomByIDHome = (id, name, quantity,address) => {
    //console.log("đây là id home để lấy danh sách phòng ", id);
    dispatch(getRooms({ id: id, search: "" }));
    dispatch(
      updateSelectedHome({
        name: name,
        quantity: quantity,
        id: id,
        address:address
      })
    );

    closeRightDrawer();
  };

  return (
    <>
      <div
        className="card w-full bg-base-100 shadow-sm border mb-1 hover:bg-rose-50 cursor-pointer hover:"
        onClick={() => handleGetRoomByIDHome(id, name, quantityRoom,address)}
      >
        <div className="card-body flex-row justify-between">
          <div>
            <h2 className="card-title">
              {name} ({quantityRoom})
            </h2>
            <p>{address}</p>
            <a href="." className="flex text-rose-600">
              Tới quản lý nhà trọ <ArrowSmallRightIcon className="w-5" />
            </a>
          </div>

          <div className="flex items-end">
            <ButtonCrileComponent
              content={<ArrowDownTrayIcon className="w-5 mr-2" />}
              bg="white"
            />
            <ButtonCrileComponent
              content={<ArrowUpTrayIcon className="w-5 mr-2" />}
              bg="white"
            />
            <ButtonCrileComponent
              callBack={handleUpdateHome}
              content={<PencilIcon className="w-5 mr-2" />}
              bg="red-600"
            />
            <ButtonCrileComponent
              content={<TrashIcon className="w-5 mr-2" />}
              callBack={handleDeleteHome}
              bg="red-600"
            />
          </div>
        </div>
      </div>
    </>
  );
};
