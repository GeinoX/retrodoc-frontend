import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/authService";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      await queryClient.refetchQueries({
        queryKey: ["me"],
      });
    },
  });
}