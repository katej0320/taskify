import Image from "next/image";
import Link from "next/link";
import style from "./LandingHeader.style.module.scss";

export default function LandingHeader() {
  return (
    <div className={style.header}>
      <Link href="/">
        <Image
          src="/icons/landinglogo.svg"
          width={150}
          height={50}
          alt="landinglogo.svg"
          priority
        />
      </Link>
      <div className={style.contents}>
        <Link href="/login" className={style.link}>
          로그인
        </Link>
        <Link href="/signup" className={style.link}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
