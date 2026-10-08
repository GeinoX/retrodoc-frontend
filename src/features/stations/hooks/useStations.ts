import { useQuery } from "@tanstack/react-query";
import { getStations, getRegions } from "../services/stationsService";

export function useStations() {
  return useQuery({
    queryKey: ["stations"],
    queryFn: getStations,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: 5 * 60 * 1000,
  });
}