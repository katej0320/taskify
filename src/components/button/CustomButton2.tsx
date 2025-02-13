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
  transition: 0.3s;

  &:hover {
    background: ${(props) => !props.disabled && "#434190"};
  }
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

          &:hover {
            background: #e2e8f0;
          }
        `
      : props.$half
      ? css`
          width: 50%;
          background: #f0f0f0;

          &:hover {
            background: #f4f4f4;
          }
        `
      : css``};
`;
