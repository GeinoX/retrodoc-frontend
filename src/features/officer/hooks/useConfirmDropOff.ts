import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmDropOff } from "../services/officerService";

export function useConfirmDropOff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmDropOff,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-found-reports"],
      });
    },
  });
}