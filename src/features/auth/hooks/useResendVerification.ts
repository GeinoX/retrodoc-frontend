import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resendVerification } from '../services/authService';

const COOLDOWN = 60; // same as the backend's one-minute limit

export function useResendVerification(email: string) {
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const id = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const mutation = useMutation({
    mutationFn: () => resendVerification({ email }),
    onSuccess: () => setSecondsLeft(COOLDOWN),
  });

  return { ...mutation, secondsLeft };
}