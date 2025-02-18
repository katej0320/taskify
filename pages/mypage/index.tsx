"use client";

import React from "react";
import useSWR from "swr";
import { getUser } from "@/src/api/userApi";
import { User } from "@/src/types/users";
import styled from "styled-components";
import styles from "./mypage.module.scss";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import ProfileSettings from "@/src/components/mypage/profilesetting";
import useAuth from "@/src/hooks/useRequireAuth";

const Container = styled.div`
  width: calc(100vw * 375 / 1200);
  min-width: 600px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
  @media (max-width: 1300px) {
    width: 100%;
    min-width: 100%;
  }
`;

export default function MyPage() {
  const loading = useAuth(); // ✅ 로그인 상태 체크

  if (loading) return null; // ✅ 로딩 중일 때 아무것도 렌더링하지 않음
  // useSWR로 사용자 데이터 요청
  const { data: user, error } = useSWR<User>("12-1/users", getUser);

  if (error) return <p>데이터 오류 발생 </p>;
  if (!user) return <p>로딩 중</p>;

  return (
    <>
      <div className={styles.contents}>
        <NavBar />
        <SideBar />
        <div className={styles.content}>
          <Container>
            <ProfileSettings user={user} />
          </Container>
        </div>
      </div>
    </>
  );
}
