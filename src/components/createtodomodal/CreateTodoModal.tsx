"use client";

import React from "react";
import styles from "./CreateTodomoda.module.scss";
import CustomModal from "../modals/TaskModal";
import { useState } from "react";
import InputManager from "./createtodomoalcomponenets/manager";
import InputTitle from "./createtodomoalcomponenets/title";
import InputDescription from "./createtodomoalcomponenets/description";
import InputDeadline from "./createtodomoalcomponenets/deadline";
import InputTag from "./createtodomoalcomponenets/tag";
import InputImage from "./createtodomoalcomponenets/image";

export default function createTodoModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div className={styles.modalOveerlay}>
          <div className={styles.contentstyle}>
            <h1>할일생성</h1>
            <InputManager />
            <InputTitle />
            <InputDescription />
            <InputDeadline />
            <InputTag />
            <InputImage />
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
