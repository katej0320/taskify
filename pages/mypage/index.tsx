"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./mypage.module.scss";
import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import Image from "next/image";

export default function ProfileSettings() {
  const router = useRouter();
  const [nickname, setNickname] = useState("장보배");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    console.log("프로필 저장: ", { nickname });
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    
    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("비밀번호 변경: ", { currentPassword, newPassword });
    setErrorMessage("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.global}>
    <NavBar></NavBar>
    <SideBar></SideBar>
    <div className={styles.profileSettings}>
      {/* 돌아가기 버튼 */}
      <button className={styles.backButton} onClick={() => router.back()}>
        &lt; 돌아가기
      </button>

      <div className={styles.profileCard}>
        <h2>프로필</h2>
        <div className={styles.profileInfo}>
          <label className={styles.avatarUpload}>
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            {profileImage ? (
              <Image src={profileImage} alt="Profile" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>+</div>
            )}
          </label>

          <div className={styles.profileInputs}>
            <div className={styles.profileInputGroup}>
              <label>이메일</label>
              <input type="email" value="johndoe@gmail.com" disabled />
            </div>

            <div className={styles.profileInputGroup}>
              <label>닉네임</label>
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>
          </div>
        </div>
        <button onClick={handleSave} className={styles.saveButton}>
          저장
        </button>
      </div>

      <div className={styles.passwordCard}>
        <h2>비밀번호 변경</h2>

        <div className={styles.passwordInputGroup}>
          <label>현재 비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>

        <div className={styles.passwordInputGroup}>
          <label>새 비밀번호</label>
          <input type="password" placeholder="새 비밀번호 입력" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        <div className={styles.passwordInputGroup}>
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="새 비밀번호 입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (confirmPassword && newPassword !== confirmPassword) {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
              } else {
                setErrorMessage("");
              }
            }}
            className={newPassword !== confirmPassword && confirmPassword ? styles.errorInput : ""}
          />
          {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
        </div>

        <button
          onClick={handleChangePassword}
          className={styles.changeButton}
          disabled={!currentPassword || !newPassword || !confirmPassword}
        >
          변경
        </button>
      </div>
    </div>
    </div>
  );
};

