"use client";

import { useEffect, useState } from "react";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import styles from "./index.module.scss";
import { getDashboard, getInviteList } from "@/src/api/dashboardApi";
import None from "@/src/components/dashboardlist/invite/none";
import InviteDashboardList from "@/src/components/dashboardlist/invite/InviteList";
import NewDashboardCard from "@/src/components/dashboardlist/newDashBoard";
import DashboardList from "@/src/components/dashboardlist/DashBoardList";

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
      <SideBar />
      <NavBar />
      <div className={styles.content}>
        <div>
          <div className={styles.dashboard}>
            {/* 새로운 대시보드 컴포넌트 */}
            <NewDashboardCard />

            {/* 대시보드 리스트 컴포넌트 */}
            <DashboardList dashboards={dashboards} />
          </div>

          {/* 페이지네이션 버튼
          <div className={styles.pagination}>
            <Pagination />
          </div> */}
        </div>

        {/* 초대받은 대시보드 */}
        <div className={styles.inviteContent}>
          <h2>초대받은 대시보드</h2>
          {invitations.length > 0 ? (
            <InviteDashboardList invitations={invitations} />
          ) : (
            <None />
          )}
        </div>
      </div>
    </div>
  );
}
