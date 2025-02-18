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

export const updateCard = async (
  cardId: number,
  data: {
    columnId: number;
    assigneeUserId: number | null;
    title: string;
    description: string;
    dueDate: string | null;
    tags: string[];
    imageUrl?: string;
  }
) => {
  try {
    const response = await axios.put(`/cards/${cardId}`, data);
    return response.data;
  } catch (error) {
    console.error("❌ 카드 수정 요청 실패:", error);
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
