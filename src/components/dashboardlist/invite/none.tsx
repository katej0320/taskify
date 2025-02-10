import Image from "next/image";
import styled from "styled-components";

// 새로운 div 스타일링
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 120px auto;
`;

export default function None() {
  return (
    <ImageWrapper>
      <Image
        src="/images/none.svg"
        width={232}
        height={150}
        alt="더하기 버튼"
      />
    </ImageWrapper>
  );
}
