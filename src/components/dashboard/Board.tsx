"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import ListCard from "../dashboardlist/card/ListCard";
import Image from "next/image";
import CustomModal from "../modal/CustomModal";
import { useRouter } from "next/router";
import { addColumns, getColumns } from "@/src/api/dashboardApi";
import styles from "./Board.module.scss";

export default function Board() {
  const {
    query: { id = "" },
  } = useRouter();

  const [columns, setColumns] = useState<any[]>([]);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchColumns();
  }, [id]);

  const fetchColumns = async () => {
    if (!id) return;
    console.log("Fetching columns with:", id);
    try {
      const response = await getColumns(+id);
      if (response?.result === "SUCCESS") {
        const updatedColumns = response.data.map((column: any) => ({
          ...column,
          tasks: [], // 빈 tasks 배열 추가
        }));
        setColumns(updatedColumns);
      }
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;

    try {
      const response = await addColumns(+id, newColumnTitle);
      if (response?.result === "성공") {
        setColumns([...columns, { ...response.data, tasks: [] }]); // tasks 빈 배열 포함
        setIsModalOpen(false);
        setNewColumnTitle("");
      }
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newColumns = [...columns];

    const sourceColumn = newColumns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = newColumns.find(
      (col) => col.id === destination.droppableId
    );
    if (!sourceColumn || !destColumn) return;

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, movedTask);

    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.boardContainer}>
        {columns.map((column) => (
          <>
            <Column key={column.id} column={column} />
            <div className={styles.columnLine} />
          </>
        ))}
        <ListCard className={styles.listCard}>
          <div>새로운 컬럼추가하기</div>
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
      </div>

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>새로운 컬럼 추가</h2>
        <form onSubmit={handleAddColumn}>
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="컬럼 이름 입력"
          />
          <button type="submit">추가</button>
        </form>
      </CustomModal>
    </DragDropContext>
  );
}
