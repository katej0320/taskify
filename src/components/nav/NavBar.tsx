"use client";

import Image from "next/image";
import styles from "./NavBar.module.scss";
import { useEffect, useState } from "react";
import { useDashboard } from "@/src/contexts/DashBoardContext"; // 예제
import Link from "next/link";
import { useRouter } from "next/router";
import { getMe } from "@/src/api/meApi";
import { InviteButton } from "../dashboard/edit/InviteButton";
import { useEdit } from "@/src/contexts/dashboard/edit/EditDashboardProvider";

export default function NavBar() {
  const router = useRouter();
  const params = router.query.id;
  const pathname = router.asPath;
  const { dashboards } = useDashboard();

  console.log(router.route === `/dashboard/[id]`);

  const [headerTitle, setHeaderTitle] = useState("내 대시보드");
  const [userData, setUserData] = useState<any>(null);

  // 초대하기 생성 후 초대 내역 리스트 업데이트 02.16_혜림
  const [updateInvite, setUpdateInvite] = useState(false);
  const { getInvitations } = useEdit();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getMe();
        setUserData(user); // 유저 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // 이 부분은 컴포넌트가 처음 렌더링될 때만 실행

  useEffect(() => {
    if (!pathname) return; // pathname이 null이면 실행 안 함

    // 대시보드 ID가 URL에서 추출된 경우
    if (pathname.startsWith("/dashboard/") && params) {
      const dashboardId = Number(params);

      // 대시보드가 존재하는지 확인
      const dashboard = dashboards.find((d) => d.id === dashboardId);

      // 대시보드가 있으면 제목을 설정하고, 없으면 잘못된 페이지라고 설정
      setHeaderTitle(dashboard ? dashboard.title : "잘못된 상세 페이지");
    } else {
      setHeaderTitle("내 대시보드");
    }
  }, [pathname, params, dashboards]);

  // 초대하기 생성 후 초대 내역 리스트 업데이트 02.16_혜림
  useEffect(() => {
    if (updateInvite) getInvitations();

    setUpdateInvite(false);
  }, [updateInvite]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <span className={styles.dashboardTitle}>{headerTitle}</span>
        </div>
        <div className={styles.rightSection}>
          {/* 대시보드 상세 및 수정 페이지에서만 활성화 02.16_혜림 */}
          {(router.route === `/dashboard/[id]` ||
            router.route === `/dashboard/[id]/edit`) && (
            <>
              {/* 수정 페이지 링크 추가 02.15_혜림 */}
              <Link href={`/dashboard/${params}/edit`}>
                <button className={styles.navButton}>
                  <Image
                    src="/icons/settings.svg"
                    width={20}
                    height={20}
                    alt="설정"
                  />
                  관리
                </button>
              </Link>
              {/* 초대하기 모달 및 기능 연동 02.15_혜림 */}
              <InviteButton
                $nav
                dashboardId={params}
                setUpdateInvite={setUpdateInvite}
              >
                <Image
                  src="/icons/add_box.svg"
                  width={20}
                  height={20}
                  alt="초대"
                />
                초대하기
              </InviteButton>
              <div>
                <hr className={styles.hr} />
              </div>
            </>
          )}
          <Link href="/mypage">
            <div className={styles.profile}>
              <span className={styles.profileIcon}>
                {userData ? userData.email[0] : "?"}
              </span>
              <span className={styles.profileName}>
                {userData ? userData.nickname : "로딩중..."}
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
