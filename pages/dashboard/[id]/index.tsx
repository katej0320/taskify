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
  const [selectedCardId, setSelectedCardId] = useState<number>(1);

  const openModal = (cardId: number) => {
    setSelectedCardId(cardId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SideBar />
      <NavBar />

      <Contents>
        <Container>
          <button onClick={() => openModal(1)}> 할일 모달 열기</button>
          {isModalOpen && selectedCardId}
          <TaskCardModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onOpenEditModal={() =>
              console.log("할 일 수정 모달 열기(구현필요)")
            }
            teamId="12-1"
            cardId={selectedCardId}
          />
        </Container>
      </Contents>
    </>
  );
}
