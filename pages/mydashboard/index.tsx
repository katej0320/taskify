import NavBar from "@/src/components/nav/NavBar";
import SideBar from "@/src/components/sidebar/SideBar";
import styles from "./index.module.scss";
import { getDashboard } from "@/src/api/api";

export default function MyDashboardPage() {
  return (
    <div className={styles.contents}>
      <SideBar />
      <NavBar />
      <div className={styles.content}>안에 내용 들어감</div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { dashboards = [] } = await getDashboard();

    return {
      props: { dashboards }, // Pass data to the component
    };
  } catch (error) {
    console.error("Failed to fetch dashboard:", error);
    return {
      props: { dashboards: [] }, // Return an empty array on error
    };
  }
}
