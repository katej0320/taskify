import { useState } from "react";
import SideBar from "@/src/components/sidebar/SideBar";
import NavBar from "@/src/components/nav/NavBar";
import styled from "styled-components";
import TaskCardModal from "@/src/components/modals/cards/TaskCardModal";

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  margin-left: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  flex-grow: 1;
  gap: 20px;
`;

export default function Page({ dashboards }: { dashboards: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null); // ✅ 카드 전체 정보를 저장

  // ✅ 클릭한 카드 정보를 저장하도록 수정
  const openModal = (card: any) => {
    console.log("✅ openModal 호출됨, card 정보:", card); // 디버깅용 로그
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null); // 모달을 닫을 때 초기화
  };

  return (
    <>
      <SideBar />
      <NavBar />

      <Contents>
        <Container>
          {/* ✅ 카드 정보를 직접 전달해야 함 */}
          <button
            onClick={() =>
              openModal({ cardId: 11575, columnId: 44887, dashboardId: 13289 })
            }
          >
            할일 모달 열기
          </button>

          {/* ✅ 수정됨 */}
          {isModalOpen && selectedCard && (
            <TaskCardModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onOpenEditModal={() =>
                console.log("할 일 수정 모달 열기(구현필요)")
              }
              teamId="12-1"
              cardId={selectedCard.cardId} // 동적으로 cardId를 전달
              columnId={selectedCard.columnId} // ✅ columnId 추가
              dashboardId={selectedCard.dashboardId} // ✅ dashboardId 추가
            />
          )}
        </Container>
      </Contents>
    </>
  );
}
