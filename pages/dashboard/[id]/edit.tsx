import BackLocation from "@/src/components/dashboard/edit/BackLocation";
import BebridgeContainer from "@/src/components/dashboard/edit/BebridgeContainer";
import DeleteContainer from "@/src/components/dashboard/edit/DeleteContainer";
import InvitationContainer from "@/src/components/dashboard/edit/InvitationContainer";
import MemberContainer from "@/src/components/dashboard/edit/MemberContainer";
import Head from "next/head";
import styled from "styled-components";

// 공통 스타일이기 때문에 작업을 위한 임시 CSS 적용
const Container = styled.div`
  height: calc(env(safe-area-inset-bottom) + 100vh);
  padding: 20px;
  background: #fafafa;
`;

const Contents = styled.div`
  width: calc(100vw * 620 / 1200);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function EditPage() {
  return (
    <>
      <Head>
        <title>Teskify - 대시보드 수정</title>
      </Head>
      <Container>
        <Contents>
          <BackLocation />
          <BebridgeContainer />
          <MemberContainer />
          <InvitationContainer />
          <DeleteContainer />
        </Contents>
      </Container>
    </>
  );
}
