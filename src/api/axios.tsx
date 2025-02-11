import axios from "axios";

const TEST_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTE5NSwidGVhbUlkIjoiMTItMSIsImlhdCI6MTczOTI2NDI4MSwiaXNzIjoic3AtdGFza2lmeSJ9.DKRnIN43t9-eww231-Qdw97hxZwJ0OAAm-3yuwIPkRU";

const getToken = () =>
  // ✅ 항상 하드코딩된 토큰을 반환 (로그인 기능이 없으므로 sessionStorage 사용 안 함)
  TEST_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app", // ✅ API baseURL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`, // ✅ 항상 하드코딩된 토큰을 사용
  },
});

export default axiosInstance;
