import styled from "styled-components";
import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import IconAdd from "@/public/images/dashboard/edit/ic_invite.svg";

const InviteButton = styled(Button)`
  width: fit-content;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  background: #5534da;
  color: #fff;
  font-weight: 500;
`;

export default function InvitationContainer() {
  return (
    <>
      <div className={`${styles.container} ${styles.section2}`}>
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
            <li className={styles.tile}>
              <div className={styles.profileCover}>
                <p className={styles.email}>codeitA@codeit.com</p>
              </div>
              <Button sub="sub">취소</Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
