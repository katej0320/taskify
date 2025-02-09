import axios from "axios";

// 댓글 목록 조회 (GET)
export const getComments = async (
  teamId: string,
  cardId: number,
  size = 10,
  cursorId?: number
) => {
  try {
    const response = await axios.get(`/${teamId}/comments`, {
      params: { cardId, size, cursorId },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 목록 조회 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

// 댓글 생성 (POST)
export const createComment = async (
  teamId: string,
  cardId: number,
  content: string,
  columnId: number,
  dashboardId: number
) => {
  try {
    const response = await axios.post(`/${teamId}/comments`, {
      params: { content, cardId, columnId, dashboardId },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 생성 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

// 댓글 수정 (PUT)
export const updateComment = async (
  teamId: string,
  commentId: number,
  content: string
) => {
  try {
    const response = await axios.post(`/${teamId}/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 수정 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

// 댓글 삭제 (DELETE)
export const deleteComment = async (teamId: string, commentId: number) => {
  try {
    const response = await axios.delete(`/${teamId}/comments/${commentId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 삭제 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
