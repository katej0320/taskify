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

export async function getMe() {
  const url = "/users/me";
  return fetchWithAuth(url);
}
