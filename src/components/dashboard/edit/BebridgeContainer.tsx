import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import IconCheck from "@/public/images/dashboard/edit/ic_check.svg";

export default function BebridgeContainer() {
  return (
    <>
      <div className={`${styles.container} ${styles.section1}`}>
        <div className={styles.head}>
          <p className={styles.title}>비브리지</p>
        </div>
        <div className={styles.contents}>
          <p className={styles.title}>대시보드 이름</p>
          <form>
            <input type="text" placeholder="대시보드 이름을 입력해주세요" />
          </form>
          <ul className={styles.colorList}>
            <li className={styles.tile}>
              <IconCheck />
            </li>
          </ul>
          <Button signature="signature">변경</Button>
        </div>
      </div>
    </>
  );
}
