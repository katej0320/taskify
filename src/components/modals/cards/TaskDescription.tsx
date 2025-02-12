interface TaskDescriptionProps {
  description?: string;
  assignee?: string; // <-- ✅ 추가 (담당자 정보)
  dueDate?: string;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({
  description,
  assignee,
  dueDate,
}) => {
  return (
    <div>
      <p className="task-description">{description || "설명 없음"}</p>
      <div className="task-info">
        <div className="task-assignee">담당자: {assignee || "미정"}</div>{" "}
        {/* <-- ✅ assignee 추가됨 */}
        <div className="task-deadline">마감일: {dueDate || "없음"}</div>
      </div>
    </div>
  );
};

export default TaskDescription;
