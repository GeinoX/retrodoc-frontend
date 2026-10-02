import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/authService';

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe().catch(() => null), // null = not logged in
    retry: false,
    staleTime: Infinity,
  });
  return { user: data ?? null, isLoading };
}