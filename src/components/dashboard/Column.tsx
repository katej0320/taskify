// Column.tsx
import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import ListCard from "../dashboardlist/card/ListCard";
import Image from "next/image";
import CustomModal from "../modal/CustomModal";
import styles from "./Board.module.scss";

export default function Column({ column }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.columnWrapper}>
      <div className={styles.circle} />
      <h3>{column.title}</h3>
      <Image
        src="/icons/settings.svg"
        width={20}
        height={20}
        onClick={() => openModal("column-setting")}
        alt="설정"
      />
      <Droppable droppableId={String(column.id)}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ListCard className={styles.listcolumn}>
              <Image
                src="/icons/chip.svg"
                width={22}
                height={22}
                alt="chip.svg"
                onClick={() => openModal("add-column")}
                style={{ cursor: "pointer" }}
              />
            </ListCard>
            {column.tasks &&
              column.tasks.map((task: any, index: number) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === "column-setting" && <div>컬럼 설정 관련 모달</div>}
        {modalContent === "add-column" && <div>컬럼 추가 모달</div>}
      </CustomModal>
    </div>
  );
}
