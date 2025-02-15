import { useState } from "react";
import styled from "styled-components";
import { createComment } from "@/src/api/comments";

interface TaskCommentInputProps {
  teamId: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
  onCommentAdded: () => void; // 댓글 추가 후 목록 새로고침 함수
}

const TaskCommentInput: React.FC<TaskCommentInputProps> = ({
  teamId,
  cardId,
  columnId,
  dashboardId,
  onCommentAdded,
}) => {
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await createComment(teamId, cardId, newComment, columnId, dashboardId);
      setNewComment("");
      onCommentAdded(); // 댓글 추가 후 목록 새로고침
    } catch (error) {
      console.error("❌ 댓글 추가 실패:", error);
    }
  };

  return (
    <CommentInputContainer>
      <CommentTitle>댓글 작성</CommentTitle>
      <CommentInput
        placeholder="댓글 작성하기"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <SubmitButton onClick={handleAddComment} disabled={!newComment.trim()}>
        입력
      </SubmitButton>
    </CommentInputContainer>
  );
};

export default TaskCommentInput;

const CommentInputContainer = styled.div`
  position: relative;
  width: 420px;
  height: 72px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #ffffff;
  padding: 12px;
`;

const CommentTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  color: #333;
  padding: 4px;
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 12px;
  width: 60px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  font-size: 12px;
  font-weight: 500;
  color: #5534da;
  background: white;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`;
