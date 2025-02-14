import React, { useState } from "react";
import CustomModal from "../modal/CustomModal";
import styles from "./AddModal.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCards } from "../../api/dashboardApi"; // API 함수 import

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
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

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

  // ✅ 카드 생성
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

  // ✅ 이미지 업로드 함수 (임시)
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

        {/* 에러 메시지 */}
        {error && <p className={styles.error}>{error}</p>}

        {/* 버튼 */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.createButton}
            onClick={handleCreateCard}
            disabled={loading}
          >
            {loading ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddModal;
