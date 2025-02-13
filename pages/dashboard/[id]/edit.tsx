import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import styles from "../index.module.scss";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import BackLocation from "@/src/components/dashboard/edit/BackLocation";
import BebridgeContainer from "@/src/components/dashboard/edit/BebridgeContainer";
import DeleteContainer from "@/src/components/dashboard/edit/DeleteContainer";
import InvitationContainer from "@/src/components/dashboard/edit/InvitationContainer";
import MemberContainer from "@/src/components/dashboard/edit/MemberContainer";
import { EditProvider } from "@/src/contexts/EditDashboardProvider";

const Contents = styled.div`
  width: calc(100vw * 375 / 1200);
  min-width: 600px;

  @media (max-width: 1300px) {
    width: 100%;
    min-width: 100%;
  }
`;

export default function EditPage() {
  const router = useRouter();
  const dashboardId = router.query.id;

  return (
    <>
      <Head>
        <title>Taskify - 대시보드 수정</title>
      </Head>
      <div className={styles.contents}>
        <SideBar />
        <NavBar />
        <div className={styles.content}>
          <Contents>
            <EditProvider dashboardId={dashboardId}>
              <BackLocation />
              <BebridgeContainer dashboardId={dashboardId} />
              <MemberContainer />
              <InvitationContainer />
              <DeleteContainer dashboardId={dashboardId} />
            </EditProvider>
          </Contents>
        </div>
      </div>
    </>
  );
}
