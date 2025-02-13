import axios from "axios";

const TEST_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTE5NSwidGVhbUlkIjoiMTItMSIsImlhdCI6MTczOTI2NDI4MSwiaXNzIjoic3AtdGFza2lmeSJ9.DKRnIN43t9-eww231-Qdw97hxZwJ0OAAm-3yuwIPkRU";

// ✅ 서버사이드에서 `localStorage` 접근 방지
const getToken = () => {
  if (typeof window === "undefined") {
    console.warn(
      "⚠️ 서버 환경에서는 localStorage를 사용할 수 없습니다. 기본 토큰을 반환합니다."
    );
    return TEST_ACCESS_TOKEN;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("⚠️ 토큰이 존재하지 않습니다! 기본 토큰 사용.");
  }

  console.log("✅ 사용 중인 토큰:", token || TEST_ACCESS_TOKEN);
  return token || TEST_ACCESS_TOKEN;
};

// ✅ Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`, // ✅ 항상 최신 토큰 사용
  },
});

export default axiosInstance;
