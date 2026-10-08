import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmCollection } from "../services/officerService";

interface Payload {
  collection_code: string;
  proof_shown: string;
}

export function useRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Payload) =>
      confirmCollection(
        payload.collection_code,
        payload.proof_shown,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reports"],
      });

      queryClient.invalidateQueries({
        queryKey: ["handover-history"],
      });
    },
  });
}