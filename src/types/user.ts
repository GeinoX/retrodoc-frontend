export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: "C" | "O" | "A";
  is_email_verified: boolean;
}