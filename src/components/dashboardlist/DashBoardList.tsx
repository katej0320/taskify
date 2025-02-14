import Link from "next/link";
import Image from "next/image";
import ListCard from "@/src/components/dashboardlist/card/ListCard";
import Pagination from "@/src/components/pagination/Pagination"; // ✅ 추가
import styles from "../../../pages/dashboard/index.module.scss";
import { useEffect, useState } from "react";

import { DashBoardResponse, Dashboard } from "@/src/types/dashboard";
import axiosInstance from "@/src/api/axios";
import CustomModal from "../modal/CustomModal";
import CreateBoard from "./createBoard/createBoard";

interface DashboardListProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DashboardList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [total, setTotal] = useState(0);

  const [createdByMe, setcreatedByMe] = useState<{
    [key: number]: boolean;
  }>({});
  useEffect(() => {
    const test = async () => {
      const res = await axiosInstance.get("/dashboards", {
        params: { navigationMethod: "pagination", page, size },
      });
      setDashboards(res.data.dashboards);
      setTotal(res.data.totalCount);
      console.log(dashboards);
    };
    test();
  }, [page, size]);
  return (
    <>
      <div className={styles.listcardandpagination}>
        <ListCard>
          <button onClick={openModal}>tofhdns</button>
        </ListCard>
        <div className={styles.listcard}>
          {dashboards?.map((dashboard) => (
            <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
              <ListCard>
                <div
                  className={styles.colorCircle}
                  style={{ backgroundColor: dashboard.color }}
                ></div>
                <div>{dashboard.title}</div>
                {createdByMe[dashboard.id] && (
                  <Image
                    src="/icons/crown.svg"
                    alt="Crown"
                    width={16}
                    height={16}
                  />
                )}
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
        </div>

        {isModalOpen && (
          <CustomModal
            className={styles.modal}
            isOpen={isModalOpen}
            onClose={closeModal}
            width="766px"
          >
            <CreateBoard onClose={closeModal} />
          </CustomModal>
        )}

        {/* ✅ 페이지네이션 추가 */}
        <div className={styles.pagination}>
          <Pagination
            currentPage={page}
            totalPages={total}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
