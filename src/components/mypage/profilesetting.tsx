"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/pages/mypage/mypage.module.scss";
import ProfileCard from "./profilecard";
import PasswordCard from "./passwordcard";
import { User } from "@/src/types/users";
import IconBack from "@/public/images/dashboard/edit/ic_back.svg";

interface ProfileSettingsProps {
  user: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { nickname: recentNickname, profileImageUrl: recentProfileImg } = user;

  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  return (
    <div className={styles.profileSettings}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <IconBack /> <span>돌아가기</span>
      </button>

      <ProfileCard
        nickname={nickname}
        recentNickname={recentNickname}
        email={user.email}
        setNickname={setNickname}
        recentProfileImg={recentProfileImg}
      />

      <PasswordCard />
      {loading && <p>저장 중...</p>}
    </div>
  );
};

export default ProfileSettings;
