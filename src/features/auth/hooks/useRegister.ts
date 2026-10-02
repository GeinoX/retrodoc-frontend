import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { UseFormSetError } from 'react-hook-form';
import { register, getFieldErrors } from '../services/authService';
import type { RegisterFormValues } from '../types';

export function useRegister(setError: UseFormSetError<RegisterFormValues>) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: register,
    onError: (error) => {
      const fieldErrors = getFieldErrors(error);
      if (!fieldErrors) {
        setError('root.server', { message: t('auth.register.errors.generic') });
        return;
      }
      Object.entries(fieldErrors).forEach(([field, messages]) =>
        setError(field as keyof RegisterFormValues, { message: messages[0] }),
      );
    },
  });
}