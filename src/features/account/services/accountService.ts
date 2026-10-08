import apiClient from "../../../lib/apiClient";
import type { User } from "../../../types/user";
import type { ProfileUpdatePayload } from "../types";

export async function getProfile(): Promise<User> {
  const response = await apiClient.get<User>("/auth/me/");
  return response.data;
}

export async function updateProfile(
  payload: ProfileUpdatePayload,
): Promise<User> {
  const response = await apiClient.patch<User>(
    "/auth/me/",
    payload,
  );

  return response.data;
}