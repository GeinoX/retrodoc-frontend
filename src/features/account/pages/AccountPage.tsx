import PageContainer from "../../../components/layout/PageContainer";
import ProfileForm from "../components/ProfileForm";
import PreferencesForm from "../components/PreferencesForm";
import SecurityForm from "../components/SecurityForm";

export default function AccountPage() {
  return (
    <PageContainer>
      <div className="page-header">
        <div>
          <h1>Account</h1>
          <p className="muted">
            Manage your profile, preferences and account security.
          </p>
        </div>
      </div>

      <div className="page-stack">
        <ProfileForm />
        <PreferencesForm />
        <SecurityForm />
      </div>
    </PageContainer>
  );
}
