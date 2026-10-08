import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const STORAGE_KEY = "retrodoc-email-notifications";

export default function PreferencesForm() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      setEmailNotifications(saved === "true");
    }
  }, []);

  function toggleNotifications() {
    const next = !emailNotifications;

    setEmailNotifications(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  }

  return (
    <section className="card form-stack">
      <div>
        <h2>Preferences</h2>
        <p className="muted">Choose how RetroDoc behaves for you.</p>
      </div>

      <LanguageSwitcher />

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={toggleNotifications}
        />

        <span>
          <strong>Email notifications</strong>
          <small className="muted">
            Receive important updates about your reports and possible matches.
          </small>
        </span>
      </label>
    </section>
  );
}
