import axiosInstance from "./axios";
import { IDashboardParams, IInviteParams } from "../types/dashboard";

// ✅ 세션 스토리지에서 토큰을 가져오는 로직을 `fetchWithAuth`에 통합
async function fetchWithAuth(url: string, params?: object) {
  try {
    if (typeof window === "undefined") return null;

    // 세션 스토리지에서 토큰 가져오기
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Token not found in sessionStorage");
      return null;
    }

    const res = await axiosInstance.get(url, { params });
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null; // 오류 발생 시 기본값 반환
  }
}

export async function getDasboards({
  navigationMethod = "pagination",
  teamId = "12-1",
  ...params
}: IDashboardParams = {}) {
  return fetchWithAuth("/dashboards", { navigationMethod, teamId, ...params });
}

export async function getDashboard(dashboardId: number = 0) {
  return fetchWithAuth("/dashboards/", { dashboardId });
}

export async function getInviteList({
  teamId = "12-1",
  ...params
}: IInviteParams = {}) {
  return fetchWithAuth("/invitations", { teamId, ...params });
}

export async function getColumns(dashboardId: number) {
  return fetchWithAuth("/columns", { dashboardId });
}

export async function addColumns(dashboardId: number, title: string) {
  return fetchWithAuth(`/columns`, {
    method: "POST",
    data: { title, dashboardId },
  });
}

export async function getCards(size: number = 10, columnId: number) {
  return fetchWithAuth("/cards", { size, columnId });
}

export async function addCards(
  columnId: number,
  cardData: {
    assigneeUserId: number;
    dashboardId: number;
    columnId: number;
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl: string;
  }
) {
  try {
    const response = await fetchWithAuth(`/card`, {
      method: "POST",
      body: JSON.stringify({
        assigneeUserId: cardData.assigneeUserId,
        dashboardId: cardData.dashboardId,
        columnId: cardData.columnId,
        title: cardData.title,
        description: cardData.description,
        dueDate: cardData.dueDate,
        tags: cardData.tags,
        imageUrl: cardData.imageUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add card");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
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
