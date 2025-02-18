import { useState, useEffect } from "react";
import Image from "next/image";
import CustomModal from "@/src/components/modal/CustomModal";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import CreateBoard from "@/src/components/dashboardlist/createDashboard/createDashboard";
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
        setDashboards([...response.data.dashboards]);
      } 
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

 
  const { dashboardName, setDashboardName, selectedColor, setSelectedColor, handleCreate } =
    useCreateBoard(closeModal, async (newDashboard) => {

      try {
        await fetchDashboards(); 
      } catch (error) {
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
            handleCreate={handleCreate}
            onClose={closeModal}
          />
        </CustomModal>
      )}
    </>
  );
}
