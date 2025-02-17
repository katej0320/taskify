import { Dashboard } from "@/src/types/dashboard";
import styles from "./createDashboard.module.scss";
import { useCreateBoard } from "@/src/hooks/useCreateBoard";
import Image from "next/image";

interface CreateBoardProps {
  dashboardName: string;
  setDashboardName: (name: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  handleCreate: () => Promise<void>;
  onClose: () => void;
  onDashboardCreate?: (newDashboard: Dashboard) => void;
}
export default function CreateBoard({
  onClose,
  onDashboardCreate,
}: CreateBoardProps) {
  const {
    dashboardName,
    setDashboardName,
    selectedColor,
    setSelectedColor,
    handleCreate,
  } = useCreateBoard(onClose, onDashboardCreate);

  const colors = [
    { code: "#7ac555", className: styles.colorGreen },
    { code: "#760dde", className: styles.colorPurple },
    { code: "#ffa500", className: styles.colorOrange },
    { code: "#76a5ea", className: styles.colorBlue },
    { code: "#e876ea", className: styles.colorPink },
  ];

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
        {colors.map(({ code, className }) => (
          <div
            key={code}
            className={`${styles.color} ${className}`}
            onClick={() => setSelectedColor(code)}
          >
            {selectedColor === code && (
              <Image
                src="/icons/Vector.svg"
                width={15}
                height={11}
                alt="체크 표시"
                className={styles.colorCheck}
              />
            )}
          </div>
        ))}
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
