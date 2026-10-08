import type { User } from "../../types/user";

export interface ProfileUpdatePayload {
  first_name: string;
  last_name: string;
  phone: string;
}

export interface AccountPreferences {
  language: "en" | "fr";
  emailNotifications: boolean;
}

export type AccountUser = User;