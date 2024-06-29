import { useEffect } from "react";
import { InfoCustomerDepositSection } from "./InfoCustomerDepositSection";
import { InfoRoomDepositSection } from "./InfoRoomDepositSection";
import { FeeExtraDepositSection } from "./FeeExtraDepositSection";
import { FunitureSection } from "./FunitureSection";
import { useDispatch, useSelector } from "react-redux";
import { FetchGetFuniture_service } from "../service/FetchGetFuniture_service";
import {
  resetContractRoomSlice,
  updateContractRoomSlice,
} from "./contractRoomSlice";
import { FetchContractRoom } from "../service/FetchContractRoom";
import { showNotification } from "../../../common/headerSlice";
import { FetchGetInfoContract } from "../service/FetchGetInfoContract";
import { getRooms } from "../../../common/roomsSlice";
import { FetchGetInfoDeposit } from "../service/FetchGetInfoDeposit";
import {
  MODAL_BODY_TYPES,
  TYPES_DELETE,
} from "../../../../utils/globalConstantUtil";
import { openModal } from "../../../common/modalSlice";
import { FetchUpdateContractRoom } from "../service/FetchUpdateContractRoom";

function ContractRoomBodyRightDrawer({ closeRightDrawer, extraObject }) {
  // console.log(extraObject);
  const dispatch = useDispatch();
  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);
  const { selectedHome } = useSelector((state) => state.rooms);

  const handleContractRooom = () => {
    const data = { ...infoContractRoom };

    if (!infoContractRoom.contractEndDate) {
      dispatch(
        showNotification({
          message: "Vui lòng nhập ngày kết thúc hợp đồng",
          status: 0,
        })
      );
      return;
    }
    data.roomId = extraObject.roomId;
    const requestAPI = dispatch(FetchContractRoom(data));
    try {
      requestAPI.then((response) => {
        if (response.payload) {
          if (response.payload.isSuccess) {
            dispatch(
              showNotification({
                message: "Lên hợp đồng thành công",
                status: 1,
              })
            );
            dispatch(getRooms({ id: selectedHome.id, search: "" }));
            closeRightDrawer();
          } else {
            dispatch(
              showNotification({
                message: response.payload.message,
                status: 0,
              })
            );
          }
        } else {
          dispatch(
            showNotification({ message: "Lên hợp đồng thất bại", status: 0 })
          );
        }
      });
    } catch (error) { }
  };

  const handleUpdateContractRooom = () => {
    const services = infoContractRoom.services;
    const contractId = extraObject.contractId;
    const data = { ...infoContractRoom, services, contractId };

    const requestAPI = dispatch(FetchUpdateContractRoom(data));
    try {
      requestAPI.then((response) => {
        if (response.payload) {
          dispatch(
            showNotification({ message: "Lên hợp đồng thành công", status: 1 })
          );
          dispatch(getRooms({ id: selectedHome.id, search: "" }));
          closeRightDrawer();
        } else {
          dispatch(
            showNotification({ message: "Lên hợp đồng thất bại", status: 0 })
          );
        }
      });
    } catch (error) { }
  };

  const handleDeleteContract = (roomId, roomCode) => {
    closeRightDrawer();
    dispatch(
      openModal({
        title: "Xoá hợp đồng thuê",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION_DELETE_CODE,
        extraObject: {
          type: TYPES_DELETE.DELETE_CONTRACT,
          message: `Bạn có chắc chắn muốn huỷ hợp đồng thuê?Tất cả dữ liệu sẽ bị xóa vĩnh viễn khỏi máy chủ. Hành động này không thể được hoàn tác.Vui lòng nhập mã phòng để xác nhận`,
          roomId: roomId,
          password: roomCode,
          idHome: selectedHome.id,
        },
      })
    );
  };

  // khởi tạo nội thất và dịch vụ cho đặt cọc môi giới
  useEffect(() => {
    const fetchData = async () => {
      try {
        // gọi api lấy nội thất và dịch vụ
        const resultAPI = await dispatch(
          FetchGetFuniture_service(extraObject.roomId)
        );
        const INIT = {
          roomId: 0,
          rentalTerm: 0,
          depositDate: "",
          depositAmount: 0,
          rentalPrice: 0,
          rentalStartDate: "",
          numberOfPeople: 0,
          numberOfVehicle: 0,
          fullName: "",
          phoneNumber: "",
          birthOfDay: "",
          identification: "",
          dateRange: "",
          issuedBy: "",
          permanentAddress: "",
          signature: "",
          contractEndDate: "",
          note: "",
          services: [
            {
              serviceId: 0,
              servicePrice: 0,
              dvt: "",
              oldNumber: 0,
            },
          ],
          furnitures: [
            {
              furnitureId: 0,
              price: 0,
              note: "",
            },
          ],
        };

        console.log(resultAPI)
        const newOBJ = {
          ...INIT,
          furnitures: resultAPI.payload.furnitureInserts,
          services: resultAPI.payload.serviceInserts.map((item) => ({
            ...item,
            oldNumber: 0,
          })),
          roomId: extraObject.roomId,
          rentalPrice: extraObject.rentPrice,
        };



        dispatch(updateContractRoomSlice(newOBJ));
      } catch (error) {
        console.error("Error fetching FetchGetFuniture_service:", error);
      }
    };

    // có hợp đồng
    if (extraObject.contractId) {
      // nếu chưa từng lên hợp đồng
      // gọi api lấy nội thất và dịch vụ
      const data = {
        roomId: extraObject.roomId,
        contractId: extraObject.contractId,
      };

      const resultAPI = dispatch(FetchGetInfoContract(data));

      resultAPI.then((result) => {
        const furnitures = result.payload.response.furnitures.map((item) => ({
          ...item,
          furnitureName: item.name,
        }));

        const services = result.payload.response.services.map((item) => ({
          ...item,
          serviceName: item.name,
        }));
        dispatch(
          updateContractRoomSlice({
            ...result.payload.response,
            furnitures,
            services,
            // contractEndDate: "",
          })
        );
      });

      resultAPI.catch();
    }

    //nếu có thông tin cọc chưa có hợp đồng
    else if (extraObject.depositId) {
      const data = {
        roomId: extraObject.roomId,
        depositId: extraObject.depositId,
      };

      const resultAPI = dispatch(FetchGetInfoDeposit(data));

      resultAPI.then((result) => {
        //console.log("resultAPI FetchGetInfodepositId:", result.payload);

        const furnitures = result.payload.response.furnitures.map((item) => ({
          ...item,
          furnitureName: item.name,
          checked: item.isActived,
        }));

        const services = result.payload.response.services.map((item) => ({
          ...item,
          serviceName: item.name,
        }));

        dispatch(
          showNotification({ message: "Lấy thông tin từ cọc", status: 1 })
        );

        dispatch(
          updateContractRoomSlice({
            ...infoContractRoom,
            ...result.payload.response,
            furnitures,
            services
          })
        );
      });

      resultAPI.catch();
    }

    // chưa có hợp đồng chưa có cọc
    else {
      dispatch(resetContractRoomSlice());
      fetchData();
    }
  }, []);

  return (
    <div className="mt-4 h-screen">
      <div className="">
        <InfoCustomerDepositSection />
        <InfoRoomDepositSection extraObject={extraObject} />
        <FeeExtraDepositSection />
        <FunitureSection />
        <div className="flex justify-end mt-4">
          <button
            onClick={() => closeRightDrawer()}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Huỷ
          </button>

          {extraObject.contractId ? (
            <>
              <button
                onClick={() => {
                  handleDeleteContract(
                    extraObject.roomId,
                    extraObject.roomCode
                  );
                }}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Huỷ hợp đồng
              </button>
              <button
                onClick={handleUpdateContractRooom}
                type="button"
                className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
              >
                Cập nhật
              </button>
            </>
          ) : (
            <button
              onClick={handleContractRooom}
              type="button"
              className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
            >
              Lên hợp đồng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContractRoomBodyRightDrawer;
