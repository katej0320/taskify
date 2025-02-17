import styled, { css } from "styled-components";

interface Container {
  $half?: string;
  $signature?: string;
  $sub?: string;
  disabled?: boolean;
}

export const Button = styled.button<Container>`
  width: 100%;
  height: 62px;
  line-height: 62px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  text-align: center;
  background: ${(props) => (props.disabled ? "#9FA6B2" : "#5534da")};
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  ${(props) =>
    props.$signature
      ? css`
          height: 54px;
          line-height: 54px;
          color: #fff;
        `
      : props.$sub
      ? css`
          max-width: 84px;
          height: 32px;
          border-radius: 4px;
          line-height: 32px;
          background: #fff;
          color: #5534da;
          font-weight: 500;
          font-size: 14px;
        `
      : props.$half
      ? css`
          width: 50%;
          background: #fafafa;
        `
      : ""};
`;
