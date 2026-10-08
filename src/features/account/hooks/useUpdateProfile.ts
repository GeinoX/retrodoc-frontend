import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/accountService";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      queryClient.setQueryData(["me"], user);
    },
  });
}