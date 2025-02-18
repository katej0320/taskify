import React, { ChangeEvent, useEffect, useState } from "react";

import styles from "@/pages/mypage/mypage.module.scss";
import AvatarUploader from "./avataruploader";
import { updateProfile } from "@/src/api/userApi";
import axiosInstance from "@/src/api/axios";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ProfileCardProps {
  email: string;
  nickname: string;
  setNickname: (nickname: string) => void;
  recentNickname: string;
  recentProfileImg: string | StaticImport | null;
}

export default function ProfileCard({
  email,
  nickname,
  setNickname,
  recentNickname,
  recentProfileImg,
}: ProfileCardProps) {
  const [reqImage, setReqImage] = useState<File | string>("");
  const [profileImage, setProfileImage] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNicknameValue, setIsNicknameValue] = useState(recentNickname);
  const [isThumbnail, setIsThumbnail] = useState(recentProfileImg);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

 

  const handleNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameValue(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "/users/me/image",
        {
          image: reqImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = response;
      setProfileImage(data.profileImageUrl);

      setIsUpdate(true);
    } catch (err) {
      setError("프로필 업데이트에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUpdate) {
      try {
        updateProfile(nickname, profileImage);
        console.log("프로필 저장 완료", { nickname, profileImage });
        alert("프로필이 업데이트되었습니다!");
      } catch (error) {
        console.error(error);
      } finally {
        setIsUpdate(false);
        setIsDisabled(true);
      }
    }
  }, [isUpdate]);

  useEffect(() => {
    if (
      isNicknameValue !== "" &&
      isThumbnail !== "" &&
      recentProfileImg !== isThumbnail &&
      recentNickname !== isNicknameValue
    ) {
      setIsDisabled(false);
    } else if (
      isNicknameValue === "" ||
      isThumbnail === "" ||
      recentProfileImg === isThumbnail ||
      recentNickname === isNicknameValue
    ) {
      setIsDisabled(true);
    }
  }, [recentNickname, isNicknameValue, recentProfileImg, isThumbnail]);

  return (
    <div className={styles.profileCard}>
      <h2>프로필</h2>
      <div className={styles.profileInfo}>
        <AvatarUploader
          setReqImage={setReqImage}
          isThumbnail={isThumbnail}
          setIsThumbnail={setIsThumbnail}
        />
        <div className={styles.profileInputs}>
          <div className={styles.profileInputGroup}>
            <label>이메일</label>
            <input type="email" value={email} disabled />
          </div>

          <div className={styles.profileInputGroup}>
            <label>닉네임</label>
            <input
              type="text"
              defaultValue={recentNickname}
              onChange={(e) => {
                handleNicknameInput(e);
              }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className={styles.saveButton}
        disabled={isDisabled}
      >
        {loading ? "저장 중" : "저장"}
      </button>
    </div>
  );
}
