import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "../button/CustomButton";
import styles from "./Section1.module.scss";

export default function Section1() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/landing_hero.png"
        width={722}
        height={428}
        alt="landing_hero.png"
        priority
      />
      <div className={styles.title}>
        <span>새로운 일정 관리 </span>
        <span className={styles.taskify}>Taskify</span>
      </div>
      <CustomButton width={280} height={54} className={styles.button}>
        <Link href="/login">로그인하기</Link>
      </CustomButton>
    </div>
  );
}
