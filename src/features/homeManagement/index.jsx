// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MODAL_BODY_TYPES,
  RIGHT_DRAWER_TYPES,
} from "../../utils/globalConstantUtil";
import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ArrowUpTrayIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";
import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import debounce from "lodash.debounce";

import { openRightDrawer } from "../common/rightDrawerSlice";
import { InputSearch } from "./components/input/inputSearch";
import { ButtonComponent } from "../../components/button/ButtonComponent";
import Checkbox from "./components/input/checkBox";

import ListRooms from "./components/listRooms";
import { openModal } from "../common/modalSlice";
import { getHomes } from "./homesSlice";
import { getRooms, updateSelectedHome } from "../common/roomsSlice";
import { FetchGetLinkBroker } from "./components/service/FetchGetLinkBroker";
import { QueueListIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";

function HomeManagement() {
  const dispatch = useDispatch();
  const { homes } = useSelector((state) => state.homes);
  const { rooms } = useSelector((state) => state.rooms);
  const { selectedHome } = useSelector((state) => state.rooms);

  const [filterRooms, setFilterRooms] = useState({ filter: [], search: "" });
  const [debounceVal, setDebounceVal] = useState("");

  const [selectAll, setSelectAll] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const openRightDrawerCreateHome = () => {
    dispatch(
      openRightDrawer({
        header: `Danh sách nhà trọ của bạn (${homes.length})`,
        content:
          "Bạn có thể điều chỉnh thông tin trực tiếp hoặc xuất file từng nhà trọ.",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_HOME,
      })
    );
  };

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

  useEffect(() => {
    setSelectedOptions([]);
  }, [selectedHome]);

  const openModelAddImgToRooms = () => {
    dispatch(
      openModal({
        title: "Chọn tầng",
        bodyType: MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_IMG,
        extraObject: {
          selectedOptions: selectedOptions,
          description: "Chọn cho danh sách phòng dưới đây",
        },
      })
    );
  };

  const openModelAddFlorToRooms = () => {
    dispatch(
      openModal({
        title: "Chọn tầng",
        bodyType: MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_FLOR,
        extraObject: {
          selectedOptions: selectedOptions,
          typeInput: "flor",
          description: "Chọn cho danh sách phòng dưới đây",
        },
      })
    );
  };

  const openModelAddTypeToRooms = () => {
    dispatch(
      openModal({
        title: "Chọn loại phòng",
        bodyType: MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_TYPE,
        extraObject: {
          selectedOptions: selectedOptions,
          typeInput: "type",
          description: "Chọn cho danh sách phòng dưới đây",
        },
      })
    );
  };

  const openModelAddPriceToRooms = () => {
    dispatch(
      openModal({
        title: "Đặt giá thuê",
        bodyType: MODAL_BODY_TYPES.MUTI_SELECT_ROOMS_PRICE,
        extraObject: {
          selectedOptions: selectedOptions,
          typeInput: "price",
          description: "Chọn cho danh sách phòng dưới đây",
        },
      })
    );
  };

  const handleSearch = (search) => {
    const idhome = selectedHome.id;

    dispatch(getRooms({ id: idhome, search }));
  };
  const debouncedChange = debounce((search) => {
    handleSearch(search);
  }, 1000);
  const getQuantityStatusRoom = (status) => {
    return rooms.filter((item) => item.status === status).length;
  };

  const openLinkBroker = () => {
    try {
      // gọi api lấy nội thất và dịch vụ
      const resultAPI = dispatch(FetchGetLinkBroker());
      resultAPI.then((result) => {
        // console.log("result", result.payload);
        const url = result.payload.mesagee;
        window.open(`http://localhost:3001/${url}`, "_blank");
      });
    } catch (error) {
      console.error("Lỗi không lấy được danh sách hình ảnh theo phòng:", error);
    }
  };

  const openCreateRoomDraw = () => {
    dispatch(
      openRightDrawer({
        header: "Tạo phòng mới",
        content: "Vui lòng cập nhật thông tin dưới đây để tạo phòng mới.",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_ROOM,
      })
    );
  };

  return (
    <>
      {/* <Breadcrumb pg1="Quản lý nhà" pg2="Nhà 123 lê hoàng thái" /> */}
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <p className="pb-4 pt-0 text-gray-900 text-2xl font-bold dark:text-white">
            {selectedHome.name} ({selectedHome.quantity})
          </p>
          <ButtonComponent
            icon={<QueueListIcon className="w-5" />}
            content="Chọn nhà"
            callBack={openRightDrawerCreateHome}
          />
        </div>

        <div className="flex">
          <InputSearch updateType="search" callback={debouncedChange} />
          <ButtonComponent
            callBack={openLinkBroker}
            icon={<LinkIcon className="w-5" />}
            bg="white"
            content="Xuất link"
          />
          <ButtonComponent
            icon={<ArrowDownTrayIcon className="w-5" />}
            content="Nhập file"
          />
          <ButtonComponent
            icon={<ArrowUpTrayIcon className="w-5" />}
            content="Xuất file"
          />
        </div>
      </div>

      <div className="flex justify-between items-baseline pt-4">
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
        </div>

        <div>
          <div className="dropdown dropdown-bottom dropdown-end ml-2">
            <button
              tabIndex={0}
              className=" w-10 h-10 rounded-[19px] bg-rose-600 border-none text-white hover:bg-rose-500 flex items-center justify-center"
            >
              <PlusSmallIcon className="w-5" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={openModelAddImgToRooms}>Hình ảnh</button>
              </li>
              <li>
                <button onClick={openModelAddFlorToRooms}>Chọn tầng</button>
              </li>
              <li>
                <button onClick={openModelAddTypeToRooms}>Loại phòng</button>
              </li>
              <li>
                <button onClick={openModelAddPriceToRooms}>Giá phòng</button>
              </li>
            </ul>
          </div>

          <ButtonComponent
            icon={<SquaresPlusIcon className="w-5" />}
            bg="white"
            content="Thêm phòng mới"
            callBack={openCreateRoomDraw}
          />
        </div>
      </div>

      <ListRooms
        setSelectAll={setSelectAll}
        selectAll={selectAll}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        filterRooms={filterRooms}
      />
    </>
  );
}

export default HomeManagement;
