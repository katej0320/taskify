import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import styles from "./index.module.scss";

export default function Page() {
  return (
    <div className={styles.contents}>
      <SideBar />
      <NavBar />
      <div className={styles.content}>안에 내용 들어감</div>
    </div>
  );
}
