import { createSlice } from "@reduxjs/toolkit";

export const addCustomerSlice = createSlice({
  name: "addCustomerSlice",
  initialState: {
    infoAddCustomerSlice: [
      {
        roomId: 0,
        // customerId:1,
        fullName: "",
        phoneNumber: "",
        identification: "",
        email: "dotruong@gmail.com",
        vehicles: [
          {
            // id:1,
            type: "",
            licensePlates: "",
            image: "",
          },
        ],
      },
    ],
  },

  reducers: {
    updateAddCustomerSlice: (state, action) => {
      state.infoAddCustomerSlice = action.payload;
    },
  },

  extraReducers: {},
});

export const { updateAddCustomerSlice } = addCustomerSlice.actions;

export default addCustomerSlice.reducer;
