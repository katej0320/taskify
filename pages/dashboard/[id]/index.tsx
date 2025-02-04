import { useState } from "react";
import CustomModal from "@/src/components/modal/CustomModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true); // 모달을 여는 함수
  const closeModal = () => setIsModalOpen(false); // 모달을 닫는 함수

  return (
    <>
      <div>dashboard상세</div>
      <button onClick={openModal}>모달 열기</button>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </CustomModal>
    </>
  );
}
