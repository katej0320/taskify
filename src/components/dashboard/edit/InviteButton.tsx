import styled from "styled-components";
import { Button } from "../../button/CustomButton2";
import IconAdd from "@/public/images/dashboard/edit/ic_invite.svg";
import { useEffect, useState } from "react";
import { InviteModal } from "./modal/Invite";
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

export function InviteButton({
  dashboardId,
}: {
  dashboardId: string | string[] | undefined;
}) {
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
      if (axios.isAxiosError(error)) {
        if (error.response)
          if (error.response.status === 400) {
            setIsErrorMessage("이메일 형식이 올바르지 않습니다.");
          } else if (error.response.status === 403) {
            setIsErrorMessage("대시보드 초대 권한이 없습니다.");
          } else if (error.response.status === 409) {
            setIsErrorMessage("이미 대시보드에 초대된 멤버입니다.");
          } else {
            setIsErrorMessage("이메일을 확인해주세요.");
          }
      }
    }
  }

  // input 입력 및 모달 비활성화 시 초대 API 리스폰스 에러 메세지 초기화
  useEffect(() => {
    setIsErrorMessage("");
  }, [isModal, isValue]);

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
          isValue={isValue}
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
