import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import { useDispatch, useSelector } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import {
  MODAL_BODY_TYPES,
  RIGHT_DRAWER_TYPES,
  TYPES_DELETE,
} from "../../../utils/globalConstantUtil";
import { openModal } from "../../common/modalSlice";
import { formatPrice } from "../../../components/Input/Format";
import moment from "moment";
import { showNotification } from "../../common/headerSlice";
import { fetchPDFHome } from "./service/fetchPDFHome";

const getDummyStatus = (role) => {
  switch (role) {
    case "0":
      return (
        <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium rounded ">
          Phòng trống
        </div>
      );
    case "1":
      return (
        <div className="badge border-none bg-blue-200 text-gray-800 text-xs font-medium rounded ">
          Sắp trống
        </div>
      );
    case "2":
      return (
        <div className="badge border-none bg-red-100 text-yellow-800 text-xs font-medium rounded ">
          Đã đặt cọc
        </div>
      );

    case "3":
      return (
        <div className="badge border-none bg-amber-100 text-red-800 text-xs font-medium rounded ">
          Đã cho thuê
        </div>
      );

    case "4":
      return (
        <div className="badge border-none bg-yellow-100 text-yellow-800 text-xs font-medium rounded ">
          Hợp đồng quá hạn
        </div>
      );

    case "5":
      return (
        <div className="badge border-none bg-yellow-100 text-yellow-800 text-xs font-medium rounded ">
          Đang nợ tiền
        </div>
      );
    default:
      return (
        <div className="badge border-none bg-green-100 text-green-800 text-xs font-medium rounded ">
          Phòng trống
        </div>
      );
  }
};

