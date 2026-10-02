import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { resendVerification } from "../services/authService";

export default function ResendForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: resendVerification,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ email });
      }}
    >
      <label htmlFor="resend-email">{t("auth.verify.emailLabel")}</label>
      <input
        id="resend-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={isPending}>
        {t("auth.verify.resend")}
      </button>
      {isSuccess && <p role="status">{t("auth.checkEmail.resent")}</p>}
    </form>
  );
}
