import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./EditPage.style.module.scss";
import { useEdit } from "@/src/contexts/EditDashboardProvider";
import { Button } from "../../button/CustomButton2";
import IconCheck from "@/public/images/dashboard/edit/ic_check.svg";
import { CheckModal } from "./modal/CheckModal";
import axiosInstance from "@/src/api/axios";

const COLOR_PALETTE = ["#7ac555", "#760dde", "#ffa500", "#76a5ea", "#e876ea"];

const ColorTile = styled.li`
  background: ${(props) => props.color};
  width: 30px;
  height: 30px;
  padding-top: 2px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

export default function BebridgeContainer({
  dashboardId,
}: {
  dashboardId: string | string[] | undefined;
}) {
  const [isTitle, setIsTitle] = useState("");
  const [isColor, setIsColor] = useState("");
  const [isUpdateTitle, setIsUpdateTitle] = useState("");
  const [isUpdateColor, setIsUpdateColor] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const isMessage = "변경이 완료 되었습니다.";
  const [isUpdate, setIsUpdate] = useState();

  const { isBebridge, getDashboardDetail } = useEdit();

  const handleUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUpdateTitle(e.target.value);
  };

  const handleUpdateColor = (color: string) => {
    setIsUpdateColor(color);
  };

  const handleShowModal = () => {
    setIsModal(true);

    async function putDashboardDetail() {
      try {
        const res = await axiosInstance.put(`/dashboards/${dashboardId}`, {
          title: isUpdateTitle,
          color: isUpdateColor,
        });
        setIsUpdate(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    putDashboardDetail();
  };

  useEffect(() => {
    if (isBebridge) getDashboardDetail();
  }, [isUpdate]);

  useEffect(() => {
    if (isBebridge) {
      const { title, color }: { title: string; color: string } = isBebridge;
      const isColor = color.toLowerCase();
      setIsTitle(title);
      setIsUpdateTitle(title);
      setIsColor(isColor);
      setIsUpdateColor(isColor);
    }
  }, [isBebridge]);

  useEffect(() => {
    if (
      isUpdateTitle !== "" &&
      (isTitle !== isUpdateTitle || isColor !== isUpdateColor)
    ) {
      setIsDisabled(false);
    } else if (
      isUpdateTitle === "" ||
      (isTitle === isUpdateTitle && isColor === isUpdateColor)
    ) {
      setIsDisabled(true);
    }
  }, [isTitle, isColor, isUpdateTitle, isUpdateColor]);

  return (
    <>
      {isModal && (
        <CheckModal
          isModal={isModal}
          setIsModal={setIsModal}
          isMessage={isMessage}
        />
      )}
      <div className={`${styles.container} ${styles.section1}`}>
        <div className={styles.head}>
          <p className={styles.title}>비브리지</p>
        </div>
        <div className={styles.contents}>
          <p className={styles.title}>대시보드 이름</p>
          <form>
            <input
              type="text"
              defaultValue={isTitle}
              maxLength={15}
              placeholder="대시보드 이름을 입력해주세요"
              onChange={handleUpdateTitle}
            />
          </form>
          <ul className={styles.colorList}>
            {COLOR_PALETTE.map((color, i) => {
              return (
                <ColorTile
                  key={i}
                  color={color}
                  onClick={() => handleUpdateColor(color)}
                >
                  {isUpdateColor === color && <IconCheck />}
                </ColorTile>
              );
            })}
          </ul>
          <Button
            disabled={isDisabled}
            $signature="signature"
            onClick={handleShowModal}
          >
            변경
          </Button>
        </div>
      </div>
    </>
  );
}
