import { useTranslation } from "react-i18next";

export default function PlaceholderPage({ name }: { name: string }) {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t(`dashboard.nav.${name}`)}</h1>
      <p>{t("dashboard.empty")}</p>
    </>
  );
}
