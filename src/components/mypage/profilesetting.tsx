"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/pages/mypage/mypage.module.scss";
import ProfileCard from "./profilecard";
import PasswordCard from "./passwordcard";
import { User } from "@/src/types/users";

interface ProfileSettingsProps {
  user: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { nickname: recentNickname, profileImageUrl:recentProfileImg } = user;

  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

 
  return (
    <div className={styles.global}>
      <div className={styles.profileSettings}>
        <button className={styles.backButton} onClick={() => router.back()}>
          &lt; 돌아가기
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
    </div>
  );
};

export default ProfileSettings;

