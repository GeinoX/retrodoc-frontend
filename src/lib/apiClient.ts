import axios from 'axios';

console.log(import.meta.env.VITE_API_BASE_URL)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. http://127.0.0.1:8000/api/v1
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export default apiClient;