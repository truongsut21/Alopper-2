/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";

import Checkbox from "./components/input/checkBox";
import dataHomeTest1 from "./homeDataTest";
import ListRooms from "./components/listRooms";

import { getHomes } from "./homesSlice";
import { getRooms, updateSelectedHome } from "../common/roomsSlice";
import { ButtonComponent } from "../../components/button/ButtonComponent";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import { openRightDrawer } from "../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";
import { InputSearch } from "../homeManagement/components/input/inputSearch";
import debounce from "lodash.debounce";

function RoomManagement() {
  const dispatch = useDispatch();

  const [filterRooms, setFilterRooms] = useState({ filter: [], search: "" });

  const { homes } = useSelector((state) => state.homes);
  const { rooms } = useSelector((state) => state.rooms);
  const { selectedHome } = useSelector((state) => state.rooms);

  const openRightDrawerListHome = () => {
    dispatch(
      openRightDrawer({
        header: `Danh sách toà nhà của bạn (${homes.length})`,
        content: "Chọn danh nhà của bạn để quản lý chi tiết phòng",
        bodyType: RIGHT_DRAWER_TYPES.LIST_HOME,
      })
    );
  };

  const getQuantityStatusRoom = (status) => {
    return rooms.filter((item) => item.status === status).length;
  };

  // LẤY PHÒNG DANH SÁCH PHÒNG DẦU TIÊN, KHI VÒ
  useEffect(() => {
    if (!selectedHome.id) {
      dispatch(getHomes()).then((res) => {
        dispatch(getRooms({ id: res.payload[0].id, search: "" }));

        dispatch(
          updateSelectedHome({
            name: res.payload[0].name,
            quantity: res.payload[0].quantityRoom,
            id: res.payload[0].id,
            address: res.payload[0].address,
          })
        );
      });
    }
  }, []);

  // Loại bỏ dấu câu sử dụng regex và chuyển đổi thành chữ thường
  // tìm kiếm theo tên

  const updateFilterRooms = ({ updateType, value }) => {
    const objFilter = { ...filterRooms };
    //console.log("value Filter:", value);
    //console.log("updateType Filter:", updateType);

    const index = objFilter.filter.indexOf(updateType);

    if (index === -1) {
      // Nếu giá trị không tồn tại trong mảng, thêm vào mảng
      objFilter.filter.push(updateType);
    } else {
      // Nếu giá trị tồn tại trong mảng, xoá khỏi mảng
      objFilter.filter.splice(index, 1);
    }
    //console.log("filterHoused:", objFilter);

    setFilterRooms(objFilter);
  };

  const handleSearch = (search) => {
    const idhome = selectedHome.id;
    dispatch(getRooms({ id: idhome, search }));
  };
  const debouncedChange = debounce((search) => {
    handleSearch(search);
  }, 500);
  return (
    <>
      <div className="w-1/2 mb-5 flex">
        <p className="pb-4 pt-0 text-gray-900 text-2xl font-bold dark:text-white">
          {selectedHome.name} ({selectedHome.quantity})
        </p>
        <ButtonComponent
          icon={<QueueListIcon className="w-5" />}
          content="Chọn nhà"
          callBack={openRightDrawerListHome}
        />
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <Checkbox
            content="Phòng trống"
            quantity={getQuantityStatusRoom("0")}
            updateFormValue={updateFilterRooms}
            updateType={"0"}
          />
          <Checkbox
            content="Sắp trống"
            quantity={getQuantityStatusRoom("1")}
            updateFormValue={updateFilterRooms}
            updateType={"1"}
          />
          <Checkbox
            content="Đã đặt cọc"
            quantity={getQuantityStatusRoom("2")}
            updateFormValue={updateFilterRooms}
            updateType={"2"}
          />
          <Checkbox
            content="Đã cho thuê"
            quantity={getQuantityStatusRoom("3")}
            updateFormValue={updateFilterRooms}
            updateType={"3"}
          />
          <Checkbox
            content="Hợp đồng cọc quá hạn"
            quantity={getQuantityStatusRoom("4")}
            updateFormValue={updateFilterRooms}
            updateType={"4"}
          />
          <Checkbox
            content="Đang nợ tiền"
            quantity={getQuantityStatusRoom("5")}
            updateFormValue={updateFilterRooms}
            updateType={"5"}
          />
        </div>
        <InputSearch updateType="search" callback={debouncedChange} />
      </div>
      <ListRooms filterRooms={filterRooms} />
    </>
  );
}

export default RoomManagement;
