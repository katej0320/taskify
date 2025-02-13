import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import styles from "./EditPage.style.module.scss";
import { Button } from "../../button/CustomButton2";
import { useEdit } from "@/src/contexts/EditDashboardProvider";
import { MemberItem } from "@/src/types/EditComponent";
import { ArrowButton } from "@/src/types/EditPagination";
import { CheckModal } from "./modal/CheckModal";

const PaginationButton = styled(Button)<ArrowButton>`
  width: 40px;
  height: 40px;
  line-height: 43px;
  ${(props) =>
    props.$left
      ? css`
          border-radius: 4px 0 0 4px;
          background: url("/images/dashboard/edit/ic_prevArrow.svg") center
            center no-repeat #fff;
        `
      : props.$right
      ? css`
          border-radius: 0 4px 4px 0;
          background: url("/images/dashboard/edit/ic_nextArrow.svg") center
            center no-repeat #fff;
        `
      : ""}
  background-color:${(props) => (props.disabled ? "#f9f9f9" : "")};
  @media (min-width: 769px) and (max-width: 840px) {
    width: 30px;
    height: 30px;
    line-height: 33px;
  }
`;

export default function MemberContainer() {
  const [isMembersData, isSetMemberData] = useState<MemberItem[]>();
  const [isTotalCount, setIsTotalCount] = useState(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const isMessage = '선택된 구성원을 삭제하시겠습니까?';
  const [isDeleteId, setIsDeleteId] = useState<number>();

  const { memberPage, isMembers, handlePrevClick, handleNextClick } = useEdit();

  const handleShowModal = (userId:number) => {
    setIsModal(true);
    setIsDeleteId(userId)
  };

  useEffect(() => {
    if (isMembers) {
      const { members, totalCount } = isMembers;
      isSetMemberData(members);
      setIsTotalCount(Math.ceil(totalCount / 4));
    }
  }, [isMembers]);

  return (
    <>
    {isModal && <CheckModal member={'member'} isModal={isModal} setIsModal={setIsModal} isMessage={isMessage}/>}
      <div className={`${styles.container} ${styles.section2}`}>
        <div className={styles.head}>
          <p className={styles.title}>구성원</p>
          <div className={styles.controlCover}>
            <div className={styles.pagination}>
              <p className={styles.number}>
                {isTotalCount >= 1 ? isTotalCount : 1} 페이지 중 {memberPage}
              </p>
              <div className={styles.buttonContainer}>
                <PaginationButton
                  disabled={memberPage === 1 ? true : false}
                  $left={"left"}
                  name="member"
                  onClick={(e) => handlePrevClick(e)}
                />
                <PaginationButton
                  disabled={isTotalCount === memberPage || isTotalCount <= 1}
                  $right={"right"}
                  name="member"
                  onClick={(e) => handleNextClick(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contents}>
          <p className={styles.title}>이름</p>
          <ul className={styles.memberList}>
            {isMembersData &&
              isMembersData?.map((item) => {
                const {userId} = item
                return (
                  <li key={item.id} className={styles.tile}>
                    <div className={styles.profileCover}>
                      <div className={styles.thumbnail}></div>
                      <p className={styles.nickname}>{item.nickname}</p>
                    </div>
                    <Button onClick={() => handleShowModal(userId)} $sub="sub">삭제</Button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
