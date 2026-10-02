import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import CheckYourEmail from "../components/CheckYourEmail";

export default function RegisterPage() {
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  return registeredEmail ? (
    <CheckYourEmail email={registeredEmail} />
  ) : (
    <RegisterForm onSuccess={setRegisteredEmail} />
  );
}
