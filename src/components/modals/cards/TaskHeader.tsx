interface TaskHeaderProps {
  title: string;
  tags: string[];
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ title, tags }) => {
  return (
    <div>
      <h2 className="task-title">{title || "제목 없음"}</h2>
      <div className="task-tags">
        {tags.length > 0
          ? tags.map((tag, index) => (
              <span key={index} className="task-tag">
                {tag}
              </span>
            ))
          : "태그 없음"}
      </div>
    </div>
  );
};

export default TaskHeader;
