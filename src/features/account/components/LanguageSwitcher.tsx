import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language.startsWith("fr") ? "fr" : "en";

  return (
    <div className="form-group">
      <label htmlFor="language">Language</label>

      <select
        id="language"
        value={currentLanguage}
        onChange={(event) => {
          const language = event.target.value;

          i18n.changeLanguage(language);
          localStorage.setItem("retrodoc-language", language);
        }}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}
