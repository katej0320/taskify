import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTE1NywidGVhbUlkIjoiMTItMSIsImlhdCI6MTczODczMDk2NiwiaXNzIjoic3AtdGFza2lmeSJ9.lUVG2mbV9MVWlkGkDGNPmmAY7NTTu33aZDTEHmAwTh0",
  },
});

export default axiosInstance;

