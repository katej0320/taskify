import { useEffect, useState } from "react";
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "@/src/api/comments";

interface TaskCommentsProps {
  teamId: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const TaskComments: React.FC<TaskCommentsProps> = ({
  teamId,
  cardId,
  columnId,
  dashboardId,
}) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>("");

  useEffect(() => {
    getComments(teamId, cardId, 10, null)
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => console.error("댓글 조회 실패:", error));
  }, [teamId, cardId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createComment(teamId, cardId, newComment, columnId, dashboardId);
      setNewComment("");

      // 최신 댓글 목록 불러오기
      const updatedComments = await getComments(teamId, cardId, 10, null);
      setComments(updatedComments.comments);
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };

  return (
    <div className="comments-section">
      <textarea
        className="comment-input"
        placeholder="댓글 작성하기"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="comment-submit-btn"
        onClick={handleAddComment}
        disabled={!newComment.trim()}
      >
        입력
      </button>
      <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-author">{comment.author.nickname}</div>
              <div className="comment-content">{comment.content}</div>
              <button onClick={() => deleteComment(teamId, comment.id)}>
                삭제
              </button>
            </li>
          ))
        ) : (
          <p className="no-comments">아직 댓글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskComments;
