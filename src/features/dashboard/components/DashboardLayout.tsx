import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";
import { useLogout } from "../../auth/hooks/useLogout";
import { NAV_ITEMS } from "../navigation";

export default function DashboardLayout() {
  console.log("layout");
  const { t } = useTranslation();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();
  const items = NAV_ITEMS.filter(
    (i) => !i.roles || i.roles.includes(user!.role),
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <span className="brand">RetroDoc</span>
        <nav>
          {items.map((i) => (
            <NavLink key={i.key} to={i.to} end={i.end}>
              {t(`dashboard.nav.${i.key}`)}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div>
        <header className="topbar">
          <span>{user!.first_name}</span>
          <button className="btn-secondary" onClick={() => logout()}>
            {t("dashboard.logout")}
          </button>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
