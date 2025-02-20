import React, { useState, useEffect } from "react";
import StatusAssigneeSection from "./StatusAssigneeSection";
import { getColumns } from "@/src/api/columns";
import { getInvitations } from "@/src/api/invitations";
import { updateCard } from "@/src/api/cards";
import TagInput from "./TagInput";
import DateInputField from "./DateInputField";
import InputField from "./InputField";
import TaskImageUpload from "./TaskImageUpload";
import CustomTaskEditModal from "./CustomTaskEditModal";
import { getMembers } from "@/src/api/members";

// Task 타입 정의
interface Task {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assigneeUserId: number | null; // 수정된 부분
  columnId: number | null; // 수정된 부분
  imageUrl: string | null;
}

interface Assignee {
  id: number;
  userId: number;
  nickname: string;
}

interface Column {
  id: number;
  title: string;
}

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  fetchCards: () => void;
  dashboardId: number;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  isOpen,
  onClose,
  task,
  fetchCards,
  dashboardId,
}) => {
  const [formData, setFormData] = useState<Task>({
    ...task,
    assigneeUserId: task.assigneeUserId ?? null,
    imageUrl: task.imageUrl || null,
  });
  const [columns, setColumns] = useState<Column[]>([]);
  const [assigneeList, setAssigneeList] = useState<Assignee[]>([]);
  const [tags, setTags] = useState<string[]>(task.tags || []);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(task.imageUrl);

  useEffect(() => {
    if (!isOpen) return;
    const fetchColumns = async () => {
      try {
        const data = await getColumns(dashboardId);
        setColumns(data);
        if (task.columnId) {
          const selectedColumn = data.find((col) => col.id === task.columnId);
          if (selectedColumn) {
            setFormData((prev) => ({ ...prev, columnId: selectedColumn.id }));
          }
        }
      } catch (error) {
        console.error("❌ 컬럼 목록 조회 실패:", error);
      }
    };

    const fetchAssignees = async () => {
      try {
        console.log("🟢 현재 dashboardId:", dashboardId); // ✅ dashboardId 확인

        if (!dashboardId || isNaN(Number(dashboardId))) {
          console.error("❌ 잘못된 dashboardId:", dashboardId);
          return;
        }

        const data = await getMembers(dashboardId); // ✅ getMembers 호출
        console.log("🟢 getMembers 응답:", data);

        if (!Array.isArray(data.members)) {
          console.warn("⚠ API 응답에 members 키가 없음. 빈 배열 사용.");
          setAssigneeList([]); // ✅ members가 없을 경우 안전하게 빈 배열 설정
          return;
        }

        const mappedAssignees = data.members.map((member: any) => ({
          id: member.id,
          userId: Number(member.userId),
          nickname: member.nickname,
        }));

        console.log("🟢 변환된 담당자 리스트:", mappedAssignees);
        setAssigneeList(mappedAssignees);
      } catch (error) {
        console.error("❌ getMembers API 호출 실패:", error);
      }
    };

    if (isOpen) {
      fetchColumns();
      fetchAssignees();
    }
  }, [isOpen, dashboardId, task.columnId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData: Task = {
        ...formData,
        assigneeUserId: formData.assigneeUserId ?? null,
        columnId: formData.columnId ?? null,
        imageUrl: image ? URL.createObjectURL(image) : formData.imageUrl,
        dueDate: formData.dueDate || "",
      };

      await updateCard(task.id, updatedData);
      fetchCards();
      onClose();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
    setFormData({
      ...formData,
      imageUrl: file ? URL.createObjectURL(file) : null,
    });
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  if (!isOpen || !task) return null;

  return (
    <CustomTaskEditModal
      isOpen={isOpen}
      onClose={onClose}
      width="584px"
      height="auto"
    >
      <form onSubmit={handleSave}>
        <StatusAssigneeSection
          columns={columns}
          formData={formData}
          setFormData={setFormData}
          assigneeList={assigneeList}
        />

        <InputField
          label="제목 *"
          name="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <InputField
          label="설명 *"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <DateInputField
          label="마감일 *"
          selectedDate={formData.dueDate ? new Date(formData.dueDate) : null}
          onDateChange={(date) =>
            setFormData({
              ...formData,
              dueDate: date ? date.toISOString() : null,
            })
          }
        />

        <TagInput tags={tags} setTags={setTags} />

        <TaskImageUpload
          imageUrl={previewUrl}
          onImageChange={handleImageChange}
        />

        <div className="modalButtons">
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="submit">수정</button>
        </div>
      </form>
    </CustomTaskEditModal>
  );
};

export default TaskEditModal;
