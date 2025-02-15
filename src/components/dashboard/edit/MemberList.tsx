import styled from "styled-components";
import { Button } from "../../button/CustomButton2";
import styles from "./EditPage.style.module.scss";
import { MemberItem } from "@/src/types/dashboard/edit/EditComponent";

const EmptyData = styled.div`
  padding: 40px 0;
  font-size: 14px;
  color: #9fa6b2;
  text-align: center;
`;

export function MemberList({
  isMembersData,
  handleShowModal,
}: {
  isMembersData: MemberItem[] | undefined;
  handleShowModal: (userId: number) => void;
}) {
  return (
    <>
      {isMembersData?.length !== 0 ? (
        <>
          <p className={styles.title}>이름</p>
          <ul className={styles.memberList}>
            {isMembersData &&
              isMembersData?.map((item) => {
                const { id } = item;
                return (
                  <li key={id} className={styles.tile}>
                    <div className={styles.profileCover}>
                      <div className={styles.thumbnail}></div>
                      <p className={styles.nickname}>{item.nickname}</p>
                    </div>
                    <Button onClick={() => handleShowModal(id)} $sub>
                      삭제
                    </Button>
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <EmptyData>구성원이 없습니다</EmptyData>
      )}
    </>
  );
}
