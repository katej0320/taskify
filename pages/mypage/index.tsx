import React, { useState } from "react";
import styles from "./mypage.module.scss";

export default function Page() {
  const [nickname, setNickname] = useState("장보배");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSave = () => {
    console.log("프로필 저장: ", { nickname });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("비밀번호 변경: ", { currentPassword, newPassword });
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
    <div className={styles.profileSettings}>
      <div className={styles.profileCard}>
        <h2>프로필</h2>
        <div className={styles.profileInfo}>
          <label className={styles.avatarUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            {profileImage ? (
              <img src={profileImage} alt="Profile" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>+</div>
            )}
          </label>
          <div className={styles.profileInputs}>
           
            <div className={styles.profileInputGroup}>
              <label>이메일</label>
              <input
                type="email"
                value="johndoe@gmail.com"
                disabled
              />
            </div>
  
            <div className={styles.profileInputGroup}>
              <label>닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={handleSave} className={styles.saveButton}>저장</button>
      </div>

      <div className={styles.passwordCard}>
        <h2>비밀번호 변경</h2>
        <div className={styles.passwordInputGroup}>
          <label>현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className={styles.passwordInputGroup}>
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={styles.passwordInputGroup}>
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleChangePassword} className={styles.changeButton}>변경</button>
      </div>
    </div>
  );
}
