import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import type { LoginPayload } from "../types";

export default function LoginPage() {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from ?? "/dashboard";

  const { user, isLoading } = useAuth();

  const { register, handleSubmit } = useForm<LoginPayload>();

  const { mutate, isPending, isError } = useLogin();

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = (values: LoginPayload) => {
    mutate(values, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{t("auth.login.title")}</h1>

      <div>
        <label htmlFor="email">{t("auth.login.email")}</label>

        <input id="email" type="email" required {...register("email")} />
      </div>

      <div>
        <label htmlFor="password">{t("auth.login.password")}</label>

        <input
          id="password"
          type="password"
          required
          {...register("password")}
        />
      </div>

      {isError && <p>{t("auth.login.error")}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? t("auth.login.submitting") : t("auth.login.submit")}
      </button>

      <Link to="/register">{t("auth.login.noAccount")}</Link>
    </form>
  );
}
