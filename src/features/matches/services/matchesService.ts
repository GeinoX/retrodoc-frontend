import apiClient from "../../../lib/apiClient";
import type {
  MatchActionResponse,
  MatchResponse,
} from "../types";

export async function confirmMatch(
  reference: string,
): Promise<MatchActionResponse> {
  const response = await apiClient.post<MatchActionResponse>(
    `/lost-reports/${reference}/confirm/`,
  );

  return response.data;
}

export async function declineMatch(
  reference: string,
): Promise<MatchActionResponse> {
  const response = await apiClient.post<MatchActionResponse>(
    `/lost-reports/${reference}/reject/`,
  );

  return response.data;
}

export async function refreshMatch(
  reference: string,
): Promise<MatchResponse> {
  const response = await apiClient.post<MatchResponse>(
    `/matching/${reference}/refresh/`,
  );

  return response.data;
}