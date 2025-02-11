import { IDashboardParams, IInviteParams } from "../types/dashboard";
import axiosInstance from "./axios";

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
