import Image from "next/image";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <span className={styles.dashboardTitle}>내 대시보드</span>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.navButton}>
          <Image
            src="/icons/settings.svg"
            width={20}
            height={20}
            alt="더하기 버튼"
          />
          관리
        </button>
        <button className={styles.navButton}>
          <Image
            src="/icons/add_box.svg"
            width={20}
            height={20}
            alt="더하기 버튼"
          />
          조회하기
        </button>

        <div className={styles.profile}>
          <hr
            style={{
              border: "1px solid,rgba(229, 231, 235, 1) ",
            }}
          />
          <span className={styles.profileIcon}>B</span>
          <span className={styles.profileName}>배유설</span>
        </div>
      </div>
    </nav>
  );
}
