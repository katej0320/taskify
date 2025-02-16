import { useState } from "react";
import styled from "styled-components";
import axiosInstance from "@/src/api/axios"; // axiosInstance 적용

// ✅ .env에서 teamId 자동 추출
const teamId = process.env.NEXT_PUBLIC_BASE_URL?.split("/").pop();

interface TaskDropdownProps {
  cardId: number; // ✅ teamId 제거
  onOpenEditModal: () => void;
  onClose: () => void /* 닫기 기능 추가 */;
}

const TaskDropdown: React.FC<TaskDropdownProps> = ({
  cardId,
  onOpenEditModal,
  onClose,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleDeleteCard = async () => {
    try {
      await axiosInstance.delete(`/cards/${cardId}`); // ✅ teamId 제거 후 API 호출
      alert("카드가 삭제되었습니다.");
      window.location.reload(); // 삭제 후 새로고침
    } catch (error) {
      console.error("❌ 카드 삭제 실패:", error);
    }
  };

  return (
    <DropdownContainer>
      <ButtonGroup>
        <IconButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src="/icons/kebab.svg" alt="메뉴" />
        </IconButton>
        <IconButton onClick={onClose}>
          <img src="/icons/close.svg" alt="닫기" />
        </IconButton>
      </ButtonGroup>
      {dropdownOpen && (
        <DropdownMenu>
          <DropdownItem onClick={onOpenEditModal}>수정하기</DropdownItem>
          <DropdownItem onClick={handleDeleteCard}>삭제하기</DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default TaskDropdown;

// ✅ 스타일 유지
const DropdownContainer = styled.div`
  position: relative;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px; /* 케밥 아이콘과 닫기 버튼 사이 간격 유지 */
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0; /* 패딩 제거 */

  img {
    width: 28px;
    height: 28px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  min-width: 120px;
`;

const DropdownItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;
