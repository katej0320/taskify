import Link from "next/link";
import Image from "next/image";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import styles from "../../../pages/dashboard/index.module.scss";

interface Dashboard {
  id: string;
  title: string;
  color: string;
}

interface DashboardListProps {
  dashboards: Dashboard[];
}

export default function DashboardList({ dashboards }: DashboardListProps) {
  return (
    <>
      {dashboards.map((dashboard) => (
        <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
          <ListCard>
            <div
              className={styles.colorCircle}
              style={{ backgroundColor: dashboard.color }}
            ></div>
            <div>{dashboard.title}</div>
            <Image
              src="/icons/arrow.svg"
              width={22}
              height={22}
              alt="arrow.svg"
              priority
            />
          </ListCard>
        </Link>
      ))}
    </>
  );
}
