import React, { useState } from "react";
import styles from "@/pages/mypage/mypage.module.scss";

export default function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("비밀번호 변경: ", { currentPassword, newPassword });
    setErrorMessage("");
  };

  return (
    <div className={styles.passwordCard}>
      <h2>비밀번호 변경</h2>

      <div className={styles.passwordInputGroup}>
        <label>현재 비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className={styles.passwordInputGroup}>
        <label>새 비밀번호</label>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className={styles.passwordInputGroup}>
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => {
            if (confirmPassword && newPassword !== confirmPassword) {
              setErrorMessage("비밀번호가 일치하지 않습니다.");
            } else {
              setErrorMessage("");
            }
          }}
          className={newPassword !== confirmPassword && confirmPassword ? styles.errorInput : ""}
        />
        {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
      </div>

      <button
        onClick={handleChangePassword}
        className={styles.changeButton}
        disabled={!currentPassword || !newPassword || !confirmPassword}
      >
        변경
      </button>
    </div>
  );
}
