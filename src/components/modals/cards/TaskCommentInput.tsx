import { useState } from "react";
import styled from "styled-components";
import { createComment } from "@/src/api/comments";

interface TaskCommentInputProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
  onCommentAdded: () => void;
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskCommentInput: React.FC<TaskCommentInputProps> = ({
  cardId,
  columnId,
  dashboardId,
  onCommentAdded,
  setComments,
}) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = async () => {
    const trimmedComment = newComment.trim();
    if (!trimmedComment) {
      console.error("❌ 댓글이 비어있음. API 요청 취소");
      return;
    }

    try {
      console.log("🔥 댓글 추가 요청:", {
        content: trimmedComment,
        cardId,
        columnId,
        dashboardId,
      });

      const newCommentData = await createComment(
        cardId,
        trimmedComment,
        columnId,
        dashboardId
      );

      console.log("✅ 댓글 추가 성공!", newCommentData);

      setNewComment(""); // 입력창 초기화

      // ✅ 최신 댓글을 맨 위에 추가 (최신 댓글이 위에 보이도록)
      setComments((prevComments) => [newCommentData, ...prevComments]);

      // ✅ 최신 목록을 다시 불러오기 (서버 기준 동기화)
      await onCommentAdded();
    } catch (error) {
      console.error("❌ 댓글 추가 실패:", error);
    }
  };

  return (
    <>
      <CommentLabel>댓글</CommentLabel>
      <CommentInputContainer>
        <CommentInput
          placeholder="댓글 작성하기"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SubmitButton onClick={handleAddComment} disabled={!newComment.trim()}>
          입력
        </SubmitButton>
      </CommentInputContainer>
    </>
  );
};

export default TaskCommentInput;

// ✅ 스타일 유지
const CommentInputContainer = styled.div`
  position: relative;

  height: 110px; /* 높이 추가 조정 */
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const CommentLabel = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333236;
  margin-top: 16px;
  margin-bottom: 4px;
`;

const CommentInput = styled.textarea`
  position: absolute;
  top: 16px;
  left: 16px;
  width: calc(100% - 115px); /* 입력 버튼이 시작하기 전까지 */
  height: calc(100% - 32px); /* 높이를 상단-하단 간격 동일하게 조정 */
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  color: #333236; /* 댓글 작성 시 글자 색상 변경 */
  background: transparent;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  overflow-y: auto;
  resize: none; /* 크기 조절 기능 제거 */
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 83px;
  height: 32.23px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  font-size: 12px;
  font-weight: 500;
  color: #5534da;
  background: white;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  transition: background-color 0.2s ease-in-out;
  &:hover:enabled {
    background-color: #ede9fe;
  }
  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`;
