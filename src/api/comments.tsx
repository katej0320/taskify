import axiosInstance from "./axios";

export const getComments = async (
  cardId: number | null,
  size: number = 10,
  cursorId: number | null = null
) => {
  try {
    console.log("💡 getComments 요청:", { cardId, size, cursorId });

    if (!cardId) {
      console.error("cardId가 없습니다! 요청 중단.");
      return null;
    }

    const response = await axiosInstance.get(`/comments`, {
      params: { cardId, size, ...(cursorId ? { cursorId } : {}) },
    });

    console.log("✅ 댓글 목록 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 목록 조회 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};

export const createComment = async (
  cardId: number,
  content: string,
  columnId: number,
  dashboardId: number
) => {
  try {
    console.log("🔥 API 요청 데이터:", {
      content,
      cardId,
      columnId,
      dashboardId,
    });

    const response = await axiosInstance.post(`/comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });

    console.log("✅ 댓글 생성 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 생성 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};

export const updateComment = async (commentId: number, content: string) => {
  try {
    console.log("🔄 댓글 수정 요청 데이터:", { commentId, content });

    const response = await axiosInstance.put(`/comments/${commentId}`, {
      content,
    });

    console.log("✅ 댓글 수정 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 수정 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    console.log("🗑️ 댓글 삭제 요청:", { commentId });

    const response = await axiosInstance.delete(`/comments/${commentId}`);

    console.log("✅ 댓글 삭제 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 삭제 실패:",
      error.response?.status,
      error.response?.data?.message || error.response?.data
    );
    throw error;
  }
};
