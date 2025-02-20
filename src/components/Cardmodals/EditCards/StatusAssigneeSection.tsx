import React from "react";
import TaskColumn from "../TaskCards/TaskColumn";

interface Assignee {
  id: number;
  userId: number;
  nickname: string;
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
  console.log("🟢 현재 StatusAssigneeSection의 assigneeList:", assigneeList);
  console.log("🟢 현재 선택된 담당자 ID:", formData.assigneeUserId);

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
          value={formData.assigneeUserId ?? ""}
          onChange={(e) => {
            console.log("🟢 선택된 userId 값:", e.target.value);
            setFormData({
              ...formData,
              assigneeUserId: e.target.value ? Number(e.target.value) : null,
            });
          }}
        >
          <option value="">선택 없음</option>
          {assigneeList.map((assignee) => {
            console.log("🟢 select 내부 렌더링 중 → assignee:", assignee); // 추가
            return (
              <option key={assignee.id} value={assignee.userId}>
                {assignee.nickname}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default StatusAssigneeSection;
