import { useEffect, useState } from "react";
import { getComments, deleteComment } from "@/src/api/comments";
import styled from "styled-components";

interface TaskCommentsProps {
  cardId: number;
  enableInfiniteScroll?: boolean;
  comments: any[]; // ✅ 부모 컴포넌트(TaskCardModal)에서 관리하는 댓글 상태를 받음
  setComments: React.Dispatch<React.SetStateAction<any[]>>; // ✅ 상태 업데이트 함수 받음
}

const TaskComments: React.FC<TaskCommentsProps> = ({
  cardId,
  enableInfiniteScroll = true,
  comments,
  setComments, // ✅ 부모에서 내려준 상태 업데이트 함수
}) => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (cardId) fetchComments(true);
  }, [cardId]);

  const fetchComments = async (reset = false) => {
    if (!cardId || loading || (!reset && !hasMore)) return;

    setLoading(true);
    try {
      const response = await getComments(cardId, 10, reset ? null : cursorId);
      if (response) {
        setComments((prev) =>
          reset ? response.comments : [...prev, ...response.comments]
        );
        setCursorId(response.nextCursor || null);
        setHasMore(response.hasMore);
      }
    } catch (error) {
      console.error("❌ 댓글 조회 실패:", error);
    }
    setLoading(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId)); // ✅ 즉시 UI 업데이트
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
  max-height: 200px;
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
