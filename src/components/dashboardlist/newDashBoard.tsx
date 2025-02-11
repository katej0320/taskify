import { useState } from "react";
import Image from "next/image";
import CustomModal from "@/src/components/modal/CustomModal";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import CreateBoard from "@/src/components/dashboardlist/createBoard/createBoard";
import styles from "../../../pages/dashboard/index.module.scss";

export default function NewDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
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

      {/* 모달 */}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <CreateBoard />
        </CustomModal>
      )}
    </ListCard>
  );
}
