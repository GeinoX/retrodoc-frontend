import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      queryClient.setQueryData(["me"], null);

      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}