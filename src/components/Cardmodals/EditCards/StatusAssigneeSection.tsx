import React from "react";
import TaskColumn from "../TaskCards/TaskColumn"; // TaskColumn 컴포넌트를 import

interface Assignee {
  id: number;
  userId: number; // userId 추가
  nickname: string; // nickname 추가
}

interface Column {
  id: number;
  title: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assigneeUserId: number | null; // 수정된 부분
  columnId: number | null;
}

interface StatusAssigneeSectionProps {
  columns: Column[];
  formData: Task;
  setFormData: React.Dispatch<React.SetStateAction<Task>>;
  assigneeList: Assignee[];
}

const StatusAssigneeSection: React.FC<StatusAssigneeSectionProps> = ({
  columns,
  formData,
  setFormData,
  assigneeList,
}) => {
  return (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <div className="dropdownSection">
        <label>상태</label>
        {/* find에서 반환값이 undefined일 수 있으므로 타입 체크 */}
        <TaskColumn
          columnTitle={
            columns.find((col: Column) => col.id === formData.columnId)
              ?.title || "컬럼 선택"
          }
        />
      </div>

      <div className="dropdownSection">
        <label>담당자</label>
        <select
          value={formData.assigneeUserId ?? ""} // null 처리
          onChange={(e) =>
            setFormData({
              ...formData,
              assigneeUserId: e.target.value ? Number(e.target.value) : null, // null 처리
            })
          }
        >
          <option value="">선택 없음</option>
          {assigneeList.map((assignee) => (
            <option key={assignee.id} value={assignee.userId}>
              {assignee.nickname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatusAssigneeSection;
