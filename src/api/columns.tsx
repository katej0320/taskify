import axiosInstance from "./axiosTest";

// ✅ 특정 대시보드의 컬럼 목록 조회
export const getColumns = async (teamId: string, dashboardId: number) => {
  try {
    console.log(
      `📢 컬럼 목록 조회 요청: /${teamId}/columns?dashboardId=${dashboardId}`
    );
    const response = await axiosInstance.get(`/${teamId}/columns`, {
      params: { dashboardId }, // ✅ 대시보드 ID를 쿼리로 전달
    });
    return response.data.data; // ✅ API 응답에서 컬럼 데이터 반환
  } catch (error: any) {
    console.error(
      "❌ 컬럼 목록 조회 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
