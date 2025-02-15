import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SideBar from "@/src/components/sidebar/SideBar";
import NavBar from "@/src/components/nav/NavBar";
import Board from "@/src/components/dashboard/Board";
import TaskCardModal from "@/src/components/modals/cards/TaskCardModal";
import styles from "./index.module.scss";

export default function Page() {
  const router = useRouter();
  const { id } = router.query; // ✅ URL에서 id 가져오기

  // 새로운 dashboardId 적용
  const dashboardId: number | null =
    id && typeof id === "string"
      ? Number(id)
      : Array.isArray(id)
      ? Number(id[0])
      : null;

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 선택한 카드 데이터 (새로운 columnId, cardId 적용)
  const [selectedCard, setSelectedCard] = useState({
    teamId: "12-1",
    dashboardId: 13426, // ✅ 변환된 숫자 id 사용
    columnId: 45359, // ✅ 새로운 columnId 적용
    cardId: 11657, // ✅ 새로운 cardId 적용
  });

  // id 값이 변경될 때 selectedCard 업데이트
  useEffect(() => {
    if (dashboardId !== null) {
      setSelectedCard((prev) => ({
        ...prev,
        dashboardId: dashboardId,
      }));
    }
  }, [dashboardId]);

  return (
    <>
      <SideBar />
      <NavBar />
      <div className={styles.Contents}>
        <div className={styles.Container}>
          <Board />

          {/* 모달을 여는 버튼 추가 */}
          <button
            className={styles.ModalButton}
            onClick={() => setIsModalOpen(true)}
          >
            할 일 카드 모달 열기
          </button>

          {/* 모달 추가 (버튼을 누르면 활성화됨) */}
          {isModalOpen && selectedCard.dashboardId !== null && (
            <TaskCardModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onOpenEditModal={() => console.log("편집 모달 열기")}
              teamId={selectedCard.teamId}
              cardId={selectedCard.cardId}
              columnId={selectedCard.columnId}
              dashboardId={selectedCard.dashboardId} // URL에서 받은 id 사용
            />
          )}
        </div>
      </div>
    </>
  );
}
