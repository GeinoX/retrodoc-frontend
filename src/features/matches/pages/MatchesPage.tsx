import { useTranslation } from "react-i18next";

import MatchTab from "../components/MatchTab";

export default function MatchesPage() {
  const { t } = useTranslation();

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>{t("dashboard.nav.matches")}</h1>

          <p>Possible matches for your lost document reports.</p>
        </div>
      </div>

      <MatchTab />
    </section>
  );
}
