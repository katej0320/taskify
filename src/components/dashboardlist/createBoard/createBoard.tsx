"use Client";
import styles from "./createBoard.module.scss";
import { useCreateBoard } from "@/src/hooks/useCreateBoard";

interface CreateBoardProps {
  dashboardName: string;
  setDashboardName: (name: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  handleCreate: () => Promise<void>;
  onClose: () => void;
}

export default function CreateBoard({ onClose }: CreateBoardProps) {
  const {
    dashboardName,
    setDashboardName,
    selectedColor,
    setSelectedColor,
    handleCreate,
  } = useCreateBoard(onClose);

  return (
    <div className={styles.modalContent}>
      <h1>새로운 대시보드</h1>
      <div className={styles.modalTitle}>대시보드이름</div>
      <input
        placeholder="대시보드 이름을 입력해주세요"
        className={styles.modalInput}
        value={dashboardName}
        onChange={(e) => setDashboardName(e.target.value)}
      />
      <div className={styles.colorDiv}>
        {/* 색상 버튼들 */}
        <div
          className={`${styles.color} ${styles.colorGreen}`}
          onClick={() => setSelectedColor("#7ac555")}
          style={{
            border: selectedColor === "#7ac555" ? "2px solid black" : "",
          }}
        />
        <div
          className={`${styles.color} ${styles.colorPurple}`}
          onClick={() => setSelectedColor("#760dde")}
          style={{
            border: selectedColor === "#760dde" ? "2px solid black" : "",
          }}
        />
        <div
          className={`${styles.color} ${styles.colorOrange}`}
          onClick={() => setSelectedColor("#ffa500")}
          style={{
            border: selectedColor === "#ffa500" ? "2px solid black" : "",
          }}
        />
        <div
          className={`${styles.color} ${styles.colorBlue}`}
          onClick={() => setSelectedColor("#76a5ea")}
          style={{
            border: selectedColor === "#76a5ea" ? "2px solid black" : "",
          }}
        />
        <div
          className={`${styles.color} ${styles.colorPink}`}
          onClick={() => setSelectedColor("#e876ea")}
          style={{
            border: selectedColor === "#e876ea" ? "2px solid black" : "",
          }}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.cancle} onClick={onClose}>
          취소
        </button>
        <button className={styles.create} onClick={handleCreate}>
          생성
        </button>
      </div>
    </div>
  );
}
