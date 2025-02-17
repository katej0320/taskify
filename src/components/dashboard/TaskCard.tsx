import React, { useMemo } from "react";
import styled from "styled-components";

interface TaskTagsProps {
  tags: { id: number; text: string }[];
  tagInput: string; // 추가
  setTagInput: (value: string) => void; // 추가
  onRemove?: (index: number) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TAG_COLORS: { [key: string]: string } = {
  "#F9EEE3": "#FFA500",
  "#E7F7DB": "#7AC555",
  "#F7DBF0": "#E876EA",
  "#DBE6F7": "#76A5EA",
};

const getTagColor = (() => {
  const tagColorMap = new Map<string, string>();
  const availableColors = Object.keys(TAG_COLORS);

  return (tag: string) => {
    if (!tagColorMap.has(tag)) {
      const randomColor =
        availableColors[tagColorMap.size % availableColors.length];
      tagColorMap.set(tag, randomColor);
    }
    return tagColorMap.get(tag) || "#ddd";
  };
})();

const TaskTags: React.FC<TaskTagsProps> = ({
  tags,
  tagInput,
  setTagInput,
  onRemove,
  onKeyPress,
}) => {
  const uniqueTags = useMemo(() => [...new Set(tags)], [tags]);

  return (
    <TagsInputContainer>
      {uniqueTags.map((tag, index) => {
        const bgColor = getTagColor(tag.text);
        const textColor = TAG_COLORS[bgColor];

        return (
          <Tag key={tag.id} bgColor={bgColor} textColor={textColor}>
            {tag.text}
            {onRemove && (
              <RemoveButton onClick={() => onRemove(index)}>✕</RemoveButton>
            )}
          </Tag>
        );
      })}
      <Input
        type="text"
        placeholder="태그 입력 후 Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={onKeyPress}
      />
    </TagsInputContainer>
  );
};

export default TaskTags;

const TagsInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 50px;
`;

const Tag = styled.span<{ bgColor: string; textColor: string }>`
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px 10px;
  min-width: 64px;
  max-width: fit-content;
  height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 14px;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;
