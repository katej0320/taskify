import React from "react";
import styled, { css } from "styled-components";
import CustomModal from "@/src/components/modal/CustomModal";

type Props = {
  $check?: string;
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: inherit;
`;

const MessageText = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Button = styled.div<Props>`
  max-width: 50%;
  min-width: 50%;
  height: 54px;
  line-height: 54px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #787486;
  cursor: pointer;
  ${(props) =>
    props.$check &&
    css`
      background: #5534da;
      color: #fff;
    `}
`;

export const CheckModal = ({
  isModal,
  setIsModal,
  isMessage,
  member,
  invite,
  deleteDashboard,
  deleteMember,
  deleteInvitation,
}: {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMessage: string;
  member?: string;
  invite?: string;
  deleteDashboard?: string;
  deleteMember?: () => Promise<void>;
  deleteInvitation?: () => Promise<void>;
}) => {
  const closeModal = () => setIsModal(false);

  return (
    <>
      <CustomModal isOpen={isModal} onClose={closeModal}>
        <Contents>
          <MessageText>{isMessage}</MessageText>
          <ButtonContainer>
            {(member || invite || deleteDashboard) && (
              <Button onClick={closeModal}>닫기</Button>
            )}
            <Button
              $check={"check"}
              onClick={() => {
                closeModal();
                member && deleteMember?.();
                invite && deleteInvitation?.();
              }}
            >
              {member || deleteDashboard
                ? "삭제하기"
                : invite
                ? "초대 취소하기"
                : "확인"}
            </Button>
          </ButtonContainer>
        </Contents>
      </CustomModal>
    </>
  );
};
