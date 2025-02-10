import { useEdit } from "@/src/contexts/EditDashbordProvider";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import IconAdd from "@/public/images/dashboard/edit/ic_invite.svg";

type ArrowButton = {
  $right?: string;
  $left?: string;
};

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

type Inviter = {
  nickname: string;
  email: string;
  id: number;
};
type Dashboard = {
  title: string;
  id: number;
};
type Invitee = {
  nickname: string;
  email: string;
  id: number;
};

interface Item {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: Dashboard;
  invitee: Invitee;
  inviteAccepte: boolean;
  createdAt: string;
  updatedA: string;
}

export default function InvitationContainer() {
  const [isInvitationsData, setIsInvitationsData] = useState<Item[]>();
  const [isTotalCount, setIsTotalCount] = useState(0);
  const { invitePage, isInvitations, handlePrevClick, handleNextClick } =
    useEdit();

  useEffect(() => {
    if (isInvitations) {
      const { invitations, totalCount } = isInvitations;
      setIsInvitationsData(invitations);
      setIsTotalCount(Math.ceil(totalCount / 4));
    }
  }, [isInvitations]);

  useEffect(() => {
    if (isTotalCount === invitePage) {
    }
  }, [isTotalCount, invitePage]);

  return (
    <>
      <div className={`${styles.container} ${styles.section3}`}>
        <div className={styles.head}>
          <p className={styles.title}>초대 내역</p>
          <div className={styles.controlCover}>
            <div className={styles.pagination}>
              <p className={styles.number}>
                {isTotalCount} 페이지 중 {invitePage}
              </p>
              <div className={styles.buttonContainer}>
                <PaginationButton
                  disabled={invitePage === 1 ? true : false}
                  $left={"left"}
                  name="invite"
                  onClick={(e) => handlePrevClick(e)}
                />
                <PaginationButton
                  disabled={isTotalCount === invitePage}
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
                const { invitee } = item;
                return (
                  <li key={item.id} className={styles.tile}>
                    <div className={styles.profileCover}>
                      <p className={styles.email}>{invitee.email}</p>
                    </div>
                    <Button $sub="sub">취소</Button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
