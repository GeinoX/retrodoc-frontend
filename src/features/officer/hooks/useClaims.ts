import { useQuery } from "@tanstack/react-query";
import { getMyLostReports } from "../../reports/services/reportsService";

export function useClaims() {
  return useQuery({
    queryKey: ["officer-claims"],
    queryFn: getMyLostReports,
  });
}