import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/pages/mypage/mypage.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface AvatarUploaderProps {
  setReqImage: React.Dispatch<SetStateAction<File | string>>;
  isThumbnail: string | StaticImport | null;
  setIsThumbnail: React.Dispatch<SetStateAction<string | StaticImport | null>>;
}

export default function AvatarUploader({
  setReqImage,
  isThumbnail,
  setIsThumbnail,
}: AvatarUploaderProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReqImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className={styles.avatarUpload}>
      <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      {isThumbnail ? (
        <Image
          src={isThumbnail}
          alt="Profile"
          className={styles.avatar}
          width={100}
          height={100}
        />
      ) : (
        <div className={styles.avatarPlaceholder}>+</div>
      )}
      {/* {recentProfileImg && (
        <Image src={recentProfileImg} alt="미리보기" width={30} height={30} />
      )} */}
    </label>
  );
}

