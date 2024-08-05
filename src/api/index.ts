import axios, { AxiosInstance } from 'axios';

/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios 요청 인터셉터 설정
 */
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전 작업, 예: 토큰 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

/**
 * Axios 응답 인터셉터 설정
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 응답 오류 처리
    if (error.response && error.response.status === 401) {
      // 예: 인증 오류 시 처리
      console.error('Unauthorized, redirect to login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
