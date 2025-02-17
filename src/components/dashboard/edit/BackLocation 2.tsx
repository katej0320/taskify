import { useRouter } from "next/router";
import Link from "next/link";
import IconBack from "@/public/images/dashboard/edit/ic_back.svg";
import styles from "./EditPage.style.module.scss";

export default function BackLocation() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <Link href={`/dashboard/${id}`} className={styles.backBtn}>
        <IconBack />
        <span>돌아가기</span>
      </Link>
    </>
  );
}
