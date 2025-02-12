import { useEdit } from "@/src/contexts/EditDashboardProvider";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import IconAdd from "@/public/images/dashboard/edit/ic_invite.svg";
import { InviteItem } from "@/src/types/EditComponent";
import { ArrowButton } from "@/src/types/EditPagination";
import { CheckModal } from "./modal/CheckModal";
import axiosInstance from "@/src/api/axios";

const PaginationButton = styled(Button)<ArrowButton>`
  width: 40px;
  height: 40px;
  line-height: 43px;
  ${(props) =>
    props.$left
      ? css`
          border-radius: 4px 0 0 4px;
          background: url("/images/dashboard/edit/ic_prevArrow.svg") center
            center no-repeat #fff;
        `
      : props.$right
      ? css`
          border-radius: 0 4px 4px 0;
          background: url("/images/dashboard/edit/ic_nextArrow.svg") center
            center no-repeat #fff;
        `
      : ""}
  background-color:${(props) => (props.disabled ? "#f9f9f9" : "")};
  @media (min-width: 769px) and (max-width: 840px) {
    width: 30px;
    height: 30px;
    line-height: 33px;
  }
`;

const InviteButton = styled(Button)`
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

export default function InvitationContainer() {
  const [isInvitationsData, setIsInvitationsData] = useState<InviteItem[]>();
  const [isTotalCount, setIsTotalCount] = useState(1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const isMessage = "선택된 초대를 취소하시겠습니까?";
  const [isDashboardId, setIsDashboardId] = useState<number>();
  const [isInvitationId, setIsInvitationId] = useState<number>();
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    invitePage,
    isInvitations,
    getInvitations,
    handlePrevClick,
    handleNextClick,
    setInvitePage
  } = useEdit();

  // 모달 출력
  const handleShowModal = (dashboardId: number, invitationId: number) => {
    setIsModal(true);
    setIsDashboardId(dashboardId);
    setIsInvitationId(invitationId);
  };

  // 초대 취소 API 호출
  async function deleteInvitation() {
    try {
      setIsUpdate(true);
      const res = await axiosInstance.delete(
        `/dashboards/${isDashboardId}/invitations/${isInvitationId}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdate(false);
    }
  }

  // 초대 취소 후 내역 업데이트
  useEffect(() => {
    if (isInvitations) getInvitations();
  }, [isUpdate]);

  // 렌더링 시 데이터 화면 출력
  useEffect(() => {
    if (isInvitations) {
      const { invitations, totalCount } = isInvitations;
      setIsInvitationsData(invitations);
      setIsTotalCount(Math.ceil(totalCount / 4));
    }
  }, [isInvitations]);

  // 초대 취소 진행 시 빈 내역이 되면 이전 데이터를 출력
  useEffect(() => {
    if (isInvitationsData?.length === 0 && isTotalCount >= 1) {
      setInvitePage((prevPage) => (prevPage -= 1));
    }
  }, [isInvitationsData]);

  return (
    <>
      {isModal && (
        <CheckModal
          invite={"invite"}
          isModal={isModal}
          setIsModal={setIsModal}
          isMessage={isMessage}
          deleteInvitation={deleteInvitation}
        />
      )}
      <div className={`${styles.container} ${styles.section3}`}>
        <div className={styles.head}>
          <p className={styles.title}>초대 내역</p>
          <div className={styles.controlCover}>
            <div className={styles.pagination}>
              <p className={styles.number}>
                {isTotalCount >= 1 ? isTotalCount : 1} 페이지 중 {invitePage}
              </p>
              <div className={styles.buttonContainer}>
                <PaginationButton
                  disabled={invitePage === 1 ? true : false}
                  $left={"left"}
                  name="invite"
                  onClick={(e) => handlePrevClick(e)}
                />
                <PaginationButton
                  disabled={isTotalCount === invitePage || isTotalCount <= 1}
                  $right={"right"}
                  name="invite"
                  onClick={(e) => handleNextClick(e)}
                />
              </div>
            </div>
            <InviteButton>
              <IconAdd />
              초대하기
            </InviteButton>
          </div>
        </div>
        <div className={styles.contents}>
          <p className={styles.title}>이메일</p>
          <ul className={styles.memberList}>
            {isInvitationsData &&
              isInvitationsData.map((item) => {
                console.log(item)
                const { invitee, dashboard, id: invitationId } = item;
                const { id: dashboardId } = dashboard;
                return (
                  <li key={item.id} className={styles.tile}>
                    <div className={styles.profileCover}>
                      <p className={styles.email}>{invitee.email}</p>
                    </div>
                    <Button
                      onClick={() => handleShowModal(dashboardId, invitationId)}
                      $sub="sub"
                    >
                      취소
                    </Button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
