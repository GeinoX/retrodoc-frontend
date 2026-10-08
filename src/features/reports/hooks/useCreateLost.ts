import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLostReport } from "../services/reportsService";

export function useCreateLost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLostReport,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-lost-reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-reports"],
      });
    },
  });
}