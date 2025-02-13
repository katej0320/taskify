"use Client";
import { useState } from "react";
import styles from "./createBoard.module.scss";
import axios from "axios";
import axiosInstance from "@/src/api/axios";

interface Dashboard {
  id: string;
  title: string;
  color: string;
}

interface CreateBoardProps {
  onClose: () => void; // ✅ 부모에서 모달을 닫을 수 있도록 콜백 추가
  onDashboardCreate: (newDashboard: Dashboard) => void; // ✅ 새로운 대시보드를 부모에 전달하는 함수 추가
}

export default function createBoard({
  onClose,
  onDashboardCreate,
}: CreateBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [dashboardName, setDashboardName] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // 색상 상태 추가

  const closeModal = () => setIsModalOpen(false);

  const handleCreate = async () => {
    if (!dashboardName.trim()) {
      alert("대시보드 이름을 입력해주세요.");
      return;
    }

    if (!selectedColor) {
      alert("색상을 선택해주세요.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/dashboards",
        { title: dashboardName, color: selectedColor },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Response Data:", response.data);
      console.log("✅ Response Status:", response.status);

      // ✅ 상태 코드 200 또는 201인 경우 정상 처리
      if (response.status === 200 || response.status === 201) {
        console.log("🎉 대시보드 생성 성공:", response.data);
        // setIsModalOpen(false);

        onDashboardCreate(response.data);
        onClose();
      } else {
        console.error(
          "❌ Failed to create dashboard: Unexpected response status",
          response.status
        );
      }
      closeModal();
    } catch (error: any) {
      console.error("❌ Axios Error:", error.response?.data || error.message);
      alert(
        `🚨 API 오류: ${
          error.response?.data?.message || "서버에서 오류가 발생했습니다."
        }`
      );
    }
  };

  // isModalOpen이 false일 경우 모달을 렌더링하지 않음
  if (!isModalOpen) return null;

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
