import { Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import styles from "./TaskCard.module.scss";
import { useState } from "react";
/* import CustomModal from "../modal/CustomModal"; // ❌ 기존 코드 비활성화 */
/* import DetailModal from "./detailModal"; // ❌ 기존 코드 비활성화 */
import TaskCardModal from "../modals/cards/TaskCardModal"; // ✅ TaskCardModal 유지

export default function TaskCard({
  card,
  index,
  columnTitle,
  columnId,
  dashboardId,
}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dueDate = card.dueDate;
  const date = dueDate ? dueDate.split(" ")[0] : "";

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          className={styles.taskWrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div onClick={openModal}>
            <Image
              className={styles.taskImg}
              src={card.imageUrl}
              width={274}
              height={160}
              alt="카드 이미지"
            />
            <h3>{card.title}</h3>
            <div>
              {card.tags.map((tag: string) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.date}>
              <Image
                src="/icons/calendar.svg"
                width={20}
                height={20}
                alt="설정"
              />
              <p>{date}</p>
            </div>
          </div>

          {/* ✅ 기존 코드 비활성화 (작동되지 않도록 처리) */}
          {/* 
          {isModalOpen && (
            <CustomModal
              className={styles.modal}
              isOpen={isModalOpen}
              onClose={closeModal}
              width="766px"
            >
              <DetailModal card={card} columnTitle={columnTitle} />
            </CustomModal>
          )} 
          */}

          {/* ✅ TaskCardModal 적용 */}
          {isModalOpen && (
            <TaskCardModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onOpenEditModal={() => {}} // 할 일 수정 모달 열기 함수 (추후 구현)
              cardId={card.id}
              columnTitle={columnTitle} // 컬럼 타이틀만 전달
              columnId={columnId}
              dashboardId={dashboardId}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
