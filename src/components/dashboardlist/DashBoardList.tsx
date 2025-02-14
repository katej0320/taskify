import Link from "next/link";
import Image from "next/image";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import Pagination from "@/src/components/pagination/Pagination"; // ✅ 추가
import styles from "../../../pages/dashboard/index.module.scss";
import { useEffect, useState } from "react";
import { getDashboard } from "@/src/api/dashboardApi";
import { useDashboard } from "@/src/contexts/DashBoardContext";

interface Dashboard {
  id: string;
  title: string;
  color: string;
}

interface DashboardListProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DashboardList({
  currentPage,
  totalPages,
  onPageChange,
}: DashboardListProps) {
  const { dashboards } = useDashboard();
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDashboards = dashboards.slice(indexOfFirstItem, indexOfLastItem);
  const [dashboard, setDashboard] = useState<any[]>([]);
  const [createdByMe, setcreatedByMe] = useState<{
    [key: number]: boolean;
  }>({}); // Store createdByMe for each dashboard

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { dashboard = [] } = await getDashboard();
  //       setDashboard(dashboard);
  //     } catch (error) {
  //       console.error("Failed to fetch dashboard:", error);
  //     }
  //   }
  // });

  useEffect(() => {
    // Fetch the createdByMe value for each dashboard
    const fetchDashboardDetails = async () => {
      try {
        setDashboard(dashboard);
        for (const dashboard of dashboards) {
          const fetchedDashboard = await getDashboard(dashboard.id);
          setcreatedByMe((prevData) => ({
            ...prevData,
            [dashboard.id]: fetchedDashboard.createdByMe,
          }));
        }
      } catch (error) {
        console.error("대시보드 상세 불러오기 실패:", error);
      }
    };

    if (dashboards.length > 0) {
      fetchDashboardDetails();
    }
  }, [dashboards]); // Re-run when dashboards list changes

  return (
    <>
      <div className={styles.listcardandpagination}>
        <div className={styles.listcard}>
          {currentDashboards.map((dashboard) => (
            <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
              <ListCard>
                <div
                  className={styles.colorCircle}
                  style={{ backgroundColor: dashboard.color }}
                ></div>
                <div>{dashboard.title}</div>
                {createdByMe[dashboard.id] && (
                  <Image
                    src="/icons/crown.svg"
                    alt="Crown"
                    width={16}
                    height={16}
                  />
                )}
                <Image
                  src="/icons/arrow.svg"
                  width={22}
                  height={22}
                  alt="arrow.svg"
                  priority
                />
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
