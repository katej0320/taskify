import React, { useState } from "react";
import CustomModal from "../modal/CustomModal";
import styles from "./AddModal.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ✅ 태그 입력
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  // ✅ 태그 삭제
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // ✅ 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2>할 일 생성</h2>

        {/* 담당자 선택 */}
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
        <label>마감일</label>
        <DatePicker
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
          onKeyPress={handleTagKeyPress}
        />
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag} <button onClick={() => handleRemoveTag(index)}>✕</button>
            </span>
          ))}
        </div>

        {/* 이미지 업로드 */}
        <label>이미지</label>
        <div className={styles.imageUpload}>
          <input type="file" onChange={handleImageUpload} />
          {image && <p>{image.name}</p>}
        </div>

        {/* 버튼 */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={styles.createButton}>생성</button>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddModal;
