import axios from "axios";

// 카드 상세 조회
export const getCardDetail = async (teamId: string, cardId: number) => {
  const response = await axios.get(`/team/${teamId}/cards/${cardId}`);
  return response.data;
};

// 카드 수정
export const updateCard = async (teamId: string, cardId: number, data: any) => {
  const response = await axios.put(`/teams/${teamId}/cards/${cardId}`, data);
  return response.data;
};

//카드 삭제
export const deleteCard = async (teamId: string, cardId: number) => {
  const response = await axios.delete(`/teams/${teamId}/cards/${cardId}`);
  return response.data;
};
