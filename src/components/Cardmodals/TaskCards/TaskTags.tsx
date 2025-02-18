import React, { useMemo } from "react";
import styled from "styled-components";

interface TaskTagsProps {
  tags: string[];
}

// ✅ 배경색 → 텍스트 색상 매핑
const TAG_COLORS: { [key: string]: string } = {
  "#F9EEE3": "#FFA500", // 주황색 배경 → 주황색 텍스트
  "#E7F7DB": "#7AC555", // 연두색 배경 → 녹색 텍스트
  "#F7DBF0": "#E876EA", // 핑크 배경 → 핑크 텍스트
  "#DBE6F7": "#76A5EA", // 파란 배경 → 파란 텍스트
};

const TaskTags: React.FC<TaskTagsProps> = ({ tags }) => {
  const uniqueTags = useMemo(() => [...new Set(tags)], [tags]);

  const tagColorMap = useMemo(() => {
    const map = new Map<string, string>();
    const availableColors = Object.keys(TAG_COLORS);

    uniqueTags.forEach((tag, index) => {
      if (!map.has(tag)) {
        map.set(tag, availableColors[index % availableColors.length]);
      }
    });

    return map;
  }, [uniqueTags]);

  return (
    <TagsContainer>
      {uniqueTags.map((tag) => {
        const bgColor = tagColorMap.get(tag) || "#ddd"; // 배경색 설정
        const textColor = TAG_COLORS[bgColor] || "#000"; // 배경색에 맞는 텍스트 색상 설정

        return (
          <Tag key={tag} bgColor={bgColor} textColor={textColor}>
            {tag}
          </Tag>
        );
      })}
    </TagsContainer>
  );
};

export default TaskTags;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ bgColor: string; textColor: string }>`
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
