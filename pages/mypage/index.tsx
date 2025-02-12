"use client";

import React from "react";
import useSWR from "swr";
import { getUser } from "@/src/api/userApi"; // 수정된 getUser 함수
import { User } from "@/src/types/users"; // User 타입 임포트
import styles from "./mypage.module.scss";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import ProfileSettings from "@/src/components/mypage/profilesetting";

export default function MyPage() {
  // useSWR로 사용자 데이터 요청
  const { data: user, error } = useSWR<User>("/users/me", getUser); // <User> 타입 지정

  if (error) return <p>데이터를 불러오는 중 오류 발생 😥</p>;
  if (!user) return <p>로딩 중...</p>;

  return (
    <div className={styles.global}>
      <NavBar />
      <SideBar />
      {/* user 데이터를 ProfileSettings에 전달 */}
      <ProfileSettings user={user} />
    </div>
  );
}


