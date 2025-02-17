import React, { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../modal/CustomModal";
import styles from "./AddModal.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCards, uploadImage } from "../../api/dashboardApi";
import ImageUpload from "./addModal/ImageUpload";
import { useRouter } from "next/router";
import axiosInstance from "@/src/api/axios";
import TagInput from "../modals/cards/TagInput";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
  fetchCards: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  columnId,
  fetchCards,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [members, setMembers] = useState<any>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<number | null>(null);
  const [attemptSubmit, setAttemptSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get("/members", {
          params: { dashboardId },
        });
        setMembers(response.data.members);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, [dashboardId]);

  const changeUser = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(e.target.value);
    setSelectedAssignee(selectedUserId); // 담당자 ID를 상태에 저장
  };

  const isDisabled = !title || !description || !dueDate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptSubmit(true);
    if (isDisabled) return;

    setLoading(true);
    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadResult = await uploadImage(columnId, formData);
        imageUrl = uploadResult.imageUrl;
      }

      // 카드 데이터 객체
      const cardData = {
        assigneeUserId: selectedAssignee || 0, // 담당자 ID가 없으면 0을 기본값으로 설정
        dashboardId,
        columnId,
        title,
        description,
        dueDate: dueDate?.toISOString() || "", // 날짜가 없으면 빈 문자열 처리
        tags: tags.length > 0 ? tags : [], // 태그가 없으면 빈 배열 처리
        imageUrl: imageUrl || "", // 이미지 URL이 없으면 빈 문자열 처리
      };

      console.log("📝 최종 카드 데이터:", JSON.stringify(cardData, null, 2)); // 실제 API로 전송하는 데이터

      await addCards(cardData); // 카드 생성 요청
      fetchCards();
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={styles.modalContent}>
          <h2>할 일 생성</h2>
          <label>담당자</label>
          <select className={styles.input} onChange={changeUser}>
            <option value="" disabled hidden>
              담당자를 선택하세요
            </option>
            {members?.map((member: any) => (
              <option key={member.id} value={member.userId}>
                {member.nickname}
              </option>
            ))}
          </select>
          <label className={attemptSubmit && !title ? styles.errorLabel : ""}>
            제목 *{" "}
            {attemptSubmit && !title && (
              <span className={styles.requiredText}>(필수 입력)</span>
            )}
          </label>
          <input
            type="text"
            className={`${styles.input} ${
              attemptSubmit && !title ? styles.errorInput : ""
            }`}
            placeholder="제목을 입력해 주세요"
            value={title || ""} // 값이 없으면 빈 문자열로 설정하여 placeholder 보이게 처리
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            className={attemptSubmit && !description ? styles.errorLabel : ""}
          >
            설명 *{" "}
            {attemptSubmit && !description && (
              <span className={styles.requiredText}>(필수 입력)</span>
            )}
          </label>
          <textarea
            className={`${styles.textarea} ${
              attemptSubmit && !description ? styles.errorInput : ""
            }`}
            placeholder="설명을 입력해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className={attemptSubmit && !dueDate ? styles.errorLabel : ""}>
            마감일 *{" "}
            {attemptSubmit && !dueDate && (
              <span className={styles.requiredText}>(필수 입력)</span>
            )}
          </label>
          <DatePicker
            className={`${styles.date} ${
              attemptSubmit && !dueDate ? styles.errorInput : ""
            }`}
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={10}
            placeholderText="날짜를 입력해 주세요"
          />
          <label>태그</label>
          <TagInput tags={tags} setTags={setTags} />
          <label>이미지</label>
          <div className={styles.imageUpload}>
            <ImageUpload onImageUpload={setImage} />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.cancle} type="button" onClick={onClose}>
              취소
            </button>
            <button
              className={styles.create}
              type="submit"
              disabled={loading || isDisabled}
            >
              {loading ? "생성 중..." : "생성"}
            </button>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddModal;
