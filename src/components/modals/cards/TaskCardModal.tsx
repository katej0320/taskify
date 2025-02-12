import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import TaskHeader from "./TaskHeader";
import TaskImage from "./TaskImage";
import TaskColumn from "./TaskColumn";
import TaskDescription from "./TaskDescription";
import TaskComments from "./TaskComments";
import TaskDropdown from "./TaskDropdown";
import { getCardDetail } from "@/src/api/cards";
import { getColumns } from "@/src/api/columns";

interface TaskCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEditModal: () => void;
  teamId: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const TaskCardModal: React.FC<TaskCardModalProps> = ({
  isOpen,
  onClose,
  onOpenEditModal,
  teamId,
  cardId,
  columnId,
  dashboardId,
}) => {
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [columnTitle, setColumnTitle] = useState<string>("없음");

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      Promise.all([
        getCardDetail(teamId, cardId).then((data: any) => {
          setCardData(data);
        }),
        getColumns(teamId, dashboardId).then((columns: any[]) => {
          const column = columns.find((col) => col.id === columnId);
          setColumnTitle(column ? column.title : "없음");
        }),
      ])
        .catch((error) => console.error("❌ 데이터 가져오기 실패:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, teamId, cardId, columnId, dashboardId]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <TaskDropdown
          teamId={teamId}
          cardId={cardId}
          onOpenEditModal={onOpenEditModal}
        />
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <>
            <TaskHeader title={cardData?.title} tags={cardData?.tags || []} />
            <TaskImage imageUrl={cardData?.imageUrl} />
            <TaskColumn
              teamId={teamId}
              columnId={columnId}
              dashboardId={dashboardId}
            />
            <TaskDescription
              description={cardData?.description}
              assignee={cardData?.assignee?.nickname || "미정"} // <-- ✅ 안전하게 값 전달
              dueDate={cardData?.dueDate}
            />{" "}
            <TaskComments
              teamId={teamId}
              cardId={cardId}
              columnId={columnId}
              dashboardId={dashboardId}
            />
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default TaskCardModal;
