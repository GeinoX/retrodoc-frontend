import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function ProfileForm() {
  const { data: user, isLoading } = useProfile();
  const mutation = useUpdateProfile();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      phone: user.phone ?? "",
    });
  }, [user]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();

    mutation.mutate(form);
  }

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <form className="card form-stack" onSubmit={submit}>
      <div>
        <h2>Profile</h2>
        <p className="muted">Keep your personal information up to date.</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="first-name">First name</label>

          <input
            id="first-name"
            value={form.first_name}
            onChange={(event) => update("first_name", event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last name</label>

          <input
            id="last-name"
            value={form.last_name}
            onChange={(event) => update("last_name", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>

        <input id="email" value={user?.email ?? ""} disabled />

        <small className="muted">
          Your email address is used as your account identifier.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>

        <input
          id="phone"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
      </div>

      {mutation.isSuccess && (
        <p className="success-message">Profile updated successfully.</p>
      )}

      {mutation.isError && (
        <p className="form-error">Unable to update your profile.</p>
      )}

      <button
        type="submit"
        className="button primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
