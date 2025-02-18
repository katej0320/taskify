import React, { useState } from "react";
import TaskTags from "../TaskCards/TaskTags";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]); // Enter로 태그 추가
      setTagInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && tagInput === "") {
      // Backspace로 마지막 태그 삭제
      setTags(tags.slice(0, -1)); // 마지막 태그를 삭제
    }
  };

  return (
    <div>
      <TaskTags tags={tags} /> {/* onRemoveTag를 제거하고 직접 처리 */}
      <input
        type="text"
        placeholder="입력 후 Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyPress}
        onKeyUp={handleKeyDown} // Backspace로 삭제
      />
    </div>
  );
};

export default TagInput;
