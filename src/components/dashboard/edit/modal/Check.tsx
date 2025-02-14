import React from "react";
import CustomModal from "@/src/components/modal/CustomModal";
import { Button, ButtonContainer, Contents, MessageText } from "./style";

export const CheckModal = ({
  isModal,
  setIsModal,
  setIsToast,
  isMessage,
  member,
  invite,
  dashboard,
  deleteMember,
  deleteInvitation,
  deleteDashboard,
}: {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsToast?: React.Dispatch<React.SetStateAction<boolean>>;
  isMessage: string;
  member?: string;
  invite?: string;
  dashboard?: string;
  deleteMember?: () => Promise<void>;
  deleteInvitation?: () => Promise<void>;
  deleteDashboard?: () => Promise<void>;
}) => {
  const closeModal = () => setIsModal(false);

  return (
    <>
      <CustomModal isOpen={isModal} onClose={closeModal}>
        <Contents>
          <MessageText>{isMessage}</MessageText>
          <ButtonContainer>
            {(member || invite || dashboard) && (
              <Button onClick={closeModal}>닫기</Button>
            )}
            <Button
              $confirm={"confirm"}
              onClick={() => {
                closeModal();
                (member || invite) && setIsToast?.(true);
                member && deleteMember?.();
                invite && deleteInvitation?.();
                dashboard && deleteDashboard?.();
              }}
            >
              {member || dashboard
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
