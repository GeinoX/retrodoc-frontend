import apiClient from "../../../lib/apiClient";
import type {
  CreateFoundReportPayload,
  CreateLostReportPayload,
  Report,
} from "../types";

const ENDPOINTS = {
  FOUND: "/found-reports/",
  FOUND_MINE: "/found-reports/my/",
  LOST: "/lost-reports/",
  LOST_MINE: "/lost-reports/my/",
} as const;

async function extractList<T>(
  promise: Promise<{ data: T[] | { results: T[] } }>,
): Promise<T[]> {
  const response = await promise;

  return Array.isArray(response.data)
    ? response.data
    : response.data.results;
}

export async function createFoundReport(
  payload: CreateFoundReportPayload,
): Promise<Report> {
  const response = await apiClient.post<Report>(
    ENDPOINTS.FOUND,
    payload,
  );

  return response.data;
}

export async function createLostReport(
  payload: CreateLostReportPayload,
): Promise<Report> {
  const response = await apiClient.post<Report>(
    ENDPOINTS.LOST,
    payload,
  );

  return response.data;
}

export async function getMyFoundReports(): Promise<Report[]> {
  return extractList<Report>(
    apiClient.get(ENDPOINTS.FOUND_MINE),
  );
}

export async function getMyLostReports(): Promise<Report[]> {
  return extractList<Report>(
    apiClient.get(ENDPOINTS.LOST_MINE),
  );
}

export async function getMyReports(): Promise<Report[]> {
  const [found, lost] = await Promise.all([
    getMyFoundReports(),
    getMyLostReports(),
  ]);

  return [...found, ...lost].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime(),
  );
}