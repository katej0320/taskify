import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../api/axios";

const EditContext = createContext({
  isBebridge: null,
  isMembers: null,
  isInvitations: null,
});

export function EditProvider({
  children,
  dashboardId,
}: {
  children: ReactNode;
  dashboardId: string | string[] | undefined;
}) {
  const [values, setValues] = useState({
    isBebridge: null,
    isMembers: null,
    isInvitations: null,
  });

  async function getDashboardDetail() {
    const res = await axiosInstance.get(`/dashboards/${dashboardId}`);
    const bebridge = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isBebridge: bebridge,
    }));
  }

  async function getMembers() {
    const res = await axiosInstance.get(`/members?dashboardId=${dashboardId}`);
    const members = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isMembers: members,
    }));
  }

  async function getInvitations() {
    const res = await axiosInstance.get(
      `/dashboards/${dashboardId}/invitations`
    );
    const invitaions = res.data;

    setValues((prevValues) => ({
      ...prevValues,
      isInvitations: invitaions,
    }));
  }

  useEffect(() => {
    if (dashboardId) {
      getDashboardDetail();
      getMembers();
      getInvitations();
    }
  }, [dashboardId]);

  return (
    <EditContext.Provider
      value={{
        isBebridge: values.isBebridge,
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
