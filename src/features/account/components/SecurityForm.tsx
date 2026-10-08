import { useAuth } from "../../auth/hooks/useAuth";
import { useLogout } from "../../auth/hooks/useLogout";

export default function SecurityForm() {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <section className="card form-stack">
      <div>
        <h2>Security</h2>
        <p className="muted">Manage your RetroDoc account access.</p>
      </div>

      <div className="security-row">
        <div>
          <strong>Email verification</strong>
          <p className="muted">
            {user?.is_email_verified
              ? "Your email address is verified."
              : "Your email address is not verified."}
          </p>
        </div>

        <span className="status-badge">
          {user?.is_email_verified ? "Verified" : "Not verified"}
        </span>
      </div>

      <div className="security-row">
        <div>
          <strong>Account session</strong>
          <p className="muted">Sign out from this device.</p>
        </div>

        <button
          type="button"
          className="button secondary"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          {logout.isPending ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </section>
  );
}
