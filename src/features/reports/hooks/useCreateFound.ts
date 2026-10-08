import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFoundReport } from "../services/reportsService";

export function useCreateFound() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFoundReport,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-found-reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-reports"],
      });
    },
  });
}