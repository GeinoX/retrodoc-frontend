import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail, getVerifyFailureReason } from '../services/authService';
import type { VerifyStatus } from '../types';

export function useVerifyEmail(token: string | null): VerifyStatus {
  const { mutate, isSuccess, isError, error } = useMutation({ mutationFn: verifyEmail });
  const started = useRef(false); // avoids the double run in dev (StrictMode)

  useEffect(() => {
    if (token && !started.current) {
      started.current = true;
      mutate(token);
    }
  }, [token, mutate]);

  if (!token) return { state: 'error', reason: 'invalid' };
  if (isSuccess) return { state: 'success' };
  if (isError) return { state: 'error', reason: getVerifyFailureReason(error) };
  return { state: 'loading' };
}