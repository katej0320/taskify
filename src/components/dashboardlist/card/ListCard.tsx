import React from "react";
import styles from "./ListCard.module.scss"; // CSS 모듈 사용

type ListCardProps = {
  children: React.ReactNode;
  className?: string;
};

const ListCard: React.FC<ListCardProps> = ({ children, className }) => {
  return <div className={styles.box + " " + className}>{children}</div>;
};

export default ListCard;
