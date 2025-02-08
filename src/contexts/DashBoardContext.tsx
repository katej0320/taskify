import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getDashboard } from "@/src/api/api"; // API 호출 함수 import

interface DashboardContextType {
  dashboards: any[];
  setDashboards: (dashboards: any[]) => void;
  loading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDashboards() {
      try {
        setLoading(true); // 로딩 상태 시작
        const data = await getDashboard({
          size: 6, // 예시로 페이지당 6개 대시보드
        });
        if (data) {
          setDashboards(data.dashboards); // 받아온 대시보드 데이터 상태에 저장
        }
      } catch (error) {
        console.error("대시보드 가져오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    }
    fetchDashboards();
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboards, setDashboards, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard는 DashboardProvider 내에서 사용해야 합니다");
  }
  return context;
};
