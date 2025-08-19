import axios from "axios";
import { env } from "./env";
import { useAuthStore } from "@/lib/auth";

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true, // so refresh cookie works if backend uses it
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
