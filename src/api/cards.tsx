import axiosInstance from "./axios";

// 카드 상세 조회
export const getCardDetail = async (teamId: string, cardId: number) => {
  try {
    // 실제 요청되는 URL 확인용 로그
    const requestUrl = `/${teamId}/cards/${cardId}`;
    console.log("📢 카드 상세 요청 URL:", requestUrl);

    const response = await axiosInstance.get(requestUrl);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 카드 상세 조회 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

// 카드 수정
export const updateCard = async (teamId: string, cardId: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/${teamId}/card/${cardId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "카드 수정 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

//카드 삭제
export const deleteCard = async (teamId: string, cardId: number) => {
  try {
    const response = await axiosInstance.delete(`/${teamId}/card/${cardId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "카드 삭제 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
