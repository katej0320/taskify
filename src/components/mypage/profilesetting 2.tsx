"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/pages/mypage/mypage.module.scss";
import ProfileCard from "./profilecard";
import PasswordCard from "./passwordcard";

export default function ProfileSettings() {
  const router = useRouter();
  const [nickname, setNickname] = useState("장보배");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <div className={styles.global}>
      <div className={styles.profileSettings}>
        <button className={styles.backButton} onClick={() => router.back()}>
          &lt; 돌아가기
        </button>
        <ProfileCard
          nickname={nickname}
          setNickname={setNickname}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <PasswordCard />
      </div>
    </div>
  );
}
