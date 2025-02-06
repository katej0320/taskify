import { IDashboardParams } from "../types/dashboard";
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
