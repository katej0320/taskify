import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axiosInstance from "@/src/api/axios";

interface TaskDropdownProps {
  cardId: number;
  onOpenEditModal: () => void;
  onClose: () => void;
}

const TaskDropdown: React.FC<TaskDropdownProps> = ({
  cardId,
  onOpenEditModal,
  onClose,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDeleteCard = async () => {
    try {
      await axiosInstance.delete(`/cards/${cardId}`);
      alert("카드가 삭제되었습니다.");
      window.location.reload(); // 삭제 후 새로고침
    } catch (error) {
      console.error("❌ 카드 삭제 실패:", error);
    }
  };

  // ✅ 바깥 클릭 감지해서 닫기 (mousedown + capture: true)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true); // ✅ capture: true 추가
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
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
  z-index: 999;
  right: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  position: absolute;
  right: 0;
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
  padding: 0;

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
    background: rgba(241, 239, 253, 1);
    color: #5534da;
  }
`;
