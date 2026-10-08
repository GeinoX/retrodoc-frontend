import { useQuery } from "@tanstack/react-query";
import {
  getMyFoundReports,
  getMyLostReports,
  getMyReports,
} from "../services/reportsService";

export function useMyFoundReports() {
  return useQuery({
    queryKey: ["my-found-reports"],
    queryFn: getMyFoundReports,
  });
}

export function useMyLostReports() {
  return useQuery({
    queryKey: ["my-lost-reports"],
    queryFn: getMyLostReports,
  });
}

export function useMyReports() {
  return useQuery({
    queryKey: ["my-reports"],
    queryFn: getMyReports,
  });
}