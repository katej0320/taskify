import React from "react";

interface TaskTagsProps {
  tags: string[]; // 태그 배열
}

const TaskTags: React.FC<TaskTagsProps> = ({ tags }) => {
  return (
    <div className="task-tags">
      {tags.length > 0 ? (
        tags.map((tag) => (
          <span key={tag} className="task-tag">
            {tag}
          </span>
        ))
      ) : (
        <span className="task-tag no-tag">태그 없음</span>
      )}
    </div>
  );
};

export default TaskTags;
