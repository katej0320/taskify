import React, { useMemo } from "react";
import styled from "styled-components";

interface TaskTagsProps {
  tags: string[];
}

const TAG_COLORS: { [key: string]: string } = {
  "#F9EEE3": "#FFA500", // 주황색 배경 → 주황색 텍스트
  "#E7F7DB": "#7AC555", // 연두색 배경 → 녹색 텍스트
  "#F7DBF0": "#E876EA", // 핑크 배경 → 핑크 텍스트
  "#DBE6F7": "#76A5EA", // 파란 배경 → 파란 텍스트
};

// 태그 이름을 기반으로 색상 매핑을 캐싱하여 랜덤성을 유지
const getTagColor = (() => {
  const tagColorMap = new Map<string, string>(); // 태그별 색상 저장
  const availableColors = Object.keys(TAG_COLORS);

  return (tag: string) => {
    if (!tagColorMap.has(tag)) {
      const randomColor =
        availableColors[tagColorMap.size % availableColors.length]; // 랜덤 색상 할당 (순환)
      tagColorMap.set(tag, randomColor);
    }
    return tagColorMap.get(tag) || "#ddd";
  };
})();

const TaskTags: React.FC<TaskTagsProps> = ({ tags }) => {
  const uniqueTags = useMemo(() => [...new Set(tags)], [tags]); // 중복 태그 제거

  return (
    <TagsContainer>
      {uniqueTags.map((tag) => {
        const bgColor = getTagColor(tag);
        const textColor = TAG_COLORS[bgColor];

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
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 4px 10px;
  min-width: 64px;
  max-width: fit-content;
  height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
