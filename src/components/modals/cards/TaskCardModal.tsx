import { deleteCard, getCardDetail } from "@/src/api/cards";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/src/api/comments";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";

const closeIcon = "/icons/close.svg";
const kebabIcon = "/icons/kebab.svg";

interface TaskCardModalProps {
  isOpen: boolean; // 모달이 열려 있는지 여부
  onClose: () => void; // 모달을 닫는 함수
  onOpenEditModal: () => void; // 수정 모달을 여는 함수
  teamId: string; // 팀 ID
  cardId: number; // 카드 ID
  columnId: number; // 칼럼 ID (댓글 생성 시 필요)
  dashboardId: number; // 대시보드 ID (댓글 생성 시 필요)
}

const TaskCardModal: React.FC<TaskCardModalProps> = ({
  isOpen,
  onClose,
  onOpenEditModal,
  teamId,
  cardId,
  columnId,
  dashboardId,
}) => {
  const [cardData, setCardData] = useState<any>(null); // 카드 상세 정보
  const [comments, setComments] = useState<any[]>([]); // 댓글 목록
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [newComment, setNewComment] = useState<string>(""); // 새로운 댓글 입력값
  const [editingComment, setEditingComment] = useState<number | null>(null); // 수정 중인 댓글 ID
  const [editedCommentText, setEditedCommentText] = useState<string>(""); // 수정할 댓글 내용
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // 드롭다운 메뉴 상태

  // 모달이 열릴 때 카드 상세 정보와 댓글을 가져옴
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      Promise.all([
        getCardDetail(teamId, cardId).then((data) => setCardData(data)),
        getComments(teamId, cardId, 10, null).then((data) =>
          setComments(data.comments)
        ),
      ])
        .catch((error) => console.error("❌ 데이터 가져오기 실패:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, teamId, cardId]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button className="absolute top-2 right-2" onClick={onClose}>
          <img src={closeIcon} alt="닫기" />
        </button>

        {/* 드롭다운 메뉴 */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={kebabIcon} alt="메뉴" />
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <button onClick={onOpenEditModal}>수정하기</button>
              </li>
              <li>
                <button onClick={() => deleteCard(teamId, cardId)}>
                  삭제하기
                </button>
              </li>
            </ul>
          )}
        </div>

        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <>
            {/* 카드 제목 */}
            <h2 className="task-title">{cardData?.title || "카드 상세"}</h2>

            {/* 컬럼명 */}
            <p className="task-column">
              컬럼: {cardData?.columnName || "없음"}
            </p>

            {/* 태그 목록 */}
            {cardData?.tags && cardData.tags.length > 0 && (
              <div className="task-tags">
                {cardData.tags.map((tag: string) => (
                  <span key={tag} className="task-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 담당자 및 마감일 */}
            <div className="task-info">
              <div className="task-assignee">
                담당자: {cardData?.assignee || "미정"}
              </div>
              <div className="taks-deadline">
                마감일: {cardData?.dueDate || "없음"}
              </div>
            </div>

            {/* 카드 설명 */}
            <p className="task-description">{cardData?.description}</p>

            {/* 댓글 섹션 */}
            <h3 className="comments-ttitle">댓글</h3>
            <ul className="comments-list">
              {comments.map((comment) => (
                <li key={comment.id} className="comment-item">
                  <span className="comment-author">
                    {comment.author.nickname}
                  </span>
                  {editingComment === comment.id ? (
                    <input
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                    />
                  ) : (
                    <p className="comment-content">{comment.content}</p>
                  )}
                  {editingComment === comment.id ? (
                    <button
                      onClick={() =>
                        updateComment(teamId, comment.id, editedCommentText)
                      }
                    >
                      저장
                    </button>
                  ) : (
                    <button onClick={() => setEditingComment(comment.id)}>
                      수정
                    </button>
                  )}
                  <button onClick={() => deleteComment(teamId, comment.id)}>
                    삭제
                  </button>
                </li>
              ))}
            </ul>

            {/* 댓글 입력창 */}
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={() =>
                createComment(teamId, cardId, newComment, columnId, dashboardId)
              }
              disabled={!newComment.trim()}
            >
              입력
            </button>
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default TaskCardModal;
