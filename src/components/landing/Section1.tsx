import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "../button/CustomButton";

export default function Section1() {
  return (
    <div>
      <Image
        src="/images/landing_hero.png"
        width={722}
        height={428}
        alt="landing_hero.png"
        priority
      />
      <div>
        <span>새로운 일정 관리</span>
        <span>Taskify</span>
      </div>
      <CustomButton width={280} height={54}>
        <Link href="/login">로그인하기</Link>
      </CustomButton>
    </div>
  );
}
