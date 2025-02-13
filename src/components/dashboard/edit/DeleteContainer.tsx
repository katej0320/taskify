import { useState } from "react";
import { Button } from "../../button/CustomButton2";
import { CheckModal } from "./modal/CheckModal";

export default function DeleteContainer({
  dashboardId,
}: {
  dashboardId: string | string[] | undefined;
}) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const isMessage = "이 대시보드를 삭제하시겠습니까?";
  const [isDashboardId, setIsDashboardId] = useState(dashboardId);

  const handleShowModal = () => {
    setIsModal(true);
  };

  return (
    <>
      {isModal && (
        <CheckModal
          deleteDashboard={"deleteDashboard"}
          isModal={isModal}
          setIsModal={setIsModal}
          isMessage={isMessage}
        />
      )}
      <Button onClick={handleShowModal} $half="half">
        대시보드 삭제하기
      </Button>
    </>
  );
}
