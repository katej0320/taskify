import { useState } from "react";
import Image from "next/image";
import CustomModal from "@/src/components/modals/CustomModal";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import CreateBoard from "@/src/components/dashboardlist/createBoard/createBoard";
import styles from "../../../pages/dashboard/index.module.scss";
import DashboardList from "@/src/components/dashboardlist/DashBoardList"; // ✅ 추가

interface Dashboard {
  id: string;
  title: string;
  color: string;
}


export default function NewDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDashboardCreate = (newDashboard: Dashboard) => {
    setDashboards((prevDashboards) => [...prevDashboards, newDashboard]);
    closeModal(); // 모달 닫기
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

      {/* ✅ DashboardList에 dashboards 전달 */}
      <DashboardList dashboards={dashboards} />

      {/* ✅ 모달 */}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          {/* ✅ CreateBoard에서 handleDashboardCreate 호출하도록 전달 */}
          <CreateBoard onClose={closeModal} onDashboardCreate={handleDashboardCreate} />
        </CustomModal>
      )}
    </>
    
  );
}
