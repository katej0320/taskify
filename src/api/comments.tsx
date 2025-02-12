import axiosInstance from "./axiosTest";

// 댓글 목록 조회 (GET)
export const getComments = async (
  teamId: string,
  cardId: number,
  size: number = 10,
  cursorId: number | null = null //기본값 설정
) => {
  try {
    const response = await axiosInstance.get(`/${teamId}/comments`, {
      params: {
        cardId,
        size,
        ...(cursorId ? { cursorId } : {}), //cursorId가 있을 때만 포함
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 목록 조회 실패:",
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
    console.log("🛠 댓글 생성 API 요청 데이터:", {
      teamId,
      cardId,
      content,
      columnId,
      dashboardId,
    }); // ✅ API 요청 데이터 확인용 콘솔

    const response = await axiosInstance.post(`/${teamId}/comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });

    console.log("✅ 댓글 생성 API 응답:", response.data); // ✅ API 응답 확인
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 생성 API 실패:",
      error.response?.status,
      error.response?.data
    ); // ❌ API 요청 실패 확인
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
    // 🔍 요청 데이터 확인 로그 추가
    console.log("🛠 댓글 수정 요청 데이터:", { teamId, commentId, content });

    const response = await axiosInstance.put(
      `/${teamId}/comments/${commentId}`,
      {
        content,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 수정 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};

// 댓글 삭제 (DELETE)
export const deleteComment = async (teamId: string, commentId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/${teamId}/comments/${commentId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ 댓글 삭제 실패:",
      error.response?.status,
      error.response?.data
    );
    throw error;
  }
};
