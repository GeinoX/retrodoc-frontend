import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import ResendForm from "../components/ResendForm";

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const status = useVerifyEmail(params.get("token"));

  if (status.state === "loading")
    return <p role="status">{t("auth.verify.loading")}</p>;

  if (status.state === "success")
    return (
      <section>
        <h1>{t("auth.verify.successTitle")}</h1>
        <Link to="/login">{t("auth.verify.login")}</Link>
      </section>
    );

  return (
    <section role="alert">
      <h1>{t(`auth.verify.${status.reason}.title`)}</h1>
      <p>{t(`auth.verify.${status.reason}.body`)}</p>
      <ResendForm />
    </section>
  );
}
