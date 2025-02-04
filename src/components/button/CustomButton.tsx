import styles from "./CustomButton.style.module.scss";
import Link from "next/link";

interface CustomButtonProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: string;
  isRoundButton?: boolean;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a"; // 버튼을 <a>로 바꿀 수도 있도록
  href?: string; // 링크 기능 추가
}

export default function CustomButton({
  children,
  width,
  height,
  padding = "10px 20px",
  isRoundButton = false,
  className = "",
  onClick = () => {},
  as = "button",
  href,
}: CustomButtonProps) {
  const buttonStyle: React.CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : "auto",
    padding,
  };

  const buttonClass = [
    styles.button,
    isRoundButton ? styles.roundedButton : "",
    className || "",
  ].join(" ");

  if (as === "a" && href) {
    return (
      <Link href={href} passHref>
        <a className={buttonClass} style={buttonStyle}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass} style={buttonStyle}>
      {children}
    </button>
  );
}
