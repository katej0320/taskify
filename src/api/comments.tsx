import axiosInstance from "./axios";

export const getComments = async (
  teamId: string,
  cardId: number | null,
  size: number = 10,
  cursorId: number | null = null
) => {
  try {
    // 추가 로그로 teamId, cardId 값 확인
    console.log("💡 getComments 요청:", { teamId, cardId, size, cursorId });

    // cardId가 없으면 API 요청을 중단 (404 방지)
    if (!cardId) {
      console.error("cardId가 없습니다! 요청을 중단합니다.");
      return null;
    }

    const response = await axiosInstance.get(`/${teamId}/comments`, {
      params: { cardId, size, ...(cursorId ? { cursorId } : {}) },
    });

    console.log("댓글 목록 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 목록 조회 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};

export const createComment = async (
  teamId: string,
  cardId: number,
  content: string,
  columnId: number,
  dashboardId: number
) => {
  try {
    console.log("댓글 생성 API 요청 데이터:", {
      teamId,
      cardId,
      content,
      columnId,
      dashboardId,
    });

    const response = await axiosInstance.post(`/${teamId}/comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });

    console.log("댓글 생성 API 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 생성 API 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};

export const updateComment = async (
  teamId: string,
  commentId: number,
  content: string
) => {
  try {
    console.log("댓글 수정 요청 데이터:", { teamId, commentId, content });

    const response = await axiosInstance.put(
      `/${teamId}/comments/${commentId}`,
      { content }
    );

    console.log("댓글 수정 API 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 수정 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};

export const deleteComment = async (teamId: string, commentId: number) => {
  try {
    console.log("댓글 삭제 요청:", { teamId, commentId });

    const response = await axiosInstance.delete(
      `/${teamId}/comments/${commentId}`
    );

    console.log("댓글 삭제 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "댓글 삭제 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};
