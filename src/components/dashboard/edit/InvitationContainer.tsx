import styled from "styled-components";
import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import IconAdd from "@/public/images/dashboard/edit/ic_invite.svg";
import { useEdit } from "@/src/contexts/EditProvider";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
  const { isInvitations } = useEdit();

  useEffect(() => {
    if (isInvitations) {
      const { invitations } = isInvitations;
      setIsInvitationsData(invitations);
    }
  }, [isInvitations]);

  return (
    <>
      <div className={`${styles.container} ${styles.section3}`}>
        <div className={styles.head}>
          <p className={styles.title}>초대 내역</p>
          <div className={styles.controlCover}>
            <div>페이지네이션</div>
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
                const {invitee} = item;
                return (
                  <li key={item.id} className={styles.tile}>
                    <div className={styles.profileCover}>
                      <p className={styles.email}>{invitee.email}</p>
                    </div>
                    <Button sub="sub">취소</Button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
