import { useState } from "react";
import CustomModal from "@/src/components/modal/CustomModal";
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
export default function Page({ dashboards }: { dashboards: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true); // 모달을 여는 함수
  const closeModal = () => setIsModalOpen(false); // 모달을 닫는 함수

  return (
    <>
      <SideBar />
      <NavBar />
      <Contents>
        <Container>
          <button onClick={openModal}>모달 열기</button>
          <CustomModal isOpen={isModalOpen} onClose={closeModal}>
            <h2>모달 제목</h2>
            <p>모달 내용</p>
          </CustomModal>
        </Container>
      </Contents>
    </>
  );
}
