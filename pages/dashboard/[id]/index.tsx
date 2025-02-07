import { useState } from "react";
import CustomModal from "@/src/components/modal/CustomModal";
import SideBar from "@/src/components/sidebar/SideBar";
import NavBar from "@/src/components/nav/NavBar";
import { getDashboard } from "@/src/api/api";

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

  const openModal = () => setIsModalOpen(true); // 모달을 여는 함수
  const closeModal = () => setIsModalOpen(false); // 모달을 닫는 함수

  return (
    <>
      <SideBar dashboards={dashboards} />
      <NavBar />

      <button onClick={openModal}>모달 열기</button>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </CustomModal>
    </>
  );
}
