import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import styles from "./index.module.scss";
import { getDashboard } from "@/src/api/api";
import ListCard from "@/src/components/dashboardlist/ListCard";
import Pagination from "@/src/components/pagination/Pagination";
import Image from "next/image";

export async function getServerSideProps() {
  try {
    const { dashboards = [] } = await getDashboard();

    return {
      props: { dashboards },
    };
  } catch (error) {
    console.error("Failed to fetch dashboard:", error);
    return {
      props: { dashboards: [] },
    };
  }
}

export default function MyDashboardPage({ dashboards }: { dashboards: any[] }) {
  return (
    <div className={styles.contents}>
      <SideBar />
      <NavBar />
      <div className={styles.content}>
        <div>
          <div className={styles.dashboard}>
            {/* 새로운 대시보드 */}
            <ListCard className={styles.listCard}>
              <div>새로운 대쉬보드</div>
              <Image
                src="/icons/chip.svg"
                width={22}
                height={22}
                alt="chip.svg"
                priority
              />
            </ListCard>
            {/* 대시보드 리스트 */}
            {dashboards.map((dashboard, index) => (
              <ListCard key={index}>
                <div
                  className={styles.colorCircle}
                  style={{ backgroundColor: dashboard.color }}
                ></div>
                <div>{dashboard.title}</div>{" "}
                <Image
                  src="/icons/arrow.svg"
                  width={22}
                  height={22}
                  alt="arrow.svg"
                  priority
                />
              </ListCard>
            ))}
          </div>
          {/* 페이지네이션 버튼 */}
          <div className={styles.pagination}>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