function ListRooms({ filterRooms }) {
  //console.log("filterRooms in   lisrom:", filterRooms);
  const { rooms } = useSelector((state) => state.rooms);
  const { selectedHome } = useSelector((state) => state.rooms);
  console.log("🚀 ~ ListRooms ~ selectedHome:", selectedHome)

  console.log("rooms:", rooms);
  const dispatch = useDispatch();

  const openRightDrawerListHome = (roomId, roomCode) => {
    dispatch(
      openRightDrawer({
        header: `Thông tin chi tiết phòng`,
        content: "Chọn danh nhà của bạn để quản lý chi tiết phòng",
        bodyType: RIGHT_DRAWER_TYPES.DETAILS_ROOM,
        extraObject: {
          roomId: roomId,
          roomCode: roomCode,
        },
      })
    );
  };

  const openRightDrawerDepositRoom = (
    roomId,
    roomCode,
    rentPrice,
    depositId
  ) => {
    dispatch(
      openRightDrawer({
        header: `Tạo hợp đồng cọc giữ chỗ`,
        content: "Vui lòng điền thông tin dưới đây để lên hợp đồng",
        bodyType: RIGHT_DRAWER_TYPES.DEPOSIT_ROOM,
        extraObject: {
          roomId,
          roomCode,
          rentPrice,
          depositId,
        },
      })
    );
  };

  const openRightDrawerAddCustomer = (
    roomId,
    contractId,
    numberOfResidents
  ) => {
    if (contractId === null) {
      dispatch(
        showNotification({ message: "Phòng chưa có hợp đồng", status: 0 })
      );
    } else {
      dispatch(
        openRightDrawer({
          header: `Thêm khách hàng`,
          content: "Vui lòng điền thông tin dưới đây để thêm khách hàng",
          bodyType: RIGHT_DRAWER_TYPES.ADD_CUSTOMER,
          extraObject: { roomId, contractId, numberOfResidents },
        })
      );
    }
  };

  const openRightDrawerExportContract = (
    roomId,
    roomCode,
    rentPrice,
    contractId,
    depositId
  ) => {
    console.log(contractId, depositId);
    if (!contractId) {
      dispatch(
        showNotification({
          message: "Phòng này chưa có hợp đồng",
          status: 0,
        })
      );
    } else {
      dispatch(
        openRightDrawer({
          header: "Thông tin hợp đồng",
          bodyType: RIGHT_DRAWER_TYPES.EXPORT_CONTRACT_ROOM,
          extraObject: {
            contractId: contractId,
            depositId: depositId,
          },
        })
      );
    }
  };

  const openRightDrawerContractRoom = (
    roomId,
    roomCode,
    rentPrice,
    contractId,
    depositId
  ) => {
    dispatch(
      openRightDrawer({
        header: `Tạo hợp đồng khách thuê`,
        content: "Vui lòng nhập các thông tin dưới đây để lên hợp đồng.",
        bodyType: RIGHT_DRAWER_TYPES.CONTRACT_ROOM,
        extraObject: {
          roomId,
          roomCode,
          rentPrice,
          contractId,
          depositId,
        },
      })
    );
  };

  const openModalConformDeleteRoom = (roomId, password, index) => {
    dispatch(
      openModal({
        title: "Xoá phòng",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE_CODE,
        extraObject: {
          type: TYPES_DELETE.DELETE_ROOM,
          message: `Bạn có chắc chắn muốn xoá phòng này?Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.Vui lòng nhập mã phòng để xác nhận`,
          id: roomId,
          index: index,
          password: password,
        },
      })
    );
  };

  const openModalMoveRoom = (contractId, depositId) => {
    if (!contractId && !depositId) {
      dispatch(
        showNotification({
          message: "Phòng chưa có cọc và hợp đồng thuê",
          status: 0,
        })
      );
    } else {
      dispatch(
        openModal({
          title: "Chuyển phòng",
          bodyType: MODAL_BODY_TYPES.MOVE_ROOM,
          extraObject: {
            contractId: contractId,
            depositId: depositId,
          },
        })
      );
    }
  };

  const handleFilterRoom = () => {
    let arrTemp = [...rooms];

    arrTemp = arrTemp // hàm lọc tìm check nếu kh có cái nào được check thì render thẳng, nếu có check lọc thì vô hàm filter
      .filter((item) =>
        filterRooms.filter.length // kiểm tra có check lọc không
          ? filterRooms.filter.includes(item.status)
          : true
      );

    arrTemp = arrTemp // hàm lọc search nó sẽ filter những kí tự tồn tại sau khi đã được filter ở trên
      .filter((item) => {
        return item?.roomCode?.includes(filterRooms.search);
      });

    return arrTemp;
  };


  const exportDeposit = (depositId, coderoom) => {
    // console.log("coderoom ", coderoom);
    if (depositId, coderoom) {
      dispatch(fetchPDFHome({
        depositId: depositId,
        coderoom: coderoom,
        name: selectedHome.name
      }));
    } else {
      dispatch(
        showNotification({
          message: "Phong chua co coc",
          status: 0,
        })
      );
    }
  };
  return (
    <>
      <TitleCard topMargin="mt-2">
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="font-normal">STT</th>
                <th className="font-normal">NGƯỜI ĐẠI DIỆN</th>
                <th className="font-normal">MÃ PHÒNG</th>
                <th className="font-normal">GIÁ THUÊ (VND)</th>
                <th className="font-normal">ĐẶT CỌC (VNĐ)</th>
                <th className="font-normal">TIỀN NỢ (VNĐ)</th>
                <th className="font-normal">NGÀY KẾT THÚC HỢP ĐỒNG</th>
                <th className="font-normal">TRẠNG THÁI</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="overflow-x-auto">
              {rooms.length > 0 &&
                handleFilterRoom().map((l, index) => {

                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td>{index + 1}</td>

                      <td>
                        <div className="flex items-center gap-4">
                          <div className="font-medium dark:text-white">
                            <div>
                              {l.roomRepresentation
                                ? l.roomRepresentation
                                : "Chưa có"}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex">
                                <UsersIcon className="w-5" />{" "}
                                {l.numberOfResidents
                                  ? l.numberOfResidents
                                  : " 0"}
                                {" người"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>P.{l.roomCode}</td>
                      <td>{formatPrice(l.rentPrice)}đ</td>
                      <td>{formatPrice(l.depositAmount)}đ</td>
                      <td>{l.debtPrice ? l.debtPrice : "0 đ"}</td>
                      <td>
                        {l.contractEndDate !== "0001-01-01T00:00:00" ? (
                          moment(l.contractEndDate).format("DD-MM-YYYY")
                        ) : (
                          <span className="font-medium">--</span>
                        )}
                      </td>
                      <td>{getDummyStatus(l.status ? l.status : 1)}</td>
                      <td>
                        <div className="dropdown dropdown-left">
                          <div tabIndex={0} role="button" className="m-1 w-5">
                            <EllipsisVerticalIcon />
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <button
                                onClick={() =>
                                  openRightDrawerListHome(l.id, l.roomCode)
                                }
                              >
                                Xem chi tiết
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  openRightDrawerDepositRoom(
                                    l.id,
                                    l.roomCode,
                                    l.rentPrice,
                                    l.depositId
                                  )
                                }
                              >
                                Đặt cọc
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => exportDeposit(l.depositId, l.roomCode)}
                              >
                                Xuất hợp đồng cọc
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  openRightDrawerContractRoom(
                                    l.id,
                                    l.roomCode,
                                    l.rentPrice,
                                    l.contractId,
                                    l.depositId
                                  )
                                }
                              >
                                Hợp đồng thuê
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  openRightDrawerExportContract(
                                    l.id,
                                    l.roomCode,
                                    l.rentPrice,
                                    l.contractId,
                                    l.depositId
                                  )
                                }
                              >
                                Xuất hợp đồng thuê
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  openRightDrawerAddCustomer(
                                    l.id,
                                    l.contractId,
                                    l.numberOfResidents
                                  )
                                }
                              >
                                Thêm khách hàng
                              </button>
                            </li>

                            <li>
                              <button
                                onClick={() =>
                                  openModalMoveRoom(l.contractId, l.depositId)
                                }
                              >
                                Chuyển phòng
                              </button>
                            </li>
                            {/* <li>
                              <button
                                onClick={() => openModalConformDeleteRoom(l.id)}
                              >
                                Xoá dữ liệu
                              </button>
                            </li> */}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default ListRooms;
