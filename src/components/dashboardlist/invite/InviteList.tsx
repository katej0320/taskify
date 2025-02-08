import React, { useState } from "react";
import styles from "./InviteList.module.scss";
import SearchBar from "./SearchBar";
import None from "./none";

interface Invite {
  id: number;
  dashboard: { title: string };
  inviter: { nickname: string };
}

interface InviteDashboardListProps {
  invitations: Invite[];
}

const InviteDashboardList: React.FC<InviteDashboardListProps> = ({
  invitations,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 필터링
  const filteredInvitations = invitations.filter((invite) =>
    invite.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={styles.inviteTable}>
        <div className={styles.inviteHeader}>
          <span>이름</span>
          <span>초대자</span>
          <span>수락 여부</span>
        </div>
        {filteredInvitations.length > 0 ? (
          filteredInvitations.map((invite) => (
            <div key={invite.id} className={styles.inviteRow}>
              <span>{invite.dashboard.title}</span>
              <span>{invite.inviter.nickname}</span>
              <div className={styles.buttonGroup}>
                <button className={styles.accept}>수락</button>
                <button className={styles.reject}>거절</button>
              </div>
            </div>
          ))
        ) : (
          <None />
        )}
      </div>
    </div>
  );
};

export default InviteDashboardList;
