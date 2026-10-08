import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmMatch } from "../services/matchesService";

export function useConfirmMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmMatch,

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