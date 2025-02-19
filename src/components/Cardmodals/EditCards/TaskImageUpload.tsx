// src/components/TaskCards/ImageUpload.tsx
import React from "react";

interface TaskImageUploadProps {
  imageUrl: string | null;
  onImageChange: (file: File | null) => void; // 이미지 변경시 호출될 함수
}

const TaskImageUpload: React.FC<TaskImageUploadProps> = ({
  imageUrl,
  onImageChange,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onImageChange(file); // 부모 컴포넌트에 전달
  };

  return (
    <div>
      <label>이미지 업로드</label>
      <input type="file" onChange={handleImageChange} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Image Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}{" "}
      {/* 이미지 미리보기 */}
    </div>
  );
};

export default TaskImageUpload;
