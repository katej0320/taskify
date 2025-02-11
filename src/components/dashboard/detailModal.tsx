import Image from "next/image";
import styles from "./detailModal.module.scss";

export default function DetailModal({ card, index }: any) {
  return (
    <>
      <div className={styles.modalTitle}>
        <h1>{card.title}</h1>
        <Image
          src="/icons/kebab.svg"
          width={28}
          height={28}
          alt="케밥 아이콘"
        />
        <Image
          src="/icons/close.svg"
          width={28}
          height={28}
          alt="닫기 아이콘"
        />
      </div>
      <div>{card.description}</div>
      {/* 이미지 안 가지고와 져서 임시로 해놈 */}
      <Image
        src="/images/landing_hero.png"
        width={445}
        height={260}
        alt="카드 이미지"
      />

      <div>
        {card.tags.map((tag: string) => (
          <span className={styles.tag} key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.cardInfo}>
        <span>담당자</span>
        <span>마감일</span>
        <p>{card.dueDate}</p>
      </div>
    </>
  );
}
