import { createSlice } from '@reduxjs/toolkit'

export const roleSlice = createSlice({
    name: 'user',
    initialState: {
        roles:[
            { name: "Admin", value: "Admin" },
            { name: "Chủ nhà", value: "HouseHolder" },
            { name: "Quản lý tổng", value: "MainManager" },
            { name: "Quản lý", value: "Manager" },
        ]
    },
    reducers: {
    }
})

export const { setUser } = roleSlice.actions
export default roleSlice.reducer