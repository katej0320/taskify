import React, { useState } from "react";
import CustomModal from "../modal/CustomModal";
import styles from "./AddModal.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCards } from "../../api/dashboardApi";
import Image from "next/image";
import ImageUpload from "./addModal/ImageUpload";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number; // columnId를 부모로부터 받아옵니다
  dashboardId: number; // dashboardId를 부모로부터 받아옵니다
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  columnId,
  dashboardId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleCreateCard = async () => {
    if (!title || !description || !dueDate) {
      setError("제목, 설명, 마감일은 필수 입력 항목입니다.");
      return;
    }

    setLoading(true);
    setError(null);

    const cardData = {
      assigneeUserId: 5157,
      dashboardId,
      columnId,
      title,
      description,
      dueDate: dueDate.toISOString(), // 서버에 맞는 형식으로 변환
      tags,
      imageUrl: "", // 이미지 URL은 이미지 업로드 후 반환된 URL로 설정
    };

    try {
      // 이미지 파일이 있으면 FormData로 전송
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
      }

      // 카드 생성 API 호출
      const result = await addCards(columnId, cardData);

      // 이미지가 있으면 업로드 후 imageUrl을 업데이트
      if (image) {
        const uploadResult = await uploadImage(formData);
        cardData.imageUrl = uploadResult.url; // 이미지 업로드 후 URL 저장
      }

      // 카드 추가 성공 시 모달 닫기
      onClose();
      setLoading(false);
    } catch (error) {
      console.error("Error adding card:", error);
      setError("카드를 추가하는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const uploadImage = async (formData: FormData) => {
    try {
      // 실제 이미지 업로드 API 호출 필요
      // 예시로 임의의 URL 반환
      return { url: "https://example.com/image.jpg" };
    } catch (error) {
      console.error("Image upload error:", error);
      throw new Error("이미지 업로드 실패");
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2>할 일 생성</h2>

        <label>담당자</label>
        <select className={styles.input}>
          <option value="">이름을 입력해 주세요</option>
        </select>

        {/* 제목 입력 */}
        <label>제목 *</label>
        <input
          type="text"
          className={styles.input}
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 설명 입력 */}
        <label>설명 *</label>
        <textarea
          className={styles.textarea}
          placeholder="설명을 입력해 주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* 마감일  */}
        <label>마감일 *</label>
        <DatePicker
          className={styles.date}
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="yyyy-MM-dd HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          placeholderText="날짜를 입력해 주세요"
        />
        {/* 태그 입력 */}
        <label>태그</label>
        <input
          type="text"
          className={styles.input}
          placeholder="입력 후 Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyPress}
        />
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag} <button onClick={() => handleRemoveTag(index)}>✕</button>
            </span>
          ))}
        </div>

        <label>이미지</label>
        <div className={styles.imageUpload}>
          <ImageUpload />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonGroup}>
          <button className={styles.cancle} onClick={onClose}>
            취소
          </button>
          <button className={styles.create} onClick={handleCreateCard}>
            생성
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddModal;
