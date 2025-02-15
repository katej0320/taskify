import IconCompleted from "@/public/images/dashboard/edit/ic_completed.svg";
import IconClose from "@/public/images/dashboard/edit/ic_toastClose.svg";
import { Left, Right, Text, ToastContainer } from "./style";

export function Toast({
  setIsToast,
  member,
  invite,
}: {
  setIsToast: React.Dispatch<React.SetStateAction<boolean>>;
  member?: boolean;
  invite?: boolean;
}) {
  return (
    <ToastContainer>
      <Left>
        <IconCompleted />
        <Text>{member ? "삭제" : invite ? "취소" : ""}가 완료 되었습니다.</Text>
      </Left>
      <Right>
        <IconClose onClick={() => setIsToast(false)} />
      </Right>
    </ToastContainer>
  );
}
