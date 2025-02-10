"use client";

import React from "react";
import ProfileSettings from "@/src/components/mypage/profilesetting";
import styles from "./mypage.module.scss";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";

export default function MyPage() {
  return (
    <div className={styles.global}>
      <NavBar />
      <SideBar />
      <ProfileSettings />
    </div>
  );
}
