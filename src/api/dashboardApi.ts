import { IDashboardParams, IInviteParams } from "../types/dashboard";
import axiosInstance from "./axiosTest";

async function fetchWithAuth(url: string, params?: object) {
  try {
    if (typeof window === "undefined") return null;

    // 세션 스토리지에서 토큰 가져오기
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Token not found in sessionStorage");
      return null;
    }
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    const res = await axiosInstance.get(url, { params, headers });
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null; // 오류 발생 시 기본값 반환
  }
}

export async function getDashboard({
  navigationMethod = "pagination",
  teamId = "12-1",
  ...params
}: IDashboardParams = {}) {
  return fetchWithAuth("/dashboards", { navigationMethod, teamId, ...params });
}

export async function getInviteList({
  teamId = "12-1",
  ...params
}: IInviteParams = {}) {
  return fetchWithAuth("/invitations", { teamId, ...params });
}

export async function getColumns(dashboardId: number) {
  const url = "/columns";

  return fetchWithAuth(url, {
    dashboardId,
  });
}

export async function addColumns(dashboardId: number, title: string) {
  return fetchWithAuth(`/columns`, {
    method: "POST",
    data: { title, dashboardId },
  });
}

export async function getCards(size: number = 10, columnId: number) {
  const url = "/cards";
  return fetchWithAuth(url, {
    size,
    columnId,
  });
}

export const updateColumnTitle = async (columnId: number, newTitle: string) => {
  try {
    const response = await axiosInstance.put(`/columns/${columnId}`, {
      title: newTitle,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating column title:", error);
    throw error;
  }
};

export const deleteColumn = async (columnId: number) => {
  try {
    const response = await axiosInstance.delete(`/columns/${columnId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting column:", error);
    throw error;
  }
};
