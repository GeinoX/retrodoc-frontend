import { useQuery } from "@tanstack/react-query";
import { getMyFoundReports } from "../../reports/services/reportsService";

export function useDeposits() {
  return useQuery({
    queryKey: ["officer-deposits"],
    queryFn: getMyFoundReports,
  });
}