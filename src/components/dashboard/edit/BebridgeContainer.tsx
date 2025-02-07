import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./EditPage.style.module.scss";
import { useEdit } from "@/src/contexts/EditDashbordProvider";
import { Button } from "../../button/CustomButton2";
import IconCheck from "@/public/images/dashboard/edit/ic_check.svg";

const COLOR_PALETTE = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

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

export default function BebridgeContainer() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTitle, setIsTitle] = useState("");
  const [isColor, setIsColor] = useState("");
  const [isUpdateTitle, setIsUpdateTitle] = useState("");
  const [isUpdateColor, setIsUpdateColor] = useState("");
  const { isBebridge } = useEdit();

  const handleUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsUpdateTitle(e.target.value);
  };

  const handleUpdateColor = (color: string) => {
    setIsUpdateColor(color);
  };

  useEffect(() => {
    if (isTitle !== isUpdateTitle || isColor !== isUpdateColor) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isUpdateTitle, isUpdateColor]);

  useEffect(() => {
    if (isBebridge) {
      const { title, color } = isBebridge;
      setIsTitle(title);
      setIsUpdateTitle(title);
      setIsColor(color);
      setIsUpdateColor(color);
    }
  }, [isBebridge]);

  return (
    <>
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
          <Button disabled={isDisabled} $signature="signature">
            변경
          </Button>
        </div>
      </div>
    </>
  );
}
