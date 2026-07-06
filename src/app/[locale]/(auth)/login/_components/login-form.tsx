"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { LoginFormValues, loginSchema } from "@/schemas/auth/login.schema";

export function LoginForm() {
  const t = useTranslations("common");

  const form = useForm<LoginFormValues, unknown, LoginFormValues>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const res = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        systemType: values.systemType,
        email: values.email,
        password: values.password,
      });

      if (!res?.ok) {
        throw new Error(res?.error || "Something went Wrong");
      }

      toast.success("Logged in successfully");

      setTimeout(() => (window.location.href = "/"), 150);
    } catch (err) {
      toast.error((err as Error).message || "Erorr loggin in");
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <form
        className="mx-auto w-full max-w-md space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="mb-2 text-[26px]">{t("login-title")}</h1>
          <h2 className="text-lg text-[#969696]">{t("login-subtitle")}</h2>
        </div>

        <Controller
          control={form.control}
          name="systemType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="systemType">{t("system-type")}</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  variant={"form"}
                  id="systemType"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder={t("select-system-type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{t("admin")}</SelectItem>
                  <SelectItem value="hospital">{t("hospital")}</SelectItem>
                  <SelectItem value="lab">{t("lab")}</SelectItem>
                  <SelectItem value="pharmacy">{t("pharmacy")}</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t("email")}</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder={t("email")}
                aria-invalid={fieldState.invalid}
                {...field}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t("password")}</FieldLabel>

              <Input
                id="password"
                type="password"
                placeholder={t("password")}
                aria-invalid={fieldState.invalid}
                {...field}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch id="remember-me" />
            <label htmlFor="remember-me" className="text-sm">
              {t("remember-me")}
            </label>
          </div>

          <Button
            type="button"
            className="text-sm"
            variant="link"
            disabled={form.formState.isSubmitting}
          >
            {t("forget-password")}
          </Button>
        </div>

        <Button
          variant={"brand"}
          size={"brand"}
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
          spinner={form.formState.isSubmitting}
        >
          {t("login")}
        </Button>
      </form>
    </div>
  );
}
