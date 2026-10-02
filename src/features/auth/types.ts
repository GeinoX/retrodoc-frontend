// ---- Register ----------------------------------------------------------

/** Exactly what the backend expects on POST /auth/register/ */
export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string; // international format, e.g. +237670124398
  password: string;
}

/** What the form holds. confirmPassword is UI-only and never sent. */
export interface RegisterFormValues extends RegisterPayload {
  confirmPassword: string;
}

export interface MessageResponse {
  message: string;
}

// ---- Errors ------------------------------------------------------------

/**
 * Django REST Framework style validation errors:
 * { "email": ["..."], "password": ["...", "..."] }
 */
export type ApiFieldErrors = Record<string, string[]>;

// ---- Verify email ------------------------------------------------------

export type VerifyFailureReason = 'expired' | 'invalid';

export type VerifyStatus =
  | { state: 'loading' }
  | { state: 'success' }
  | { state: 'error'; reason: VerifyFailureReason };

// ---- Resend ------------------------------------------------------------

export interface ResendVerificationPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_email_verified: boolean;
}