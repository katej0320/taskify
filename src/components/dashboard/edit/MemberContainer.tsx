import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import { useEdit } from "@/src/contexts/EditProvider";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Item {
  id: number;
  email: string;
  isOwner: boolean;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  profileImageUrl: null | string | StaticImport;
  userId: number;
}

export default function MemberContainer() {
  const [isMembersData, isSetMemberData] = useState<Item[]>();
  const { isMembers } = useEdit();

  useEffect(() => {
    if (isMembers) {
      const { members } = isMembers;
      isSetMemberData(members);
    }
  }, [isMembers]);

  return (
    <>
      <div className={`${styles.container} ${styles.section2}`}>
        <div className={styles.head}>
          <p className={styles.title}>구성원</p>
          <div>페이지네이션</div>
        </div>
        <div className={styles.contents}>
          <p className={styles.title}>이름</p>
          <ul className={styles.memberList}>
            {isMembersData &&
              isMembersData?.map((item, i) => {
                return (
                  <li key={item.id} className={styles.tile}>
                    <div className={styles.profileCover}>
                      <div className={styles.thumbnail}></div>
                      <p className={styles.nickname}>{item.nickname}</p>
                    </div>
                    <Button sub="sub">삭제</Button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
