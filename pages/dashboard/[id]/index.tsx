import { useState } from "react";
import SideBar from "@/src/components/sidebar/SideBar";
import NavBar from "@/src/components/nav/NavBar";
import { getDashboard } from "@/src/api/api";
import TaskCardModal from "@/src/components/modals/TaskCardModal";

export async function getServerSideProps() {
  try {
    const { dashboards = [] } = await getDashboard();

    return {
      props: { dashboards },
    };
  } catch (error) {
    console.error("Failed to fetch dashboard:", error);
    return {
      props: { dashboards: [] },
    };
  }
}

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
      <SideBar dashboards={dashboards} />
      <NavBar />
      {/* 임시 버튼: TaskCardModal 열기 */}
      <button onClick={() => openModal(1)}> 할일 모달 열기</button>

      {/* TaskCardModal 추가 */}
      {isModalOpen && selectedCardId}
      <TaskCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onOpenEditModal={() => console.log("할 일 수정 모달 열기(구현필요)")}
        teamId="12-1"
        cardId={selectedCardId}
      />
    </>
  );
}
