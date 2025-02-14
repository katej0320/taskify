import { useState, useEffect } from "react";
import Image from "next/image";
import CustomModal from "@/src/components/modals/CustomModal";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import CreateBoard from "@/src/components/dashboardlist/createBoard/createBoard";
import styles from "../../../pages/dashboard/index.module.scss";
import DashboardList from "@/src/components/dashboardlist/DashBoardList";
import axiosInstance from "@/src/api/axios";
import { useCreateBoard } from "@/src/hooks/useCreateBoard"; // ✅ 훅 추가

interface Dashboard {
  id: string;
  title: string;
  color: string;
}

export default function NewDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(dashboards.length / itemsPerPage);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ✅ API에서 대시보드 데이터를 불러오는 함수
  const fetchDashboards = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/dashboards", {
        params: {
          navigationMethod: "pagination",
          page: 1,
          size: 10,
        },
      });

      if (response.data && Array.isArray(response.data.dashboards)) {
        console.log(
          "✅ 대시보드 목록 업데이트 중...",
          response.data.dashboards
        );
        setDashboards([...response.data.dashboards]);
      } else {
        console.error("❌ 예상치 못한 응답 구조:", response.data);
      }
    } catch (error) {
      console.error("❌ 대시보드 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  // ✅ useCreateBoard 훅 사용
  const { dashboardName, setDashboardName, selectedColor, setSelectedColor, handleCreate } =
    useCreateBoard(closeModal, async (newDashboard) => {
      console.log("📢 새로운 대시보드 추가 요청:", newDashboard);

      try {
        await fetchDashboards(); // ✅ 최신 데이터 다시 불러오기
        console.log("✅ 최신 대시보드 데이터를 다시 불러옴!");
      } catch (error) {
        console.error("❌ 대시보드 생성 후 데이터 갱신 실패:", error);
      }
    });

  return (
    <>
      <ListCard className={styles.listCard}>
        <div>새로운 대쉬보드</div>
        <Image
          src="/icons/chip.svg"
          width={22}
          height={22}
          alt="chip.svg"
          priority
          onClick={openModal}
          style={{ cursor: "pointer" }}
        />
      </ListCard>

      <DashboardList
        dashboards={dashboards}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <CreateBoard
            dashboardName={dashboardName}
            setDashboardName={setDashboardName}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            handleCreate={handleCreate} // ✅ 이벤트 핸들러 직접 전달
            onClose={closeModal}
          />
        </CustomModal>
      )}
    </>
  );
}
