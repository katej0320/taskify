import { useState } from "react";
import SideBar from "@/src/components/sidebar/SideBar";
import NavBar from "@/src/components/nav/NavBar";
import styled from "styled-components";

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
import TaskCardModal from "@/src/components/modals/cards/TaskCardModal";

export default function Page({ dashboards }: { dashboards: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // 초깃값 null로 변경

  // ✅ 클릭한 카드 ID를 기반으로 모달을 열도록 수정
  const openModal = (cardId: number) => {
    console.log("✅ openModal 호출됨, cardId:", cardId); // 디버깅용 로그
    setSelectedCardId(cardId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardId(null); //  모달을 닫을 때 cardId 초기화
  };

  return (
    <>
      <SideBar />
      <NavBar />

      <Contents>
        <Container>
          {/* ✅ 카드 ID를 실제 존재하는 카드의 ID로 설정해야 함 */}
          <button onClick={() => openModal(11563)}> 할일 모달 열기</button>
          {/* ✅ 수정됨 */}
          {isModalOpen && selectedCardId && (
            <TaskCardModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onOpenEditModal={() =>
                console.log("할 일 수정 모달 열기(구현필요)")
              }
              teamId="12-1"
              cardId={selectedCardId} // 동적으로 cardId를 전달
            />
          )}
        </Container>
      </Contents>
    </>
  );
}
