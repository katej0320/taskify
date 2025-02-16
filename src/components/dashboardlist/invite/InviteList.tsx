import React, { useState } from "react";
import styles from "./InviteList.module.scss";
import SearchBar from "./SearchBar";
import None from "./none";
import { acceptInvite } from "@/src/api/dashboardApi"; // acceptInvite 함수 임포트

interface Invite {
  id: number;
  dashboard: { id: number; title: string };
  inviter: { nickname: string };
  inviteAccepted: boolean; // 초대 수락 여부 필드
}

interface InviteDashboardListProps {
  invitations: Invite[];
  onAcceptInvite: (dashboardId: number) => void; // 대시보드 수락 후 처리 함수
}

const InviteDashboardList: React.FC<InviteDashboardListProps> = ({
  invitations,
  onAcceptInvite,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedInvitations, setUpdatedInvitations] = useState(invitations);

  // 검색 필터링
  const filteredInvitations = updatedInvitations.filter((invite) =>
    invite.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = async (invitationId: number, dashboardId: number) => {
    try {
      // 초대 수락 처리
      await acceptInvite(invitationId);

      // 초대 목록에서 해당 초대 삭제
      setUpdatedInvitations((prevInvitations) =>
        prevInvitations.filter((invite) => invite.id !== invitationId)
      );

      // 대시보드 리스트에 해당 대시보드 추가
      onAcceptInvite(dashboardId); // 부모 컴포넌트로 대시보드 추가 처리
    } catch (error) {
      console.error("초대 수락 실패:", error);
    }
  };

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
                {!invite.inviteAccepted ? (
                  <>
                    <button
                      className={styles.accept}
                      onClick={() =>
                        handleAccept(invite.id, invite.dashboard.id)
                      } // 대시보드 ID도 함께 전달
                    >
                      수락
                    </button>
                    <button className={styles.reject}>거절</button>
                  </>
                ) : (
                  <span>초대 수락됨</span>
                )}
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
