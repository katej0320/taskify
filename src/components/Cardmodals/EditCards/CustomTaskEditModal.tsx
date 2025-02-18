import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width: string;
  height: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div<{ width: string; height: string }>`
  background-color: #ffffff;
  min-width: 368px;
  padding: 24px;
  border-radius: 16px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default function CustomTaskEditModal({
  isOpen,
  onClose,
  children,
  width,
  height,
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
}
