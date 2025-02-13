import { useState, useEffect } from "react";
import Image from "next/image";
import CustomModal from "@/src/components/modal/CustomModal";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import CreateBoard from "@/src/components/dashboardlist/createBoard/createBoard";
import styles from "../../../pages/dashboard/index.module.scss";
import DashboardList from "@/src/components/dashboardlist/DashBoardList";
import { getDashboard } from "@/src/api/dashboardApi";

interface Dashboard {
  id: string;
  title: string;
  color: string;
}

export default function NewDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ✅ API에서 대시보드 데이터를 불러오는 함수
  const fetchDashboards = async () => {
    try {
      setLoading(true);
      
      // ✅ API 요청 보내기
      const response = await getDashboard({
        navigationMethod: "pagination",
        teamId: "12-1",
        page: 1,
        size: 4,
      });

      console.log("📢 API 응답 데이터:", response); // ✅ 응답 데이터 확인

      // ✅ 응답이 배열인지 확인 후 저장
      if (response && Array.isArray(response)) {
        setDashboards(response);
        localStorage.setItem("dashboards", JSON.stringify(response)); // ✅ 로컬 스토리지 저장
      } else {
        console.error("❌ 예상치 못한 응답 구조:", response);
      }
    } catch (error) {
      console.error("❌ 대시보드 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 새로고침해도 데이터 유지: 로컬 스토리지 사용
  useEffect(() => {
    const savedDashboards = localStorage.getItem("dashboards");
    if (savedDashboards) {
      setDashboards(JSON.parse(savedDashboards)); // ✅ 로컬 스토리지 데이터 로드
    } else {
      fetchDashboards(); // ✅ API 호출 (로컬에 데이터 없을 경우)
    }
  }, []);

  // ✅ 새로운 대시보드를 추가하는 함수
  const handleDashboardCreate = async (newDashboard: Dashboard) => {
    const updatedDashboards = [...dashboards, newDashboard];
    setDashboards(updatedDashboards);
    localStorage.setItem("dashboards", JSON.stringify(updatedDashboards)); // ✅ 로컬 스토리지 업데이트

    try {
      await fetchDashboards(); // ✅ 최신 데이터 반영
    } catch (error) {
      console.error("❌ 대시보드 생성 후 데이터 갱신 실패:", error);
    }

    closeModal();
  };

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

      {/* ✅ 로딩 상태 표시 */}
      {loading ? <p>⏳ 대시보드를 불러오는 중...</p> : <DashboardList dashboards={dashboards} />}

      {/* ✅ 모달 */}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <CreateBoard onClose={closeModal} onDashboardCreate={handleDashboardCreate} />
        </CustomModal>
      )}
    </>
  );
}
