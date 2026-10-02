console.log("API URL:", import.meta.env.VITE_API_URL)
import axios from 'axios';
import apiClient, { setAccessToken } from '@/lib/apiClient'; // shared axios instance (baseURL = .../api/v1)

import type {
  ApiFieldErrors,
  LoginPayload,
  MessageResponse,
  RegisterPayload,
  ResendVerificationPayload,
  User,
  VerifyFailureReason,
} from '../types';

const ENDPOINTS = {
  REGISTER: '/auth/register/',
  VERIFY_EMAIL: '/auth/verify-email/', // POST { token }
  RESEND_VERIFICATION: '/auth/resend-verification/', // POST { email }
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  ME: '/auth/me/',
} as const;

export async function register(payload: RegisterPayload): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>(ENDPOINTS.REGISTER, payload);
  return data;
}
export async function login(payload: LoginPayload): Promise<void> {
  const { data } = await apiClient.post<{ access: string }>(ENDPOINTS.LOGIN, payload);
  setAccessToken(data.access);
}

export async function logout(): Promise<void> {
  await apiClient.post(ENDPOINTS.LOGOUT);
  setAccessToken(null);
}

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<User>(ENDPOINTS.ME);
  return data;
}
export async function verifyEmail(token: string): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>(ENDPOINTS.VERIFY_EMAIL, { token });
  return data;
}

export async function resendVerification(
  payload: ResendVerificationPayload,
): Promise<MessageResponse> {
  const { data } = await apiClient.post<MessageResponse>(ENDPOINTS.RESEND_VERIFICATION, payload);
  return data;
}

// ---- Error helpers -----------------------------------------------------

/** DRF-style field errors ({ email: ["..."] }) from a failed 400, otherwise null. */
export function getFieldErrors(error: unknown): ApiFieldErrors | null {
  if (!axios.isAxiosError(error) || error.response?.status !== 400) return null;

  const data = error.response.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const entries = Object.entries(data as Record<string, unknown>).filter(
    ([, value]) => Array.isArray(value) && value.every((v) => typeof v === 'string'),
  );

  return entries.length ? (Object.fromEntries(entries) as ApiFieldErrors) : null;
}

/** 'expired' only when the backend says token_expired, anything else is 'invalid'. */
export function getVerifyFailureReason(error: unknown): VerifyFailureReason {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { code?: string } | undefined;
    if (data?.code === 'token_expired') return 'expired';
  }
  return 'invalid';
}