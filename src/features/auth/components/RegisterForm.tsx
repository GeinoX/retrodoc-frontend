import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { createRegisterSchema, PASSWORD_RULES } from "../shemas";
import { useRegister } from "../hooks/useRegister";
import type { RegisterFormValues } from "../types";

const FIELDS = [
  { name: "first_name", type: "text" },
  { name: "last_name", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "tel" },
  { name: "password", type: "password" },
  { name: "confirmPassword", type: "password" },
] as const;

export default function RegisterForm({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(t)),
  });

  const { mutate, isPending } = useRegister(setError);
  const password = watch("password") ?? "";

  const onSubmit = ({
    confirmPassword: _omit,
    ...payload
  }: RegisterFormValues) =>
    mutate(payload, { onSuccess: () => onSuccess(payload.email) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>{t("auth.register.title")}</h1>

      {FIELDS.map(({ name, type }) => (
        <div key={name}>
          <label htmlFor={name}>{t(`auth.register.fields.${name}`)}</label>
          <input id={name} type={type} {...register(name)} />
          {errors[name] && <p>{errors[name]?.message}</p>}
        </div>
      ))}

      <ul>
        {PASSWORD_RULES.map((rule) => (
          <li key={rule.key}>
            {rule.test(password) ? "✓" : "○"}{" "}
            {t(`auth.register.rules.${rule.key}`)}
          </li>
        ))}
      </ul>

      {errors.root?.server && <p>{errors.root.server.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? t("auth.register.submitting") : t("auth.register.submit")}
      </button>
    </form>
  );
}
