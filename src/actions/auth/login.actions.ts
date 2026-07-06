"use server";

import { getLocale } from "next-intl/server";
import { LoginResponse } from "@/types/auth/auth.types";

export const loginAction = async ({
  systemType,
  email,
  password,
}: {
  systemType: LoginResponse["data"]["system_type"];
  email: string | undefined;
  password: string | undefined;
}) => {
  const locale = await getLocale();

  const res = await fetch(`${process.env.API}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Accept-Language": locale || "en",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      system_type: systemType,
    }),
  });

  if (!res.ok) {
    const payload = await res.json();
    throw new Error(payload.message || "Something went wrong, try again later");
  }
  const payload: LoginResponse = await res.json();

  return payload;
};
