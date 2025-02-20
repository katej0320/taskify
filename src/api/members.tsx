import axiosInstance from "./axios";

export const getMembers = async (dashboardId: number) => {
  try {
    console.log(
      "🟢 API 요청 URL:",
      axiosInstance.defaults.baseURL + "/members"
    );
    console.log("🟢 요청 파라미터: dashboardId =", dashboardId);

    const response = await axiosInstance.get("/members", {
      params: {
        dashboardId, // ✅ 필수 파라미터 추가
      },
    });

    console.log("🟢 getMembers 응답 데이터:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ getMembers API 호출 실패:",
      error?.response?.data || error
    );
    return { members: [] };
  }
};
