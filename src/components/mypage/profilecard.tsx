import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
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
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  const [isNicknameValue, setIsNicknameValue] = useState(recentNickname);
  const [isThumbnail, setIsThumbnail] = useState(recentProfileImg);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null); // 오류 상태 관리

  const router = useRouter(); // router 선언 추가

  const handleNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameValue(e.target.value);
  };

  // handleSave 함수에 async 추가
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
      console.error("프로필 업데이트 오류:", err);
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
        // 성공 시 마이페이지로 이동
        // router.push("/mypage");
      } catch (error) {
        console.error(error);
      } finally {
        setIsUpdate(false);
        setIsDisabled(true);
      }
    }
  }, [isUpdate]);

  useMemo(() => {
    // Swagger 요구 사항으로, 프로필 이미지와 닉네임의 값이 모두 기존 값과 달라야 저장이 가능
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
          <button
            onClick={handleSave} // 클릭 시 handleSave 실행
            className={styles.saveButton}
            disabled={isDisabled}
          >
            {loading ? "저장 중" : "저장"}
          </button>
        </div>
      </div>

      {/* {error && <p className={styles.error}>{error}</p>} */}
    </div>
  );
}
