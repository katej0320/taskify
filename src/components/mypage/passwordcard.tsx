import React, { useState, useEffect } from "react";
import styles from "@/pages/mypage/mypage.module.scss";
import axiosInstance from "@/src/api/axios";
import CustomModal from "../modal/CustomModal";
import CustomButton from "../button/CustomButton";

export default function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태 추가

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    return "";
  };

  // 새 비밀번호 입력 시 유효성 검사 및 현재 비밀번호와 비교
  useEffect(() => {
    if (!newPassword) {
      setErrorMessage("");
      return;
    }

    if (newPassword === currentPassword) {
      setErrorMessage("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
      return;
    }

    const passwordError = validatePassword(newPassword);
    setErrorMessage(passwordError);
  }, [newPassword, currentPassword]);

  // 새 비밀번호 확인 입력 시 오류 메시지 설정
  useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setErrorMessage("새 비밀번호와 동일하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [confirmPassword, newPassword]);

  // 비밀번호 변경 API 요청
  async function handleChangePasswordApi(password: string, newPassword: string) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/auth/password", {
        password,
        newPassword,
      });

      console.log("비밀번호 변경 성공", response.data);
      setModalMessage("비밀번호가 성공적으로 변경되었습니다."); // 성공 메시지 설정
      setIsModalOpen(true);
    } catch (error: any) {
      console.error("비밀번호 변경 실패", error.response?.data || error.message);

      //  400 에러 처리 → 현재 비밀번호가 틀린 경우
      if (error.response?.status === 400) {
        setModalMessage("현재 비밀번호를 잘못 입력하셨습니다.");
      } else {
        setModalMessage("비밀번호 변경에 실패했습니다. 다시 시도해 주세요.");
      }
      setIsModalOpen(true); // 모달 띄우기
    } finally {
      setIsLoading(false);
    }
  }

  // 비밀번호 변경 처리
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("모든 필드를 입력해야 합니다.");
      return;
    }

    if (newPassword === currentPassword) {
      setErrorMessage("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("새 비밀번호와 동일하지 않습니다.");
      return;
    }

    // API 요청 실행
    await handleChangePasswordApi(currentPassword, newPassword);

    // 입력값 초기화
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.passwordCard}>
      <h2>비밀번호 변경</h2>

      <div className={styles.passwordInputGroup}>
        <label htmlFor="current-password">현재 비밀번호</label>
        <input
          id="current-password"
          type="password"
          placeholder="비밀번호 입력"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className={styles.passwordInputGroup}>
        <label htmlFor="new-password">새 비밀번호</label>
        <input
          id="new-password"
          type="password"
          placeholder="새 비밀번호 입력"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className={styles.passwordInputGroup}>
        <label htmlFor="confirm-password">새 비밀번호 확인</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="새 비밀번호 입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={newPassword !== confirmPassword && confirmPassword ? styles.errorInput : ""}
        />
      </div>

      {errorMessage && (
        <span className={styles.errorText} aria-live="polite">
          {errorMessage}
        </span>
      )}

      <button
        onClick={handleChangePassword}
        className={styles.changeButton}
        disabled={
          isLoading ||
          !currentPassword ||
          !newPassword ||
          !confirmPassword ||
          newPassword !== confirmPassword ||
          !!errorMessage
        }
      >
        {isLoading ? "변경 중..." : "변경"}
      </button>

      {/* 모달 창 */}
      <CustomModal isOpen={isModalOpen} width="384">
        <div className={styles.CustomModal}>
          <div className={styles.modalStyle}>
            <p>{modalMessage}</p>
            <CustomButton
              onClick={() => setIsModalOpen(false)} 
              width={240}
              height={48}
              className={styles.customButton}
            >
              <p>확인</p>
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
