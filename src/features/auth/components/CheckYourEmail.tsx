import { useTranslation } from "react-i18next";
import { useResendVerification } from "../hooks/useResendVerification";

export default function CheckYourEmail({ email }: { email: string }) {
  const { t } = useTranslation();
  const { mutate, secondsLeft, isPending, isSuccess, isError } =
    useResendVerification(email);

  return (
    <section>
      <h1>{t("auth.checkEmail.title")}</h1>
      <p>{t("auth.checkEmail.body", { email })}</p>

      <button onClick={() => mutate()} disabled={secondsLeft > 0 || isPending}>
        {secondsLeft > 0
          ? t("auth.checkEmail.resendIn", { seconds: secondsLeft })
          : t("auth.checkEmail.resend")}
      </button>

      {isSuccess && <p>{t("auth.checkEmail.resent")}</p>}
      {isError && <p>{t("auth.checkEmail.resendError")}</p>}
    </section>
  );
}
