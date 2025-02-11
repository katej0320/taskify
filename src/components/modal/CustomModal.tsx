import React from "react";
import { createPortal } from "react-dom";
import styles from "./CustomModal.style.module.scss";



interface ModalProps {
  isOpen?: boolean; // 모달이 열려 있는지 여부
  onClose?: () => void; // 모달을 닫는 함수
  children: React.ReactNode; // 모달 내부에 렌더링할 내용
  className?: string;
}

export default function CustomModal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className={`${styles.modalOverlay} ${className}`} onClick={onClose}>
      {/* 모달 내용 */}
      <div className={`${styles.modalContent} ${className}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
