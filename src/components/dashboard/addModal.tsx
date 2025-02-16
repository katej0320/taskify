import React, { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../modal/CustomModal";
import styles from "./AddModal.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCards } from "../../api/dashboardApi";
import ImageUpload from "./addModal/ImageUpload";
import { useRouter } from "next/router";
import axiosInstance from "@/src/api/axios";
import TaskTags from "../modals/cards/TaskTags";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number; // columnId를 부모로부터 받아옵니다
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
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [members, setMembers] = useState<any>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<number | null>(null);

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
  }, []);

  const changeUser = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssignee(Number(e.target.value));
  };

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

  const handleCreateCard = async () => {
    if (!title || !description || !dueDate || selectedAssignee === null) {
      setError("제목, 설명, 마감일은 필수 입력 항목입니다.");
      return;
    }
    setError(null);

    const cardData = {
      assigneeUserId: selectedAssignee,
      dashboardId,
      columnId,
      title,
      description,
      dueDate:
        dueDate.toISOString().split("T")[0] +
        " " +
        dueDate.toISOString().split("T")[1].slice(0, 5),
      tags,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/12-1_44989_1739532858828.png", // 이미지 URL은 이미지 업로드 후 반환된 URL로 설정
    };

    try {
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
      }

      // 카드 생성 API 호출
      await addCards(cardData);
      fetchCards();

      // 이미지가 있으면 업로드 후 imageUrl을 업데이트
      // if (image) {
      //   const uploadResult = await uploadImage(formData);
      //   cardData.imageUrl = uploadResult.url; // 이미지 업로드 후 URL 저장
      // }
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
      setError("카드를 추가하는 중 오류가 발생했습니다.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(null);
    setTags([]);
    setTagInput("");
    setImage(null);
    setSelectedAssignee(null);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2>할 일 생성</h2>

        <label>담당자</label>
        <select className={styles.input} onChange={changeUser}>
          {members?.map((member: any) => {
            return (
              <option key={member.id} value={member.userId}>
                {member.nickname}
              </option>
            );
          })}
          <option disabled hidden selected>
            담당자를 선택하세요
          </option>
        </select>

        <label>제목 *</label>
        <input
          type="text"
          className={styles.input}
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>설명 *</label>
        <textarea
          className={styles.textarea}
          placeholder="설명을 입력해 주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

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

        <label>태그</label>
        <input
          type="text"
          className={styles.input}
          placeholder="입력 후 Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyPress}
        />
        <TaskTags tags={tags} />

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
