import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api lấy thông tin chi tiết nhà
export const FetchExportContract = createAsyncThunk(
  "FetchExportContract",
  async (contractId) => {
    try {
      // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
      // const { role } = useSelector(state => state.user)
      const tokenJWT = localStorage.getItem("token");
      //console.log('tokenJWT:', tokenJWT)
      const url = `/Contracts/get-contract/${contractId}`;

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
