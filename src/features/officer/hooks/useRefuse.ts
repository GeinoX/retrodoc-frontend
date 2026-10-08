import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refuseHandover } from "../services/officerService";

export function useRefuse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refuseHandover,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["handover-history"],
      });
    },
  });
}