import React from "react";
import { createPortal } from "react-dom";
import styles from "./CustomModal.style.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function CustomModal({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) {
  if (!isOpen) return null;
  if (typeof window === "undefined") return null; // Next.js SSR 체크

  return createPortal(
    <div className={`${styles.modalOverlay}`} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
