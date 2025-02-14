"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/pages/mypage/mypage.module.scss";
import ProfileCard from "./profilecard";
import PasswordCard from "./passwordcard";
import { updateProfile } from "@/src/api/userApi"; 
import { User } from "@/src/types/users"; 

interface ProfileSettingsProps {
  user: User; 
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const router = useRouter();

  const [nickname, setNickname] = useState(user.nickname); 
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 오류 상태 관리

  // 프로필 업데이트 함수 (비동기)
  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);

    try {
      // API 호출 (nickname과 profileImage를 업데이트)
      const result = await updateProfile(nickname, profileImage);
      console.log("프로필 수정 완료:", result);
  
      // 성공 시 마이페이지로 리다이렉트
      router.push("/mypage");
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
  
      // 오류 메시지 설정 (에러 유형에 따라 메시지 다르게 설정 가능)
      if (error instanceof Error) {
        setError(error.message || "프로필 업데이트에 실패했습니다.");
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      // 로딩 상태 해제
      setLoading(false);
    }
  };

  // useEffect에서 프로필 업데이트 처리
  useEffect(() => {
    // 컴포넌트가 렌더링되었을 때 한 번만 호출
    handleSaveChanges();
  }, [nickname, profileImage]); // nickname 또는 profileImage가 변경될 때마다 호출

  return (
    <div className={styles.global}>
      <div className={styles.profileSettings}>
        <button className={styles.backButton} onClick={() => router.back()}>
          &lt; 돌아가기
        </button>

        <ProfileCard
          nickname={nickname}
          email={user.email}
          setNickname={setNickname}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        
        <PasswordCard />

        {/* 로딩 중일 때 표시 */}
        {loading && <p>저장 중...</p>}

        {/* 오류 메시지 표시 */}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileSettings;
