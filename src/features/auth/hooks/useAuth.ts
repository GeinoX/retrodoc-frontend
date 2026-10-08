import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/authService";

export function useAuth() {
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 0,
  });

  return {
    user: data ?? null,
    isLoading,
    isFetching,
    refetch,
  };
}