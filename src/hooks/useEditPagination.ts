import { useState } from "react";

export const useEditPagination = () => {
  const [memberPage, setMemberPage] = useState(1);
  const [invitePage, setInvitePage] = useState(1);

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === "member") setMemberPage((prevPage) => (prevPage -= 1));
    if (name === "invite") setInvitePage((prevPage) => (prevPage -= 1));
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === "member") setMemberPage((nextPage) => (nextPage += 1));
    if (name === "invite") setInvitePage((nextPage) => (nextPage += 1));
  };

  return { memberPage, invitePage, handlePrevClick, handleNextClick };
};
