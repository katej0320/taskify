import axiosInstance from "./axios";

// 카드 상세 조회
export const getCardDetail = async (teamId: string, cardId: number) => {
  try {
    const response = await axiosInstance.get(`/${teamId}/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("카드 상세 조회 실패:", error);
    throw error;
  }
};

// 카드 수정
export const updateCard = async (
  teamId: string,
  cardId: number,
  updateData: any
) => {
  try {
    const response = await axiosInstance.put(
      `/${teamId}/cards/${cardId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("카드 수정 실패:", error);
    throw error;
  }
};

//카드 삭제
export const deleteCard = async (teamId: string, cardId: number) => {
  try {
    await axiosInstance.delete(`/${teamId}/cards/${cardId}`);
  } catch (error) {
    console.error("카드 삭제 실패:", error);
    throw error;
  }
};
