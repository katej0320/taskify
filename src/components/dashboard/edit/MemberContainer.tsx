import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";

export default function MemberContainer() {
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
            <li className={styles.tile}>
              <div className={styles.profileCover}>
                <div className={styles.thumbnail}></div>
                <p className={styles.nickname}>정민철</p>
              </div>
              <Button sub="sub">삭제</Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
