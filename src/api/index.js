import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // 요청 제한 시간
  headers: {
    "Content-Type": "application/json",
  },
});
