// src/components/TaskCards/ImageUpload.tsx
import React, { useRef } from "react";
import styles from "./TaskImageUpload.module.scss";

interface TaskImageUploadProps {
  imageUrl: string | null;
  onImageChange: (file: File | null) => void; // 이미지 변경시 호출될 함수
}

const TaskImageUpload: React.FC<TaskImageUploadProps> = ({
  imageUrl,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onImageChange(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.uploadContainer}>
      {/* ✅ 제목, 설명과 같은 스타일로 "이미지" 텍스트 수정 */}
      <span className={styles.uploadLabel}>이미지</span>

      <div className={styles.uploadBox} onClick={handleClick}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className={styles.uploadPreview}
          />
        ) : (
          <span className={styles.uploadIcon}>+</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className={styles.hiddenInput}
      />
    </div>
  );
};

export default TaskImageUpload;
