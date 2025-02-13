import styled from "styled-components";
import { Button } from "../../button/CustomButton2";
import IconAdd from "@/public/images/dashboard/edit/ic_invite.svg";
import { useEffect, useState } from "react";
import { InviteModal } from "./modal/InviteModal";
import axiosInstance from "@/src/api/axios";
import axios from "axios";
import { useEdit } from "@/src/contexts/EditDashboardProvider";

const ButtonContainer = styled(Button)`
  width: fit-content;
  padding: 0 15px;
  margin-left: 16px;
  height: 32px;
  line-height: 32px;
  background: #5534da;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  svg {
    padding-top: 2px;
    margin-right: 3px;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 79px;
    right: 28px;
  }
`;

export function InviteButton({ dashboardId }: { dashboardId: string | string[] | undefined }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isValue, setIsValue] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState("");

  const { getInvitations } = useEdit();

  const handleShowModal = () => {
    setIsModal(true);
  };

  async function postInvitation() {
    try {
      await axiosInstance.post(`/dashboards/${dashboardId}/invitations`, {
        email: isValue,
      });
      getInvitations();
      setIsUpdate(true);
    } catch (error) {
      if (axios.isAxiosError(error)) setIsErrorMessage(error.message);
    }
  }

  // 모달 비활성화 시 초대 API 리스폰스 에러 메세지 초기화
  useEffect(() => {
    setIsErrorMessage("");
  }, [isModal]);

  // 초대 API 전송 성공 시 모달 비활성화
  useEffect(() => {
    if (isUpdate) setIsModal(false);
  }, [isUpdate]);

  return (
    <>
      {isModal && (
        <InviteModal
          isModal={isModal}
          setIsModal={setIsModal}
          setIsValue={setIsValue}
          isErrorMessage={isErrorMessage}
          postInvitation={postInvitation}
          setIsUpdate={setIsUpdate}
        />
      )}
      <ButtonContainer onClick={handleShowModal}>
        <IconAdd />
        초대하기
      </ButtonContainer>
    </>
  );
}
