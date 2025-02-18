import axiosInstance from "./axios";

export const getCardDetail = async (cardId: number) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`);
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
<<<<<<< HEAD
    const response = await axios.put(`/cards/${cardId}`, data);
=======
    const response = await axiosInstance.put(`/cards/${cardId}`, updateData);
>>>>>>> 2ec5fcf3172cec89502966b72ea4f1163dcb4120
    return response.data;
  } catch (error) {
    console.error("❌ 카드 수정 요청 실패:", error);
    throw error;
  }
};

export const deleteCard = async (cardId: number) => {
  try {
    await axiosInstance.delete(`/cards/${cardId}`);
  } catch (error: any) {
    console.error(
      "카드 삭제 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
