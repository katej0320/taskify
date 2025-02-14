import React from "react";
import { createPortal } from "react-dom";
import styles from "./CustomModal.module.scss";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string; // 🔹 width 추가
}

export default function CustomModal({
  isOpen,
  onClose,
  children,
  className,
  width = "584px",
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className={`${styles.modalOverlay} ${className}`} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${className}`}
        style={{ width }} // 🔹 props로 width 조정 가능
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
