import axiosInstance from "./axiosTest";

// ✅ 사용자 정보 가져오기
export const getUserInfo = async (teamId: string) => {
  try {
    const response = await axiosInstance.get(`/${teamId}/users/me`);
    return response.data;
  } catch (error) {
    console.error("❌ 사용자 정보 가져오기 실패:", error);
    throw error;
  }
};
