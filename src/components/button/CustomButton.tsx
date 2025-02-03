import styles from "./CustomButton.style.module.scss";

interface CustomButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  padding?: string; // 선택적 padding
  isRoundButton?: boolean;
  isMoreButton?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CustomButton({
  children,
  width,
  height,
  padding = "10px 20px", // 기본값 설정
  isRoundButton = false,
  isMoreButton = false,
  className = "",
  onClick = () => {},
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button} ${
        isRoundButton ? styles.roundedButton : ""
      } ${isMoreButton ? styles.moreButton : ""}`}
      style={{ width: `${width}px`, height: `${height}px`, padding }}
    >
      {children}
    </button>
  );
}
