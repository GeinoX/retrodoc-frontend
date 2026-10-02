import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true, // sends the refresh cookie
});

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

const NO_REFRESH = ['/auth/login/', '/auth/refresh/'];
let refreshing: Promise<string> | null = null; // one refresh at a time

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    if (error.response?.status !== 401 || !original || original._retry || NO_REFRESH.includes(original.url ?? '')) {
      throw error;
    }
    original._retry = true;

    if (!refreshing) {
      refreshing = apiClient
        .post('/auth/refresh/')
        .then((r) => r.data.access as string)
        .finally(() => { refreshing = null; });
    }

    try {
      const token = await refreshing;
      setAccessToken(token);
      original.headers.Authorization = `Bearer ${token}`;
      return apiClient(original);
    } catch {
      setAccessToken(null);
      throw error;
    }
  },
);

export default apiClient;