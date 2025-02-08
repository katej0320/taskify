import axios from "axios";

// 댓글 목록 조회 (GET)
export const getComments = async (
  teamId: string,
  cardId: number,
  size = 10,
  cursorId?: number
) => {
  const response = await axios.get(`/teams/${teamId}/comments`, {
    params: { cardId, size, cursorId },
  });
  return response.data;
};

// 댓글 생성 (POST)
export const createComment = async (
  teamId: string,
  cardId: number,
  content: string,
  columnId: number,
  dashboardId: number
) => {
  const response = await axios.post(`/teams/${teamId}/comments`, {
    content,
    cardId,
    columnId,
    dashboardId,
  });
  return response.data;
};

// 댓글 수정 (PUT)
export const updateComment = async (
  teamId: string,
  commentId: number,
  content: string
) => {
  const response = await axios.put(`/teams/${teamId}/comments/${commentId}`, {
    content,
  });
  return response.data;
};

// 댓글 삭제 (DELETE)
export const deleteComment = async (teamId: string, commentId: number) => {
  const response = await axios.delete(`/teams/${teamId}/comments/${commentId}`);
  return response.data;
};
