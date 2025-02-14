"use client";

import { useDashboard } from "@/src/contexts/DashBoardContext";
import styles from "./SideBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CustomModal from "../modal/CustomModal";
import CreateBoard from "@/src/components/dashboardlist/createBoard/createBoard";
import { useEffect, useState } from "react";
import { useCreateBoard } from "@/src/hooks/useCreateBoard";
import { getDashboard } from "@/src/api/dashboardApi";

import None from "../dashboardlist/invite/none";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";

export default function SideBar() {
  interface Dashboard {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }

  const { dashboards } = useDashboard(); // context에서 dashboards 데이터를 가져옴
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdByMe, setcreatedByMe] = useState<{
    [key: number]: boolean;
  }>({}); // Store createdByMe for each dashboard

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    dashboardName,
    setDashboardName,
    selectedColor,
    setSelectedColor,
    handleCreate,
  } = useCreateBoard(closeModal, (newDashboard) => {
    console.log("새로운 대시보드:", newDashboard);
  });

  useEffect(() => {
    // Fetch the createdByMe value for each dashboard
    const fetchDashboardDetails = async () => {
      try {
        for (const dashboard of dashboards) {
          const fetchedDashboard = await getDashboard(dashboard.id); // Use dashboard.id here
          setcreatedByMe((prevData) => ({
            ...prevData,
            [dashboard.id]: fetchedDashboard.createdByMe, // Store createdByMe based on dashboard.id
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

  //무한스크롤롤
  const { items, isLoading, hasMore, observerRef } =
    useInfiniteScroll<Dashboard>({
      endpoint: "/dashboards",
      queryParams: { navigationMethod: "infiniteScroll", size: 20 },
      extractItems: (data) => data.dashboards ?? [],
      extractCursor: (data) => {
        if (!data.cursorId) return null;
        return data.cursorId;
      },
    });

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarcontent}>
        <Link href="/dashboard">
          <Image
            src="/icons/dashboardlogo.svg"
            width={110}
            height={34}
            alt="dashboardlogo.svg"
            priority
          />
        </Link>
        <div className={styles.subtitles}>
          <div className={styles.subtitle}>Dash Boards</div>
          <div>
            <Image
              src="/icons/add_box.svg"
              width={20}
              height={20}
              alt="더하기 버튼"
              priority
              onClick={openModal}
              style={{ cursor: "pointer" }}
            />
            {isModalOpen && (
              <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <CreateBoard
                  dashboardName={dashboardName}
                  setDashboardName={setDashboardName}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  handleCreate={handleCreate} // ✅ 이벤트 핸들러 직접 전달
                  onClose={closeModal}
                />
              </CustomModal>
            )}
          </div>
        </div>
        <div className={styles.scroll}>
          {items?.map((dashboard) => (
            <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
              <div className={styles.dashboardlist}>
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
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ Intersection Observer 추가 */}
        <div ref={observerRef} style={{ height: "50px", background: "red" }} />
        {isLoading && <p>Loading...</p>}
        {!hasMore && <p>No more dashboards</p>}
      </div>
    </div>
  );
}
