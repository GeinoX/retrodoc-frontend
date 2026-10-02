import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <header className="header">
        <span className="brand">RetroDoc</span>
        <nav className="nav">
          <Link to="/login" className="btn btn-secondary">
            {t("home.login")}
          </Link>
          <Link to="/register" className="btn">
            {t("home.register")}
          </Link>
        </nav>
      </header>

      <section className="hero">
        <h1>{t("home.title")}</h1>
        <p className="lead">{t("home.subtitle")}</p>
      </section>

      <section className="actions">
        <Link to="/found" className="card action">
          <h2>{t("home.found.title")}</h2>
          <p>{t("home.found.text")}</p>
        </Link>
        <Link to="/lost" className="card action">
          <h2>{t("home.lost.title")}</h2>
          <p>{t("home.lost.text")}</p>
        </Link>
      </section>

      <div className="center">
        <Link to="/dashboard" className="btn btn-secondary">
          {t("home.dashboard")}
        </Link>
      </div>

      <section className="steps">
        <h2>{t("home.how.title")}</h2>
        <ol>
          {["report", "match", "collect"].map((step, i) => (
            <li key={step} className="card">
              <span className="step-number">{i + 1}</span>
              <h3>{t(`home.how.${step}.title`)}</h3>
              <p>{t(`home.how.${step}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="note">{t("home.note")}</p>
    </div>
  );
}
