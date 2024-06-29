import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import userSlice from "../features/user/userSlice";
import roleSlice from "./role";
import newHomeSlice from "../features/createHome/components/NewHomeSlice";
import homesSlice from "../features/homeManagement/homesSlice";
import roomsSlice from "../features/common/roomsSlice";
import depositRoomSlice from "../features/roomManagement/components/depositRoom/depositRoomSlice";
import contractRoomSlice from "../features/roomManagement/components/contractRoom/contractRoomSlice";
import addCustomerSlice from "../features/roomManagement/components/addCustomer/addCustomerSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  user: userSlice,
  role: roleSlice,
  newHome: newHomeSlice,
  homes: homesSlice,
  rooms: roomsSlice,
  depositRoomSlice: depositRoomSlice,
  contractRoomSlice: contractRoomSlice,
  addCustomerSlice: addCustomerSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
