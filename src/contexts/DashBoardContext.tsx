import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getDashboards } from "@/src/api/dashboardApi"; // API 호출 함수 import

interface DashboardContextType {
  dashboards: any[];
  setDashboards: (dashboards: any[]) => void;
  loading: boolean;
  navigationMethod: string; // navigationMethod 상태 추가
  setNavigationMethod: (method: string) => void; // navigationMethod 변경 함수 추가
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigationMethod, setNavigationMethod] =
    useState<string>("infiniteScroll");

  useEffect(() => {
    async function fetchDashboards() {
      try {
        setLoading(true);
        const data = await getDashboards({
          navigationMethod: "pagination",
          size: 100,
        });
        if (data) {
          setDashboards(data.dashboards);
        }
      } catch (error) {
        console.error("대시보드 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboards();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboards,
        setDashboards,
        loading,
        navigationMethod,
        setNavigationMethod,
      }}
    >
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
