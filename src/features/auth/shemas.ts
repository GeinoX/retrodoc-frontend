import { z } from 'zod';
import type { TFunction } from 'i18next';

// TODO: align with the backend's real password rules.
export const PASSWORD_RULES = [
  { key: 'min', test: (v: string) => v.length >= 8 },
  { key: 'upper', test: (v: string) => /[A-Z]/.test(v) },
  { key: 'lower', test: (v: string) => /[a-z]/.test(v) },
  { key: 'digit', test: (v: string) => /\d/.test(v) },
  { key: 'symbol', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const;

export const createRegisterSchema = (t: TFunction) => {
  const required = t('auth.register.errors.required');
  return z
    .object({
      first_name: z.string().trim().min(1, required),
      last_name: z.string().trim().min(1, required),
      email: z.string().trim().email(t('auth.register.errors.email')),
      phone: z.string().trim().regex(/^\+\d{8,15}$/, t('auth.register.errors.phone')),
      password: z
        .string()
        .refine((v) => PASSWORD_RULES.every((r) => r.test(v)), t('auth.register.errors.password')),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      path: ['confirmPassword'],
      message: t('auth.register.errors.mismatch'),
    });
};