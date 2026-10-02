import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";
import { useLogout } from "../../auth/hooks/useLogout";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();

  return (
    <div className="container">
      <h1>{t("dashboard.welcome", { name: user?.first_name })}</h1>
      <button onClick={() => logout()}>{t("dashboard.logout")}</button>
    </div>
  );
}
