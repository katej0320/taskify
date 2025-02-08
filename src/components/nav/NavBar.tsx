import Image from "next/image";
import styles from "./NavBar.module.scss";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboard } from "@/src/contexts/DashBoardContext"; // 예제

export default function NavBar() {
  const params = useParams();
  const pathname = usePathname(); // null일 수도 있음
  const { dashboards } = useDashboard();

  const [headerTitle, setHeaderTitle] = useState("내 대시보드");

  useEffect(() => {
    console.log("pathname", pathname);
    console.log("params", params);

    if (!pathname) return; // pathname이 null이면 실행 안 함

    if (pathname.startsWith("/dashboard/") && params.id) {
      const dashboard = dashboards.find((d) => d.id === Number(params.id));
      setHeaderTitle(dashboard ? dashboard.title : "잘못된 상세 페이지");
    } else {
      setHeaderTitle("내 대시보드");
    }
  }, [pathname, params, dashboards]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <span className={styles.dashboardTitle}>{headerTitle}</span>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.navButton}>
          <Image src="/icons/settings.svg" width={20} height={20} alt="설정" />
          관리
        </button>
        <button className={styles.navButton}>
          <Image src="/icons/add_box.svg" width={20} height={20} alt="초대" />
          초대하기
        </button>
        <div className={styles.profile}>
          <span className={styles.profileIcon}>B</span>
          <span className={styles.profileName}>배유설</span>
        </div>
      </div>
    </nav>
  );
}
