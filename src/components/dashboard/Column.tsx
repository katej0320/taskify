"use client";
import { useEffect, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import ListCard from "../dashboardlist/card/ListCard";
import Image from "next/image";
import CustomModal from "../modal/CustomModal";
import styles from "./Column.module.scss";
import {
  getCards,
  updateColumnTitle,
  deleteColumn,
} from "@/src/api/dashboardApi";

export default function Column({ column, onDelete }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const [columnTitle, setColumnTitle] = useState(column.title);

  useEffect(() => {
    fetchCards();
  }, [column.id]);

  const fetchCards = async () => {
    try {
      const response = await getCards(10, column.id);
      const { cards, totalCount } = response;
      if (response) {
        setCards(cards);
        setTotalCount(totalCount);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleUpdateTitle = async () => {
    try {
      await updateColumnTitle(column.id, columnTitle); // 컬럼 이름 수정
      closeModal();
    } catch (error) {
      console.error("Error updating column title:", error);
    }
  };

  const handleDeleteColumn = async () => {
    const confirmDelete = window.confirm(
      "컬럼의 모든 카드가 삭제됩니다. 정말 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      try {
        await deleteColumn(column.id); // 컬럼 삭제
        onDelete(column.id);
        closeModal();
      } catch (error) {
        console.error("Error deleting column:", error);
      }
    }
  };

  return (
    <div className={styles.columnWrapper}>
      <div className={styles.columnTitle}>
        <div className={styles.subTitle}>
          <div className={styles.circle} />
          <h3>{columnTitle}</h3>
          <div className={styles.totalCount}>{totalCount}</div>
        </div>
        <Image
          src="/icons/settings.svg"
          width={20}
          height={20}
          onClick={() => openModal("column-setting")}
          alt="설정"
        />
      </div>
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
            {cards.map((card) => (
              <TaskCard
                key={card.id}
                card={card}
                className={styles.taskCard}
                columnTitle={columnTitle}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Modal */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === "column-setting" && (
          <div className={styles.listCardModal}>
            <h2>새 컬럼 생성</h2>
            <div>이름</div>

            <input
              className={styles.input}
              type="text"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              placeholder="컬럼 이름을 입력하세요"
            />
            <div className={styles.buttonGroup}>
              <button className={styles.cancle} onClick={handleDeleteColumn}>
                삭제
              </button>
              <button className={styles.create} onClick={handleUpdateTitle}>
                변경
              </button>
            </div>
          </div>
        )}

        {modalContent === "add-column" && <div>새 컬럼 추가 모달</div>}
      </CustomModal>
    </div>
  );
}
