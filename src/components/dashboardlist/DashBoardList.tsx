import Link from "next/link";
import Image from "next/image";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import Pagination from "@/src/components/pagination/Pagination"; // ✅ 추가
import styles from "../../../pages/dashboard/index.module.scss";


interface Dashboard {
  id: string;
  title: string;
  color: string;
}

interface DashboardListProps {
  dashboards: Dashboard[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DashboardList({ dashboards, currentPage, totalPages, onPageChange }: DashboardListProps) {
  const itemsPerPage = 6; // ✅ 한 페이지당 5개의 대시보드 표시
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDashboards = dashboards.slice(indexOfFirstItem, indexOfLastItem);

  console.log("📢 DashboardList 렌더링됨!", dashboards);
  
  return (
    <>
      <div className={styles.listcardandpagination}>
        <div className={styles.listcard}>
        {currentDashboards.map((dashboard) => (
          <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
            <ListCard >
              <div
                className={styles.colorCircle}
                style={{ backgroundColor: dashboard.color }}
              ></div>
              <div>{dashboard.title}</div>
              <Image src="/icons/arrow.svg" width={22} height={22} alt="arrow.svg" priority />
            </ListCard>
          </Link>
        ))}
        </div>

        {/* ✅ 페이지네이션 추가 */}
        <div className={styles.pagination}>
        {totalPages > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        
      )}
      </div>
      </div>
    </>
  );
}
