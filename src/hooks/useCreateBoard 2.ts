import { useState } from "react";
import axiosInstance from "@/src/api/axios";
import { Dashboard } from "../types/dashboard";

export const useCreateBoard = (
  onClose: () => void,
  onDashboardCreate?: (newDashboard: Dashboard) => void
) => {
  const [dashboardName, setDashboardName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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

      if (response.status === 200 || response.status === 201) {
        onDashboardCreate?.(response.data);
        setDashboardName("");
        setSelectedColor("");
        onClose();
      } else {
        console.error("❌ Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.error("❌ Axios Error:", error.response?.data || error.message);
      alert(
        `🚨 API 오류: ${
          error.response?.data?.message || "서버에서 오류가 발생했습니다."
        }`
      );
    }
  };

  return {
    dashboardName,
    setDashboardName,
    selectedColor,
    setSelectedColor,
    handleCreate,
  };
};
