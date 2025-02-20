import { useEffect, useState, useRef } from "react";
import { getComments, deleteComment, updateComment } from "@/src/api/comments";
import styled from "styled-components";

interface TaskCommentsProps {
  cardId: number;
  comments: any[];
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
  onOpenEditModal?: () => void;
}

const TaskComments: React.FC<TaskCommentsProps> = ({
  cardId,
  comments,
  setComments,
  onOpenEditModal,
}) => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (cardId) fetchComments(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  useEffect(() => {
    if (!loading && hasMore && comments.length > 0) {
      const trigger = document.getElementById("scroll-trigger");
      if (trigger) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            fetchComments();
          }
        });
        observer.current.observe(trigger);
      }
    }
    return () => observer.current?.disconnect();
  }, [comments]);

  const fetchComments = async (reset = false) => {
    if (!cardId || loading || (!reset && !hasMore)) return;
    setLoading(true);
    try {
      const response = await getComments(cardId, 2, reset ? null : cursorId);
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

  const handleEditClick = (comment: any) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editContent.trim()) return;
    try {
      await updateComment(commentId, editContent);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editContent }
            : comment
        )
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error("❌ 댓글 수정 실패:", error);
    }
  };

  const handleDeleteClick = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
    }
  };

  return (
    <CommentListWrapper>
      <CommentList>
        {comments.map((comment) => (
          <TaskCommentItem key={comment.id}>
            <ProfileImage src={comment.author.profileImageUrl} alt="프로필" />
            <CommentContentWrapper>
              <CommentHeader>
                <CommentMeta>
                  <CommentAuthor>{comment.author.nickname}</CommentAuthor>
                  <CommentTime>
                    {new Date(comment.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CommentTime>
                </CommentMeta>
                <DropdownContainer>
                  <DropdownIcon
                    src="/icons/kebab.svg"
                    alt="메뉴"
                    width={16}
                    height={16}
                    onClick={() =>
                      setOpenDropdownId(
                        openDropdownId === comment.id ? null : comment.id
                      )
                    }
                  />
                  {openDropdownId === comment.id && (
                    <DropdownMenu ref={dropdownRef}>
                      {editingCommentId === comment.id ? (
                        <DropdownItem
                          onClick={() => handleUpdateComment(comment.id)}
                        >
                          저장
                        </DropdownItem>
                      ) : (
                        <DropdownItem onClick={() => handleEditClick(comment)}>
                          수정
                        </DropdownItem>
                      )}
                      <DropdownItem
                        onClick={() => handleDeleteClick(comment.id)}
                      >
                        삭제
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </DropdownContainer>
              </CommentHeader>
              {editingCommentId === comment.id ? (
                <EditInput
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={() => handleUpdateComment(comment.id)}
                />
              ) : (
                <TaskCommentText>{comment.content}</TaskCommentText>
              )}
            </CommentContentWrapper>
          </TaskCommentItem>
        ))}
        <div
          id="scroll-trigger"
          style={{ height: "10px", visibility: "hidden" }}
        />
      </CommentList>
    </CommentListWrapper>
  );
};

export default TaskComments;

const EditInput = styled.textarea`
  width: 80%;
  min-height: 60px;
  max-height: 100px;
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  overflow-y: auto;
  word-break: break-word;
  white-space: pre-wrap;
  background: white;
`;

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentList = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
`;

const TaskCommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid #eee;
  width: 100%;
  min-height: 60px;

  word-break: break-word;
  white-space: pre-wrap;
  margin-top: 12px;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const CommentTime = styled.span`
  font-size: 14px;
  color: #999;
`;

const TaskCommentText = styled.p`
  font-size: 16px;
  color: #333;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  min-height: initial;
  padding: 2px 0;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownIcon = styled.img`
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;

  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px;
  text-align: center;
  width: 80px;
  height: 60px;
  margin: 8px;
`;

const DropdownItem = styled.li`
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 8px;
  &:hover {
    background: #f1effd;
    color: #5534da;
  }
`;
const ProfileImage = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;
