
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
    <>
      <CardMetaBox>
        <Assignee>
          <span>담당자</span>
          <AssigneeDetails>
            {profileImage ? (
              <ProfileImage src={profileImage} alt="프로필" />
            ) : (
              <AssigneeCircle>{firstLetter}</AssigneeCircle>
            )}
            <span>{assignee?.nickname}</span>
          </AssigneeDetails>
        </Assignee>

        <DueDate>
          <span>마감일</span>
          <p>{dueDate}</p>
        </DueDate>
      </CardMetaBox>
    </>
  );
};

export default TaskAssignee;

const CardMetaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 16px;
  width: 100%;
  height: 180px;
  background-color: white;

  @media (max-width: 1199px) {
    right: 20px;
  }

  @media (max-width: 767px) {
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Assignee = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 10px;
`;

const DueDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  white-space: nowrap;
`;

const AssigneeDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AssigneeCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dbe6f7;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
