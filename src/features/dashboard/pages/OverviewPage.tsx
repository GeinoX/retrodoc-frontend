import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";

export default function OverviewPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <>
      <h1>{t("dashboard.welcome", { name: user?.first_name })}</h1>

      <div className="actions">
        <Link to="/found" className="card action">
          <h2>{t("home.found.title")}</h2>
        </Link>
        <Link to="/lost" className="card action">
          <h2>{t("home.lost.title")}</h2>
        </Link>
      </div>

      <section>
        <h2>{t("dashboard.attention")}</h2>
        <p>{t("dashboard.empty")}</p>
      </section>

      <section>
        <h2>{t("dashboard.active")}</h2>
        <p>{t("dashboard.empty")}</p>
      </section>

      {user?.role === "officer" && (
        <section>
          <h2>{t("dashboard.station")}</h2>
          <p>{t("dashboard.empty")}</p>
        </section>
      )}
    </>
  );
}
