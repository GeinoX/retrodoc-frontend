import apiClient from "../../../lib/apiClient";
import type { Region, Station } from "../types";

const ENDPOINTS = {
  STATIONS: "/stations/",
  REGIONS: "/stations/regions/",
} as const;

export async function getStations(): Promise<Station[]> {
  const response = await apiClient.get<Station[] | { results: Station[] }>(
    ENDPOINTS.STATIONS,
  );

  return Array.isArray(response.data)
    ? response.data
    : response.data.results;
}

export async function getRegions(): Promise<Region[]> {
  const response = await apiClient.get<Region[] | { results: Region[] }>(
    ENDPOINTS.REGIONS,
  );

  return Array.isArray(response.data)
    ? response.data
    : response.data.results;
}