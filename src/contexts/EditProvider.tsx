import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../api/axios";

const EditContext = createContext({ isMembers: null, isInvitations: null });

export function EditProvider({
  children,
  dashboardId,
}: {
  children: ReactNode;
  dashboardId: string | string[] | undefined;
}) {
  const [values, setValues] = useState({
    isMembers: null,
    isInvitations: null,
  });

  async function getMembers() {
    const res = await axiosInstance.get(
      `/members?dashboardId=${dashboardId}`
    );
    const members = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isMembers: members,
    }));
  }

  useEffect(() => {
    if (dashboardId) {
      getMembers();
    }
  }, [dashboardId]);

  return (
    <EditContext.Provider
      value={{
        isMembers: values.isMembers,
        isInvitations: values.isInvitations,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);

  if (!context) {
    throw new Error("반드시 EditProvider 안에서 사용해야 합니다.");
  }

  return context;
}
