import axiosInstance from "./axios";

export const getColumns = async (dashboardId: number) => {
  try {
    console.log(`컬럼 목록 조회 요청: /columns?dashboardId=${dashboardId}`);

    const response = await axiosInstance.get(`/columns`, {
      params: { dashboardId },
    });

    console.log("컬럼 목록 조회 응답:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "컬럼 목록 조회 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
