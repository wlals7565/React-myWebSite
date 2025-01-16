import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // 요청 제한 시간
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // 요청 제한 시간
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const userConfirmed = window.confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?');
      if (userConfirmed) {
        // "예"를 선택하면 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
)
