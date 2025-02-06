import React from "react";
import styles from "@/pages/mypage/mypage.module.scss";
import AvatarUploader from "./avataruploader";

interface ProfileCardProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export default function ProfileCard({
  nickname,
  setNickname,
  profileImage,
  setProfileImage,
}: ProfileCardProps) {
  const handleSave = () => {
    console.log("프로필 저장: ", { nickname });
  };

  return (
    <div className={styles.profileCard}>
      <h2>프로필</h2>
      <div className={styles.profileInfo}>
        <AvatarUploader profileImage={profileImage} setProfileImage={setProfileImage} />

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
  );
}
