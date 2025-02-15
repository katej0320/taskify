import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomModal from "../../modal/CustomModal";
import TaskDropdown from "./TaskDropdown";
import TaskColumn from "./TaskColumn";
import TaskTags from "./TaskTags";
import TaskImage from "./TaskImage";
import TaskAssignee from "./TaskAssignee";
import TaskComments from "./TaskComments";
import TaskCommentInput from "./TaskCommentInput";
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
  const [columnTitle, setColumnTitle] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      getCardDetail(teamId, cardId)
        .then((data) => setCardData(data))
        .catch((error) => console.error("카드 상세 조회 실패:", error));

      getColumns(teamId, dashboardId)
        .then((columns) => {
          const column = columns.find((col: any) => col.id === columnId);
          setColumnTitle(column ? column.title : "없음");
        })
        .catch((error) => console.error("컬럼 조회 실패:", error));
    }
  }, [isOpen, teamId, cardId, columnId, dashboardId]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} width="730px" height="auto">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Title>{cardData?.title || "제목 없음"}</Title>
          <TaskDropdown
            teamId={teamId}
            cardId={cardId}
            onOpenEditModal={onOpenEditModal}
            onClose={onClose}
          />
        </HeaderContainer>

        <ContentWrapper>
          <LeftContent>
            <TaskColumn
              teamId={teamId}
              columnId={columnId}
              dashboardId={dashboardId}
              columnTitle={columnTitle}
            />
            <TaskTags tags={cardData?.tags || []} />
            <TaskImage imageUrl={cardData?.imageUrl} />
            {cardData?.description && (
              <Description>{cardData.description}</Description>
            )}
          </LeftContent>

          <RightContent>
            <TaskAssignee
              assignee={cardData?.assignee}
              dueDate={cardData?.dueDate}
            />
          </RightContent>
        </ContentWrapper>

        <CommentSection>
          <CommentTitle>댓글</CommentTitle>
          <TaskComments
            teamId={teamId}
            cardId={cardId}
            columnId={columnId}
            dashboardId={dashboardId}
            enableInfiniteScroll={true}
          />
          <TaskCommentInput
            teamId={teamId}
            cardId={cardId}
            columnId={columnId}
            dashboardId={dashboardId}
            onCommentAdded={() => {}}
          />
        </CommentSection>
      </ModalContent>
    </CustomModal>
  );
};

export default TaskCardModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0; // 🔹 TaskCardModal의 padding 제거
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentSection = styled.div`
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 250px; // 🔹 댓글 영역 크기 조정
`;

const CommentTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #555;
`;
