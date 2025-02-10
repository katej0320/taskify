import { deleteCard, getCardDetail } from "@/src/api/cards";
import { createComment, deleteComment, getComments } from "@/src/api/comments";
import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";

const closeIcon = "/icons/close.svg";
const kebabIcon = "/icons/kebab.svg";

interface TaskCardModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 함수
  onOpenEditModal: () => void; // 할일 수정 모달 여는 함수
  teamId: string; // 팀 ID
  cardId: number; // 카드 ID
}

const TaskCardModal: React.FC<TaskCardModalProps> = ({
  isOpen,
  onClose,
  onOpenEditModal,
  teamId,
  cardId,
}) => {
  console.log("📢 TaskCardModal 실행됨! Props 확인:", {
    isOpen,
    cardId,
    teamId,
  }); // ✅ 모달 실행될 때 확인

  const [cardData, setCardData] = useState<any>(null); // 카드 데이터 상태
  const [comments, setComments] = useState<any[]>([]); // 댓글목록 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 (데이터 가져오는 중 표시)
  const [newComment, setNewComment] = useState<string>(""); // 새로운 댓글 입력 상태
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); //드롭다운 상태
  const [isClient, setIsClient] = useState(false); // 클라이언트에서만 실행

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 마운트된 후에 클라이언트에서 실행됨
  }, []);

  //모달이 열릴 때 카드 상세 정보와 댓글 목록 가져오기
  useEffect(() => {
    console.log(
      "📢 TaskCardModal useEffect 실행됨! isOpen:",
      isOpen,
      "cardId:",
      cardId
    ); // ✅ useEffect 실행 확인

    if (isOpen) {
      setLoading(true);
      console.log("🚀 API 요청 보냄: getCardDetail(", teamId, cardId, ")"); // ✅ API 요청 URL 확인

      getCardDetail(teamId, cardId)
        .then((data) => {
          console.log("✅ 카드 데이터 가져오기 성공:", data); // ✅ 카드 데이터 정상 수신 확인
          setCardData(data);
        })
        .catch((error) => {
          console.error(
            "❌ 카드 데이터 가져오기 실패:",
            error.response?.status,
            error.response?.data
          ); // ❌ API 요청 실패 시 확인
        });

      getComments(teamId, cardId)
        .then((data) => {
          console.log("✅ 댓글 목록 가져오기 성공:", data); // ✅ 댓글 데이터 정상 수신 확인
          setComments(data.comments);
        })
        .catch((error) => {
          console.error(
            "❌ 댓글 목록 가져오기 실패:",
            error.response?.status,
            error.response?.data
          ); // ❌ 댓글 API 요청 실패 확인
        });
      setLoading(false);
    }
  }, [isOpen, teamId, cardId]);

  if (!isClient) {
    return null; // SSR에서는 아무것도 렌더링하지 않음
  }

  // 카드 삭제 함수
  const handleDelete = () => {
    deleteCard(teamId, cardId).then(() => {
      onClose(); // 삭제 후 모달 닫기
    });
  };

  // 새로운 댓글 추가 함수
  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("🛠 댓글 생성 요청 데이터:", {
        teamId,
        cardId,
        content: newComment,
        columnId: 0,
        dashboardId: 0,
      }); // ✅ 댓글 요청 데이터 확인용 콘솔

      createComment(teamId, cardId, newComment, 0, 0)
        .then((newData) => {
          console.log("✅ 댓글 생성 성공 응답 데이터:", newData); // ✅ API 응답 확인
          setComments([...comments, newData]); // 새 댓글을 목록에 추가
          setNewComment(""); // 입력 필드 초기화
        })
        .catch((error) => {
          console.error(
            "❌ 댓글 생성 실패:",
            error.response?.status,
            error.response?.data
          ); // ❌ API 요청 실패 시 확인
        });
    }
  };

  // 댓글 삭제 함수
  const handleDeleteComment = (commentId: number) => {
    deleteComment(teamId, commentId).then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId)); //삭제된 댓글 제외하고 목록 갱신
    });
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      {/* 카드제목 표시 */}
      <h2>{cardData?.title || "카드상세"}</h2>
      {/* 카드 설명 */}
      <p>{cardData?.description}</p>

      {/* 담당자 및 마감일 정보 */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <p>
          <strong>담당자:</strong> {cardData?.assignee?.nickname || "없음"}
        </p>
        <p>
          <strong>마감일:</strong> {cardData?.dueDate || "설정되지 않음"}
        </p>
      </div>

      {/* 드롭다운 메뉴 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 케밥 메뉴 */}
        <img
          src={kebabIcon}
          alt="메뉴"
          style={{ width: "24px", cursor: "pointer" }}
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "0",
              background: "white",
              border: "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <button onClick={onOpenEditModal}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        )}
        {/* 닫기 버튼 - 모달 닫기 기능 */}
        <img
          src={closeIcon}
          alt="닫기"
          style={{ width: "24px", cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      {/* 댓글 목록 표시 */}
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.content} - {comment.author.nickname}
            <button onClick={() => handleDeleteComment(comment.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      {/* 새로운 댓글 입력 */}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글 추가"
      />
      <button onClick={handleAddComment}>등록</button>
    </CustomModal>
  );
};

export default TaskCardModal;
