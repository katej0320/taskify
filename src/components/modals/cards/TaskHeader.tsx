import styled from "styled-components";

interface TaskHeaderProps {
  title: string;
  onClose: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ title, onClose }) => {
  return (
    <HeaderContainer>
      {/* 제목 */}
      <Title>{title || "제목 없음"}</Title>

      {/* 아이콘 컨테이너 (드롭다운 메뉴 + 닫기 버튼) */}
      <IconWrapper>
        {/* 드롭다운 메뉴 (케밥 아이콘) */}
        <img src="/icons/kebab.svg" alt="메뉴" className="menu-icon" />

        {/* 닫기 버튼 */}
        <CloseIcon src="/icons/close.svg" alt="닫기" onClick={onClose} />
      </IconWrapper>
    </HeaderContainer>
  );
};

export default TaskHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #333;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .menu-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;

const CloseIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
