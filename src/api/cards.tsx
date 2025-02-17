import axiosInstance from "./axios";

export const getCardDetail = async (cardId: number) => {
  try {
    console.log(`카드 상세 조회 요청: cardId=${cardId}`);
    const response = await axiosInstance.get(`/cards/${cardId}`);
    console.log("카드 상세 조회 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "카드 상세 조회 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

export const updateCard = async (cardId: number, updateData: any) => {
  try {
    console.log(`카드 수정 요청: cardId=${cardId}, data=`, updateData);
    const response = await axiosInstance.put(`/cards/${cardId}`, updateData);
    console.log("카드 수정 응답:", response.data);
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

export const deleteCard = async (cardId: number) => {
  try {
    console.log(`카드 삭제 요청: cardId=${cardId}`);
    await axiosInstance.delete(`/cards/${cardId}`);
    console.log("카드 삭제 성공");
  } catch (error: any) {
    console.error(
      "카드 삭제 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
