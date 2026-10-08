import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineMatch } from "../services/matchesService";

export function useDeclineMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declineMatch,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-lost-reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });
}