import axiosInstance from "./axios";

export const getColumns = async (dashboardId: number) => {
  try {
    const response = await axiosInstance.get(`/columns`, {
      params: { dashboardId },
    });

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
