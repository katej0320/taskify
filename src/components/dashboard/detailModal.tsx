import Image from "next/image";
import styles from "./detailModal.module.scss";
import { useState } from "react";

export default function DetailModal({ card, index, columnTitle }: any) {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", maxWidth: "720px" }}>
      {/* 제목 & 아이콘 */}
      <div className={styles.modalTitle}>
        <h1>{card.title}</h1>
        <div className={styles.iconGroup}>
          {/* 케밥 아이콘 + 드롭다운 */}
          <div className={styles.dropdownWrapper}>
            <Image
              src="/icons/kebab.svg"
              width={28}
              height={28}
              alt="케밥 아이콘"
              onClick={toggleDropdown}
              className={styles.kebabIcon}
            />
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li>수정하기</li>
                <li>삭제하기</li>
              </ul>
            )}
          </div>
          {/* 닫기 아이콘 */}
          <Image
            src="/icons/close.svg"
            width={28}
            height={28}
            alt="닫기 아이콘"
          />
        </div>
      </div>

      {/* 컬럼 정보 & 태그 */}
      <div className={styles.modalInfo}>
        <div className={styles.columnTitle}>
          <div className={styles.circle} />
          {columnTitle}
        </div>
        <hr className={styles.hr} />
        <div className={styles.tagList}>
          {card.tags.map((tag: string) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 설명 */}
      <div className={styles.description}>{card.description}</div>

      {/* 담당자 & 마감일 박스 */}
      <div className={styles.cardMetaBox}>
        {/* 담당자 */}
        <div className={styles.assignee}>
          <span className={styles.label}>담당자</span>
          <div className={styles.assigneeDetails}>
            <Image
              src={card.assignee.image || "/images/default_profile.png"}
              width={32}
              height={32}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
            <span>{card.assignee.nickname}</span>
          </div>
        </div>

        <div className={styles.dueDate}>
          <span className={styles.label}>마감일</span>
          <p>{card.dueDate}</p>
        </div>
      </div>

      {/*카드 이미지 */}
      <Image
        src="/images/landing_hero.png"
        width={445}
        height={260}
        alt="카드 이미지"
      />

      {/* 댓글 입력 */}
      <div className={styles.comment}>
        <span>댓글</span>
        <div>
          <textarea
            placeholder="댓글 작성하기"
            className={styles.textarea}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className={`${styles.button} ${
              !inputValue.trim() ? styles.disabled : ""
            }`}
            disabled={!inputValue.trim()}
          >
            입력
          </button>
        </div>
      </div>
    </div>
  );
}
