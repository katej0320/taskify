interface TaskAssigneeProps {
  assignee?: {
    nickname?: string;
    profileImageUrl?: string | null;
  };
  dueDate?: string;
}

const TaskAssignee: React.FC<TaskAssigneeProps> = ({ assignee, dueDate }) => {
  const profileImage = assignee?.profileImageUrl || "";
  const firstLetter = assignee?.nickname ? assignee.nickname[0] : "?";

  return (
    <div className="task-assignee">
      <div className="profile-icon">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="profile-image"
          />
        ) : (
          <span className="profile-placeholder">{firstLetter}</span>
        )}
      </div>
      <div className="assignee-info">
        <p className="assignee-name">{assignee?.nickname || "미정"}</p>
        <p className="due-date">마감일: {dueDate || "없음"}</p>
      </div>
    </div>
  );
};

export default TaskAssignee;
