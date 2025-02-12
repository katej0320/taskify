import { useState } from "react";
import { deleteCard } from "@/src/api/cards";

interface TaskDropdownProps {
  teamId: string;
  cardId: number;
  onOpenEditModal: () => void;
}

const kebabIcon = "/icons/kebab.svg";

const TaskDropdown: React.FC<TaskDropdownProps> = ({
  teamId,
  cardId,
  onOpenEditModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleDeleteCard = async () => {
    try {
      await deleteCard(teamId, cardId);
      alert("카드가 삭제되었습니다.");
      window.location.reload(); // 삭제 후 새로고침
    } catch (error) {
      console.error("카드 삭제 실패:", error);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={kebabIcon} alt="메뉴" />
      </button>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          <li>
            <button onClick={onOpenEditModal}>수정하기</button>
          </li>
          <li>
            <button onClick={handleDeleteCard}>삭제하기</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TaskDropdown;
