import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api lấy thông tin chi tiết nhà
export const FetchDetailsRoom = createAsyncThunk(
  "FetchDetailsRoom",
  async (roomId) => {
    try {
      // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
      // const { role } = useSelector(state => state.user)
      const tokenJWT = localStorage.getItem("token");
      //console.log('tokenJWT:', tokenJWT)
      const url = `/rooms/get-room-details/${roomId}`;

      const response = await axios.get(url, {
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${tokenJWT}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
