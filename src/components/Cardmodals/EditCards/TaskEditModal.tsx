import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "../CustomModal"; // CustomModal은 그대로 사용
import { updateCard } from "../../../api/cards";
import { getColumns } from "../../../api/columns";
import TaskColumn from "../TaskCards/TaskColumn";
import { getInvitations } from "../../../api/invitations";
import ImageUpload from "../../dashboard/addModal/ImageUpload";
import TaskTags from "../TaskCards/TaskTags";
import styled from "styled-components";

interface Assignee {
  id: number;
  name: string;
}

interface Column {
  id: number;
  title: string;
}

interface Task {
  id: number;
  columnId: number;
  assigneeUserId: number | null;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl?: string;
}

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  fetchCards: () => void;
  dashboardId: number;
  columnTitle: string;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  isOpen,
  onClose,
  task,
  fetchCards,
  dashboardId,
  columnTitle,
}) => {
  const [formData, setFormData] = useState({ ...task });
  const [isModified, setIsModified] = useState(false);
  const [assigneeList, setAssigneeList] = useState<Assignee[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(task.tags || []);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    task.imageUrl || null
  );

  useEffect(() => {
    setFormData({ ...task });
    setPreviewUrl(task.imageUrl || null);
  }, [task]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const data = await getColumns(dashboardId);
        setColumns(data);
      } catch (error) {
        console.error("❌ 컬럼 목록 조회 실패:", error);
      }
    };
    fetchColumns();
  }, [dashboardId]);

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const data = await getInvitations(10);
        const mappedAssignees = data.invitations.map((invite: any) => ({
          id: invite.invitee.id,
          name: invite.invitee.nickname,
        }));
        setAssigneeList(mappedAssignees);
      } catch (error) {
        console.error("❌ 담당자 목록 조회 실패:", error);
      }
    };
    fetchAssignees();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setIsModified(true);
      return updated;
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => {
      const updated = { ...prev, dueDate: date ? date.toISOString() : null };
      setIsModified(true);
      return updated;
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setIsModified(true);
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    setIsModified(true);
  };

  const handleImageUpload = (file: File | null) => {
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : task.imageUrl || null);
    setIsModified(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isModified) {
      try {
        const updatedData = {
          ...formData,
          tags,
          imageUrl: image ? URL.createObjectURL(image) : task.imageUrl,
        };
        await updateCard(task.id, updatedData);
        fetchCards();
        onClose();
      } catch (error) {
        console.error("Error updating card:", error);
      }
    }
  };

  return (
    <TaskEditModalStyled isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSave}>
        <ModalContent>
          <h2>할 일 수정</h2>

          <StatusAssigneeContainer>
            <StatusBox onClick={() => setDropdownOpen(!dropdownOpen)}>
              <label>상태</label>
              <TaskColumn
                columnTitle={
                  columns.find((col) => col.id === formData.columnId)?.title ||
                  "컬럼 선택"
                }
              />
              <ToggleIcon
                src="/icons/todomodalmanagertoggle.png"
                alt="toggle"
              />
            </StatusBox>

            {dropdownOpen && (
              <DropdownMenu>
                {columns.map((column) => (
                  <DropdownItem
                    key={column.id}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, columnId: column.id }));
                      setDropdownOpen(false);
                    }}
                  >
                    <TaskColumn columnTitle={column.title} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}

            <AssigneeBox>
              <label>담당자</label>
              <select
                value={formData.assigneeUserId || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assigneeUserId: Number(e.target.value),
                  })
                }
              >
                <option value="">선택 없음</option>
                {assigneeList.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.name}
                  </option>
                ))}
              </select>
              <ToggleIcon
                src="/icons/todomodalmanagertoggle.png"
                alt="toggle"
              />
            </AssigneeBox>
          </StatusAssigneeContainer>

          <Label>제목 *</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Label>설명 *</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Label>마감일 *</Label>
          <DatePicker
            selected={formData.dueDate ? new Date(formData.dueDate) : null}
            onChange={handleDateChange}
            required
          />

          <Label>태그</Label>
          <TagInputContainer>
            <TaskTags tags={tags} />
            <Input
              type="text"
              placeholder="입력 후 Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyPress}
            />
          </TagInputContainer>

          <Label>이미지</Label>
          <ImageUploadContainer
            onClick={() => document.getElementById("imageInput")?.click()}
          >
            {previewUrl ? (
              <ImagePreview src={previewUrl} alt="Uploaded" />
            ) : (
              <ImageUpload onImageUpload={handleImageUpload} />
            )}
            <input
              id="imageInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
          </ImageUploadContainer>

          <ButtonGroup>
            <ButtonCancel type="button" onClick={onClose}>
              취소
            </ButtonCancel>
            <ButtonCreate type="submit" disabled={!isModified}>
              수정
            </ButtonCreate>
          </ButtonGroup>
        </ModalContent>
      </form>
    </TaskEditModalStyled>
  );
};

const TaskEditModalStyled = styled(CustomModal)`
  .modalContent {
    width: 584px !important;
    height: 973px !important;
  }
`;

const ModalContent = styled.div`
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 24px;
  }

  label {
    font-weight: 500;
    font-size: 18px;
    line-height: 21.48px;
  }
`;

const StatusAssigneeContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const AssigneeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ToggleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  height: 50px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;

  &:hover {
    background: #f0f0f0;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 18px;
  line-height: 21.48px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  height: 50px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  min-height: 80px;
  resize: none;
`;

const TagInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const ImageUploadContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 76px;
  width: 76px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const ButtonCancel = styled.button`
  background-color: white;
  color: #8b61ff;
  padding: 14px 26px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  width: 50%;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const ButtonCreate = styled.button`
  background-color: #8b61ff;
  padding: 14px 26px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  width: 50%;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default TaskEditModal;
