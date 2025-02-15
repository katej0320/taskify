"use client";

import styles from "./SideBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CustomModal from "../modal/CustomModal";
import CreateBoard from "../dashboardlist/createDashboard/createDashboard";
import { useState } from "react";

import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
import { Dashboard } from "@/src/types/dashboard";

export default function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  //무한스크롤롤
  const { items, isLoading, hasMore, observerRef } =
    useInfiniteScroll<Dashboard>({
      endpoint: "/dashboards",
      queryParams: { navigationMethod: "infiniteScroll", size: 100 },
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
                  onClose={closeModal}
                  dashboardName={""}
                  setDashboardName={function (name: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  selectedColor={""}
                  setSelectedColor={function (color: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  handleCreate={function (): Promise<void> {
                    throw new Error("Function not implemented.");
                  }}
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
                {dashboard.createdByMe && (
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
