import React from "react";
import InputGroup from "./input/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";


export const ServicePolicySection = () => {
  const { servicesPolicy } = useSelector((state) => {
    return state.newHome;
  });
  //console.log('servicesPolicy:', servicesPolicy)
  
  const dispatch = useDispatch();

  const openRightDrawerCreatePolicy = () => {
    dispatch(
      openRightDrawer({
        header: "Thêm chính sách dịch vụ",
        content: "Vui lòng cập nhật thông tin dưới đây để thêm dịch vụ mới.",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_POLICY,
      })
    );
  };



  return (
    <>
      <div>
        <p className="text-lg leading-6 font-medium text-gray-900">
          Chính sách dịch vụ
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {servicesPolicy.map((item, index) => (
            <InputGroup
              key={index}
              index={index}
              lable={item.serviceName}
              options={item.units}
              item={item}
            />
          ))}
        </div>
        <button
          onClick={openRightDrawerCreatePolicy}
          className="mt-2 w-9 h-9 p-2 bg-white rounded-2xl shadow border border-zinc-400 justify-center items-center inline-flex hover:border-rose-700"
        >
          <PlusSmallIcon className="w-5 h-5 relative" />
        </button>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
        <InputArea lable="Ghi chú chi phí" updateFormValue={updateFormNote} />
      </div> */}
    </>
  );
};
