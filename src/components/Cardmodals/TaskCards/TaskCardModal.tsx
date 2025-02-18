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
import { getComments } from "@/src/api/comments";
import TaskEditModal from "../EditCards/TaskEditModal"; // 우리가 만든 수정 모달

interface TaskCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  columnTitle: string;
  columnId: number;
  dashboardId: number;
  onOpenEditModal?: () => void;
}

const TaskCardModal: React.FC<TaskCardModalProps> = ({
  isOpen,
  onClose,
  cardId,
  columnTitle,
  columnId,
  dashboardId,
}) => {
  const [cardData, setCardData] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getCardDetail(cardId)
        .then((data) => setCardData(data))
        .catch((error) => console.error("❌ 카드 상세 조회 실패:", error));

      fetchComments();
    }
  }, [isOpen, cardId]);

  const fetchComments = async () => {
    try {
      const response = await getComments(cardId, 10, null);
      if (response && response.comments) {
        setComments(response.comments);
      }
    } catch (error) {
      console.error("❌ 댓글 조회 실패:", error);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} width="730px" height="auto">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Title>{cardData?.title || "제목 없음"}</Title>
          <TaskDropdown
            cardId={cardId}
            onOpenEditModal={() => setEditModalOpen(true)}
            onClose={onClose}
          />
        </HeaderContainer>

        <ColumnAndTagsContainer>
          <TaskColumn columnTitle={columnTitle} />
          <VerticalDivider />
          <TaskTags tags={cardData?.tags || []} />
        </ColumnAndTagsContainer>

        <ContentWrapper>
          <LeftContent>
            {cardData?.description && (
              <Description>{cardData.description}</Description>
            )}
            <TaskImage imageUrl={cardData?.imageUrl} />
          </LeftContent>

          <RightContent>
            <TaskAssignee
              assignee={cardData?.assignee ?? { nickname: "담당자 없음" }}
              dueDate={cardData?.dueDate ?? "마감일 없음"}
            />
          </RightContent>
        </ContentWrapper>

        <CommentSection>
          <TaskCommentInput
            cardId={cardId}
            columnId={columnId}
            dashboardId={dashboardId}
            onCommentAdded={fetchComments}
            setComments={setComments}
          />
          <TaskComments
            cardId={cardId}
            comments={comments}
            setComments={setComments}
          />
        </CommentSection>
      </ModalContent>

      {isEditModalOpen && (
        <TaskEditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          task={cardData}
          fetchCards={() => {}}
          columnTitle={columnTitle}
          dashboardId={dashboardId}
        />
      )}
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
  padding: 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333236;
`;

const ColumnAndTagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #d9d9d9;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: row;
`;

const LeftContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 250px;
`;

const Description = styled.p`
  width: 470px;
  height: 92px;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  padding: 10px;
  margin-top: 8px;
`;
