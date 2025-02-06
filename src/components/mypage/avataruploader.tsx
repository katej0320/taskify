import React from "react";
import Image from "next/image";
import styles from "@/pages/mypage/mypage.module.scss";

interface AvatarUploaderProps {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export default function AvatarUploader({ profileImage, setProfileImage }: AvatarUploaderProps) {
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
    <label className={styles.avatarUpload}>
      <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      {profileImage ? (
        <Image src={profileImage} alt="Profile" className={styles.avatar} width={100} height={100} />
      ) : (
        <div className={styles.avatarPlaceholder}>+</div>
      )}
    </label>
  );
}
