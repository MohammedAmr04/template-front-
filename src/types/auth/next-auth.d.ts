import { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context.
   */
  interface User {
    token: string;
    system_type: "admin" | "hospital" | "lab" | "pharmacy";
    user: {
      id: number;
      name: string;
      email: string;
      status: "active" | "inactive" | string;
      image: string | null;
      fcm_token: string | null;
      created_at: string;
      updated_at: string;
      system_type: "admin" | "hospital" | "lab" | "pharmacy";
    };
  }

  interface Session {
    accessToken: string;
    user: User["user"] & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    user: User["user"];
  }
}
