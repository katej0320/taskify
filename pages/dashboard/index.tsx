"use client";

import { useEffect, useState } from "react";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import styles from "./index.module.scss";
import { getDashboard, getInviteList } from "@/src/api/api";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import Pagination from "@/src/components/pagination/Pagination";
import Image from "next/image";
import SearchBar from "@/src/components/dashboardlist/invite/SearchBar";
import None from "@/src/components/dashboardlist/invite/none";
import Link from "next/link";

export default function MyDashboardPage() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { dashboards = [] } = await getDashboard();
        const { invitations = [] } = await getInviteList();
        setDashboards(dashboards);
        setInvitations(invitations);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.contents}>
      <SideBar dashboards={dashboards} />
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
              <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
                <ListCard>
                  <div
                    className={styles.colorCircle}
                    style={{ backgroundColor: dashboard.color }}
                  ></div>
                  <div>{dashboard.title}</div>
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
          {/* 페이지네이션 버튼 */}
          <div className={styles.pagination}>
            <Pagination />
          </div>
        </div>
        {/* 초대받은 대시보드 컴포넌트화 */}
        <div className={styles.inviteContent}>
          <h2>초대받은 대시보드</h2>
          {invitations.length > 0 ? (
            invitations.map((invite) => (
              <div key={invite.id}>
                <SearchBar />
                <div>{invite.dashboard.title}</div>
                <div>{invite.dashboard.title}</div>
              </div>
            ))
          ) : (
            <None />
          )}
        </div>
      </div>
    </div>
  );
}
