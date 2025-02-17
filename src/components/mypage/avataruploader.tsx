import React, { useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react"; // ✅ X(삭제) 아이콘 가져오기
import styles from "@/pages/mypage/mypage.module.scss";

interface AvatarUploaderProps {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export default function AvatarUploader({ profileImage, setProfileImage }: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // ✅ 삭제 버튼 클릭 시 이미지 제거 및 파일 입력 필드 초기화
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.avatarContainer}>
      {/* ✅ 프로필 이미지와 파일 업로드 */}
      <label className={styles.avatarUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          hidden
        />
        {profileImage ? (
          <div className={styles.avatarWrapper}>
            <Image
              src={profileImage}
              alt="Profile"
              className={styles.avatar}
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className={styles.avatarPlaceholder}>+</div>
        )}
        {/* ✅ X(삭제) 버튼을 프로필 이미지가 있을 때만 표시 */}
      {profileImage && (
        <button className={styles.removeButton} onClick={handleRemoveImage}>
          <X size={20} color="white" />
        </button>
      )}
      </label>

      
    </div>
  );
}
