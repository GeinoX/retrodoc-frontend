import { useQuery } from "@tanstack/react-query";
import { getHandoverHistory } from "../services/officerService";

export function useRecords() {
  return useQuery({
    queryKey: ["handover-history"],
    queryFn: getHandoverHistory,
  });
}