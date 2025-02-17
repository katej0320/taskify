import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomModal from "../CustomModal";
import TaskHeader from "./TaskHeader";
import TaskImage from "./TaskImage";
import TaskColumn from "./TaskColumn";
import TaskTags from "./TaskTags";
import TaskAssignee from "./TaskAssignee";
import TaskComments from "./TaskComments";
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
        getCardDetail(teamId, cardId).then((data) => setCardData(data)),
        getColumns(teamId, dashboardId).then((columns) => {
          const column = columns.find((col: any) => col.id === columnId);
          setColumnTitle(column ? column.title : "없음");
        }),
      ])
        .catch((error) => console.error("데이터 가져오기 실패:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, teamId, cardId, columnId, dashboardId]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} className="largeModal">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 카드 헤더 */}
        <TaskHeader title={cardData?.title} onClose={onClose} />

        {/* 컬럼명 + 태그 */}
        <ColumnTagWrapper>
          <TaskColumn
            teamId={teamId}
            columnId={columnId}
            dashboardId={dashboardId}
          />
          <TaskTags tags={cardData?.tags || []} />
        </ColumnTagWrapper>

        {/* 카드 이미지 */}
        <TaskImage imageUrl={cardData?.imageUrl} />

        {/* 담당자 & 마감일 */}
        <TaskAssignee
          assignee={cardData?.assignee}
          dueDate={cardData?.dueDate}
        />

        {/* 설명 (설명이 있을 때만 표시) */}
        {cardData?.description && (
          <Description>{cardData.description}</Description>
        )}

        {/* 댓글 섹션 */}
        <TaskComments
          teamId={teamId}
          cardId={cardId}
          columnId={columnId}
          dashboardId={dashboardId}
        />
      </ModalContent>
    </CustomModal>
  );
};

export default TaskCardModal;

const ModalContent = styled.div`
  width: 900px;
  max-width: 90vw;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ColumnTagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-top: 10px;
`;
