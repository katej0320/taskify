import { useState } from "react";
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
}

export default function DashboardList({ dashboards }: DashboardListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ✅ 한 페이지당 5개의 대시보드 표시

  // ✅ 페이지별로 데이터 나누기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDashboards = dashboards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dashboards.length / itemsPerPage);

  return (
    <>
      {currentDashboards.map((dashboard) => (
        <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
          <ListCard>
            <div
              className={styles.colorCircle}
              style={{ backgroundColor: dashboard.color }}
            ></div>
            <div>{dashboard.title}</div>
            <Image src="/icons/arrow.svg" width={22} height={22} alt="arrow.svg" priority />
          </ListCard>
        </Link>
      ))}

      {/* ✅ 페이지네이션 추가 */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
