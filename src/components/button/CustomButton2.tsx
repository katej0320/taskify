import styled, { css } from "styled-components";

interface Container {
  half?: string;
  signature?: string;
  sub?: string;
}

export const Button = styled.div<Container>`
  width: ${(props) => (props.half ? `50%` : `100%`)};
  height: 62px;
  line-height: 62px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  text-align: center;
  background: #fff;
  ${(props) =>
    props.signature &&
    css`
      height: 54px;
      line-height: 54px;
      background: #5534da;
      color: #fff;
    `};
  ${(props) =>
    props.sub &&
    css`
      max-width: 84px;
      height: 32px;
      border-radius: 4px;
      line-height: 32px;
      color: #5534da;
      font-weight: 500;
      font-size: 14px;
    `}
`;
