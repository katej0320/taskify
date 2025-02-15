import { useEffect, useState } from "react";
import axiosInstance from "@/src/api/axios"; // 수정된 부분
import styled from "styled-components";

interface TaskCommentsProps {
  teamId: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
  enableInfiniteScroll?: boolean;
}

const TaskComments: React.FC<TaskCommentsProps> = ({
  teamId,
  cardId,
  columnId,
  dashboardId,
  enableInfiniteScroll = true,
}) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchComments();
  }, [teamId, cardId]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/teams/${teamId}/cards/${cardId}/comments`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("❌ 댓글 조회 실패:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axiosInstance.delete(`/teams/${teamId}/comments/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
    }
  };

  return (
    <CommentList>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAuthor>{comment.author.nickname}</CommentAuthor>
            <CommentContent>{comment.content}</CommentContent>
            <DeleteButton onClick={() => handleDeleteComment(comment.id)}>
              삭제
            </DeleteButton>
          </CommentItem>
        ))
      ) : (
        <NoComments>아직 댓글이 없습니다.</NoComments>
      )}
    </CommentList>
  );
};

export default TaskComments;

const CommentList = styled.ul`
  width: 420px;
  max-height: 72px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #d9d9d9;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
`;

const CommentContent = styled.div`
  flex-grow: 1;
  margin-left: 8px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

const NoComments = styled.p`
  text-align: center;
  color: #999;
`;
