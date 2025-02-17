"use client";

import styles from "./SideBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CustomModal from "../modal/CustomModal";
import CreateBoard from "../dashboardlist/createDashboard/createDashboard";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "@/src/api/axios";
import { Dashboard } from "@/src/types/dashboard";

export default function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(60);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchDashboards = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get("/dashboards", {
        params: { navigationMethod: "infiniteScroll", page, size },
      });
      setDashboards((prev) => [...prev, ...res.data.dashboards]);
      setHasMore(
        res.data.totalCount > dashboards.length + res.data.dashboards.length
      );
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("대시보드 불러오기 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchDashboards();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarcontent}>
        <Link href="/dashboard">
          <Image
            style={{ margin: "-5px" }}
            src={
              isMobile ? "/icons/mobile-logo.svg" : "/icons/dashboardlogo.svg"
            }
            width={isMobile ? 80 : 110}
            height={isMobile ? 35 : 40}
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
                  setDashboardName={() => {}}
                  selectedColor={""}
                  setSelectedColor={() => {}}
                  handleCreate={() => Promise.resolve()}
                />
              </CustomModal>
            )}
          </div>
        </div>

        <div className={styles.scroll}>
          {dashboards.map((dashboard, index) => (
            <Link
              key={`${dashboard.id}-${index}`}
              href={`/dashboard/${dashboard.id}`}
            >
              <div className={styles.dashboardlist}>
                <div
                  className={styles.colorCircle}
                  style={{ backgroundColor: dashboard.color }}
                ></div>
                <div className={styles.showNone}>{dashboard.title}</div>
                {dashboard.createdByMe && (
                  <Image
                    className={styles.showNone}
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

        <div ref={observerRef} style={{ height: "20px" }} />
        {loading && <p>로딩 중...</p>}
        {!hasMore && !loading && <p>더 이상 대시보드가 없습니다.</p>}
      </div>
    </div>
  );
}
