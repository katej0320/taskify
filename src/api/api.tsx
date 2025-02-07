import { IDashboardParams, IInviteParams } from "../types/dashboard";
import axiosInstance from "./axios";

export async function getDashboard({
  navigationMethod = "pagination",
  teamId = "12-1",
  ...params
}: IDashboardParams = {}) {
  try {
    const res = await axiosInstance.get("/dashboards", {
      params: { navigationMethod, teamId, ...params },
    });

    console.log("Dashboard Data:", res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    throw error; // Re-throw to handle it where this function is called
  }
}

export async function getInviteList({
  teamId = "12-1",
  ...params
}: IInviteParams = {}) {
  try {
    const res = await axiosInstance.get("/invitations", {
      params: { teamId, ...params },
    });
    console.log("invitation Data:", JSON.stringify(res.data, null, 2));

    return res.data;
  } catch (error) {
    console.error("Error fetching invitation", error);
    throw error;
  }
}
