import axios from "axios";

// 카드 상세 조회
export const getCardDetail = async (teamId: string, cardId: number) => {
  try {
    const response = await axios.get(`/${teamId}/card/${cardId}`);
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

// 카드 수정
export const updateCard = async (teamId: string, cardId: number, data: any) => {
  try {
    const response = await axios.put(`/${teamId}/card/${cardId}`);
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
    const response = await axios.delete(`/${teamId}/card/${cardId}`);
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
