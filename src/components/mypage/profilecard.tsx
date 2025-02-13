import Image from "next/image";
import React from "react";

interface ProfileCardProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  nickname,
  setNickname,
  profileImage,
  setProfileImage,
}) => {
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>프로필 카드</h3>
      <div>
        <label>닉네임:</label>
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력하세요"
        />
      </div>
      <div>
        <label>프로필 이미지:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
        {profileImage && <Image src={profileImage} alt="프로필 이미지" />}
      </div>
    </div>
  );
};

export default ProfileCard;

