import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  TYPES_DELETE,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { deleteLead } from "../../leads/leadSlice";
import { showNotification } from "../headerSlice";
import fetchDeleteUser from "../../leads/components/service/fetchDeleteUser";
import { closeRightDrawer } from "../rightDrawerSlice";

function ConfirmationDeleteUserModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === TYPES_DELETE.DELETE_USER) {
      // positive response, call api or dispatch redux function
      // XỬ LÝ RESET PASSWORD TẠI ĐÂY

      const resultAPI = fetchDeleteUser(id);
      resultAPI
        .then((response) => {
          if (!response.ok) {
            dispatch(
              showNotification({ message: "Xoá nhân viên thất bại", status: 0 })
            );
          } else {
            dispatch(closeRightDrawer());
            dispatch(deleteLead({ index }));
            dispatch(
              showNotification({
                message: "Xoá nhân viên thành công",
                status: 1,
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            showNotification({ message: "Xoá nhân viên thất bại", status: 0 })
          );
        });

      closeModal();
    }
  };

  return (
    <>
      <p className=" text-sm mt-8 text-left leading-5 font-normal">{message}</p>

      <div className="modal-action mt-12">
        <button
          className=" text-rose-700 bg-rose-50 border border-rose-50 focus:outline-none hover:bg-rose-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 "
          onClick={() => closeModal()}
        >
          Huỷ
        </button>

        <button
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
          onClick={() => proceedWithYes()}
        >
          Xoá tài khoản
        </button>
      </div>
    </>
  );
}

export default ConfirmationDeleteUserModalBody;
