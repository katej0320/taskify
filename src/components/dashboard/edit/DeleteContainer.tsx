import { useState } from "react";
import { Button } from "../../button/CustomButton2";
import { CheckModal } from "./modal/CheckModal";
import axiosInstance from "@/src/api/axios";
import { useRouter } from "next/router";

export default function DeleteContainer({
  dashboardId,
}: {
  dashboardId: string | string[] | undefined;
}) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const isMessage = "이 대시보드를 삭제하시겠습니까?";
  const [isDashboardId, setIsDashboardId] = useState(dashboardId);

  const router = useRouter();

  const handleShowModal = () => {
    setIsModal(true);
  };

  async function deleteDashboard() {
    try{
      setIsDashboardId(dashboardId);
      await axiosInstance.delete(`/dashboards/${isDashboardId}`)
    }catch(error){
      console.error(error)
    }finally{
      router.push("/dashboard")
    }
  }

  return (
    <>
      {isModal && (
        <CheckModal
        dashboard={"dashboard"}
        isModal={isModal}
        setIsModal={setIsModal}
        isMessage={isMessage}
        deleteDashboard={deleteDashboard}
        />
      )}
      <Button onClick={handleShowModal} $half="half">
        대시보드 삭제하기
      </Button>
    </>
  );
}
