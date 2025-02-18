import styled from "styled-components";

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
    <AssigneeContainer>
      <ProfileIcon>
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="profile-image"
          />
        ) : (
          <span className="profile-placeholder">{firstLetter}</span>
        )}
      </ProfileIcon>
      <AssigneeInfo>
        <p className="assignee-name">
          담당자{assignee?.nickname || "담당자 없음"}
        </p>
        <p className="due-date">마감일{dueDate || "없음"}</p>
      </AssigneeInfo>
    </AssigneeContainer>
  );
};

export default TaskAssignee;

// ✅ 스타일 유지
const AssigneeContainer = styled.div`
  width: 200px;
  height: 155px;
  border-radius: 8px;
  padding: 13px 16px;
  border: 1px solid #d9d9d9;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const AssigneeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .assignee-name {
    font-weight: bold;
    font-size: 14px;
  }

  .due-date {
    font-size: 12px;
    color: #777;
  }
`;
