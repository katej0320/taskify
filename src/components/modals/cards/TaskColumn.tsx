import styled from "styled-components";

interface TaskColumnProps {
  teamId: string;

  columnId: number;
  dashboardId: number;
  columnTitle: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle }) => {
  return <ColumnContainer>{columnTitle}</ColumnContainer>;
};

export default TaskColumn;

const ColumnContainer = styled.div`
  width: 64px;
  height: 26px;
  border-radius: 16px;
  padding: 4px 10px;
  background-color: #f1effd;
  font-weight: 400;
  font-size: 12px;
  color: #5534da;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 태그 스타일
interface TaskTagProps {
  tagName: string;
}

const TaskTag: React.FC<TaskTagProps> = ({ tagName }) => {
  const tagColors = [
    { bg: "#F9EEE3", text: "#D58D49" },
    { bg: "#E7F7DB", text: "#86D549" },
    { bg: "#F7DBF0", text: "#D549B6" },
    { bg: "#DBE6F7", text: "#4981D5" },
  ];
  const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];

  return (
    <TagContainer
      style={{ backgroundColor: randomColor.bg, color: randomColor.text }}
    >
      {tagName}
    </TagContainer>
  );
};

export { TaskTag };

const TagContainer = styled.div`
  width: 61px;
  height: 28px;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;
