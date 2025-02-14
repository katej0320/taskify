// src/components/mypage/profilesetting.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/pages/mypage/mypage.module.scss";
import ProfileCard from "./profilecard";
import PasswordCard from "./passwordcard";
import { updateProfile } from "@/src/api/userApi"; // API 함수 임포트
import { User } from "@/src/types/users"; // User 타입 임포트

// ProfileSettingsProps 타입 정의
interface ProfileSettingsProps {
  user: User; // user를 User 타입으로 받음
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const router = useRouter();
  
  // 상태 관리
  const [nickname, setNickname] = useState(user.nickname); // 기본값을 user.nickname으로 설정
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 오류 상태 관리

  const handleSaveChanges = async () => {
    setLoading(true); // 로딩 상태 시작
    setError(null); // 이전 오류 초기화

    try {
      // API 호출
      const result = await updateProfile(nickname, profileImage);
      console.log("프로필 수정 완료:", result);

      // 성공 시, 다른 페이지로 이동하거나 알림 표시
      router.push("/mypage"); // 마이페이지로 리다이렉트
    } catch (error) {
      setError("프로필 업데이트에 실패했습니다."); // 오류 처리
      console.error("프로필 업데이트 오류:", error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className={styles.global}>
      <div className={styles.profileSettings}>
        <button className={styles.backButton} onClick={() => router.back()}>
          &lt; 돌아가기
        </button>

        <h2>프로필 수정</h2>

        <ProfileCard
          nickname={nickname}
          setNickname={setNickname}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        
        <PasswordCard />
        
        {/* 저장 버튼 */}
        <button
          className={styles.saveButton}
          onClick={handleSaveChanges}
          disabled={loading} // 로딩 중에는 버튼 비활성화
        >
          {loading ? "저장 중..." : "저장"}
        </button>

        {/* 오류 메시지 표시 */}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileSettings;
